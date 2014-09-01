define([
	'backend',
	'gui',
	'adapters/gui/graphs'
], function(
	backend,
	gui,
	graphs
) {

var exports = {};
var module = {exports: exports};





/*******************************************************************************
 * Data output
 ******************************************************************************/

function object_to_jqtree(obj, key) {
	var label = key;

	var children = [];

	switch(typeof obj) {
		case 'object':
			for (var property in obj) {
				children.push(object_to_jqtree(obj[property], property));
			}

			break;

		case 'array':
			for (var i = 0, length = obj.length; i < length; i++) {
				children.push(object_to_jqtree(obj[i], i));
			}

			break;

		default:
			label = '"' + key + '": ' + JSON.stringify(obj);

			// alternative implementation
			// children.push({
			// 	label: JSON.stringify(obj),
			// 	children: []
			// })
	}

	// jqTree requires a list of nodes to be given instead of a root (logical)
	// Here the choice has been made to give the list of children directly, since there is no key hence no label anyway

	if (key == null) {
		return children;
	}

	// normal case

	return {
		label: label,
		children: children
	}
}

function create_jq_tree(id, data) {
	$('#' + id).tree({
		data: data,
		// autoOpen: true,
		// dragAndDrop: true,
		slide: false,
		// openedIcon: '-',
		// closedIcon: '+',
		useContextMenu: false
	});
}

function json_to_html(json) {
	return hljs.highlight('json', JSON.stringify(json, null, 4)).value;
}





/*******************************************************************************
 * Class: Editor
 ******************************************************************************/

function EditorFrontend() {
	this.initial_source = '{var a = 1/}';
	this.source = this.initial_source;

	this.current_document = null;

	this.introspection = {};

	this.server_access_error_alert = {
		type: 'danger',
		id: 'server-access',
		text: 'Oops! Server is not responding...'
	};

	this.hasChanged = false;
}

EditorFrontend.prototype = {};



/*******************************************************************************
 * Server control
 ******************************************************************************/

EditorFrontend.prototype.ping = ping;
EditorFrontend.prototype.guid = guid;
EditorFrontend.prototype.shutdown = shutdown;



function ping() {
	var res = backend.ping();

	if (res.status != 200) {
		gui.alert(this.server_access_error_alert);
	} else {
		gui.alert({
			type: 'success',
			id: 'server-access',
			text: 'Congrats! Server responding.'
		});
	}
}

function guid() {
	var res = backend.guid();

	if (res.status != 200) {
		gui.alert(this.server_access_error_alert);
	} else {
		if (res.responseText != "e531ebf04fad4e17b890c0ac72789956") {
			gui.alert({
				type: 'danger',
				id: 'server-guid',
				text: 'Server identification error'
			});
		} else {
			gui.alert({
				type: 'success',
				id: 'server-guid',
				text: 'Congrats! Server identified properly.'
			});
		}
	}
}

function shutdown() {
	var res = backend.shutdown();

	if (res.status != 200) {
		gui.alert({
			type: 'danger',
			id: 'server-shutdown',
			text: 'Error while trying to shut down server! Please do it manually...'
		});
	} else {
		gui.alert({
			type: 'success',
			id: 'server-shutdown',
			text: 'Congrats! Server shut down properly.'
		});
	}
}



/*******************************************************************************
 * Code edition services
 ******************************************************************************/

EditorFrontend.prototype.init = init;

EditorFrontend.prototype.update = update;
EditorFrontend.prototype.update_every = update_every;

EditorFrontend.prototype.clear = clear;

EditorFrontend.prototype.parse = parse;

EditorFrontend.prototype.validate = validate;
EditorFrontend.prototype.highlight = highlight;
EditorFrontend.prototype.outline = outline;
EditorFrontend.prototype.fold = fold;



function init() {
	this.current_document = backend.init('athtml');

	gui.alert({
		type: 'info',
		id: 'document-init',
		text: 'New document created!'
	});

	this.clear();

	var css = backend.service(this.current_document, "css");
	$('#highlight-stylesheet').html(css);
}

function update_every(interval) {
	if (interval) {
		this.editor.on('change', (function () {
			this.has_changed = true;
		}).bind(this));

		/*var interval_id = */window.setInterval((function() {
			if (this.has_changed) {
				// try {
				// 	console.log("updating?")
					this.update();
					this.has_changed = false;
				// } catch (exception) {
				// 	console.error(exception);
				// 	gui.alert("An exception occurred, automatic update stopped.")
				// 	window.clearInterval(interval_id);
				// }
			}
		}).bind(this), interval);
	}
}

function update() {
	this.source = this.editor.getSession().getDocument().getValue();
	backend.updateAll(this.current_document, this.source);

	//this.parse();
	this.highlight();
	// this.fold();
	//this.outline();
	this.validate();
	this.refresh_preview();
}

function clear() {
	this.editor.getSession().getDocument().setValue(this.initial_source);

	this.update();
}

function parse() {
	// ----------------------------------------------------------------- request

	var current_document = this.current_document;
	var library = "cytoscape";

	var ast = backend.service(current_document, "parse");
	var view_data = backend.service(current_document, "graph", {library: library});

	// ----------------------------------------------------------- introspection

	var introspection = this.introspection;

	introspection.ast = ast;
	introspection.graph = view_data;

	// ------------------------------------------------------------------ output

	create_jq_tree('ast-content', object_to_jqtree(ast));
	$("#ast-data-content").html(json_to_html(ast));

	$("#total-nodes").text(view_data.nodes);
	$("#total-leaves").text(view_data.leaves);

	var container = "graph-display";
	switch(library) {
		case "jit":
			graphs.jit.create(container, {
				leaves: 2,
				nodes: 3,
				json: {
					id: "0",
					name: "0",
					children: [
						{
							id: "0.0",
							name: "0.0",
							adjacencies: []
						},
						{
							id: "0.1",
							name: "0.1",
							adjacencies: []
						}
					]
				}
			});

			break;

		case "cytoscape":
			var graph = view_data.graph;

			graphs.cytoscape.create(container, {
				nodes: graph.nodes,
				edges: graph.edges
			});

			break;
	}
}

function highlight() {
	// ----------------------------------------------------------------- request

	var html_info = backend.service(this.current_document, "html");

	var ranges = html_info.ranges;
	var html = html_info.html;

	// ----------------------------------------------------------- introspection

	var introspection = this.introspection;

	introspection.highlight = ranges;
	introspection.highlighted_html = html;

	// ------------------------------------------------------------------ output

	$('#highlight-content').html(html);
	$('#highlighting-data-content').html(json_to_html(ranges));
}

function fold() {
	// ----------------------------------------------------------------- request

	var ranges = backend.service(this.current_document, "fold");

	// ----------------------------------------------------------- introspection

	this.introspection.fold = ranges;

	// ------------------------------------------------------------------ output

	$('#folding-data-content').html(json_to_html(ranges));
}

function outline() {
	// ----------------------------------------------------------------- request

	var current_document = this.current_document;

	var outline_full = backend.service(current_document, "outline", {type: "full"});
	var outline_simple = backend.service(current_document, "outline", {type: "toObject"});

	// ----------------------------------------------------------- introspection

	var introspection = this.introspection;

	introspection.outline_full = outline_full;
	introspection.outline_simple = outline_simple;

	// ------------------------------------------------------------------ output

	create_jq_tree('outline-content', outline_full.tree);
	$('#outline-data-content').html(json_to_html(outline_full));
}

function validate() {
	// ----------------------------------------------------------------- request

	var response = backend.service(this.current_document, "validate")

	// ----------------------------------------------------------- introspection

	this.introspection.validation = response;

	// ------------------------------------------------------------------ output

	var edit_session = this.editor.getSession();
	var doc = edit_session.getDocument();

	var annotations = [];

	var types = ['error', 'warning'];
	var keys = ['errors', 'warnings'];
	for (var keys_and_types_index = 0, length = types.length; keys_and_types_index < length; keys_and_types_index++) {
		var errors = response[keys[keys_and_types_index]];

		errors.forEach(function(error) {
			var message = '- ' + error.messages.join('\n- ');

			position = doc.indexToPosition(error.location.start.index);

			annotations.push({
				row: position.row,
				column: position.column,
				type: types[keys_and_types_index],
				raw: message,
				text: message
			});
		});
	}

	edit_session.setAnnotations(annotations);
}



/*******************************************************************************
 * Live preview
 ******************************************************************************/

EditorFrontend.prototype.preview = preview;
EditorFrontend.prototype.refresh_preview = refresh_preview;



function refresh_preview() {
	$('#preview-content').html(this.introspection.highlighted_html);
}

function preview(evt) {
	// --------------------------------------------------------- request: update

	// ERROR! Position to index will give results for updated text already!!!
	// When removing text it's annoying, and it doesn't work for 'del'

	var delta = evt.data;
	var editor_document = this.editor.getSession().getDocument();
	var start = editor_document.positionToIndex(delta.range.start);

	var end;
	var text;
	switch(delta.action) {
		case 'insertText':
			text = delta.text;

			break;

		case 'removeText':
			text = '';
			end = start + delta.text.length;

			break;

		case 'insertLines':
			text = delta.lines.join('\n') + '\n';

			break;

	}

	var current_document = this.current_document;

	var update_result = backend.service(current_document, "update", {source: text, start: start, end: end});

	// ----------------------------------------------------- response processing

	if (update_result.state === "pending") {
		if (!this.pending) {
			this.pendingAlert = gui.alert({
				type: 'danger',
				id: 'pending-parser',
				text: "Couldn't parse current content",
				close: false
			});
		}
		this.pending = true;
	} else {
		if (this.pending) {
			//console.log("Now it's ok...");
			this.pendingAlert.remove();
		}
		this.pending = false;
	}

	// this.update();

	// ------------------------------------------------------ request: highlight

	var ranges = backend.service(current_document, "highlight");
	var html = backend.service(current_document, "html");

	// ----------------------------------------------------------- introspection

	this.introspection.highlight = ranges;

	// ------------------------------------------------------------------ output

	$('#preview-content').html(html.html);
}





/*******************************************************************************
 * Exports
 ******************************************************************************/

var editor_frontend = new EditorFrontend();
window.at_editor_frontend_web = editor_frontend;
module.exports = editor_frontend;





return module.exports;

});
