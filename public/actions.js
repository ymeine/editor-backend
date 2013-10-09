define([
	'backend',
	'gui',
	'graphs'
], function(
	Backend,
	GUI,
	Graphs
) {




function objectToJqTree(obj, key) {
	var label = key;

	var children = [];

	if (typeof obj === 'object') {
		for (var property in obj) {
			children.push(objectToJqTree(obj[property], property));
		}
	} else if (typeof obj == 'array') {
		for (var i = 0, length = obj.length; i < length; i++) {
			children.push(objectToJqTree(obj[i], i));
		}
	} else {
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

function createJqTree(id, data) {
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

function JSONToHTML(json) {
	return hljs.highlight('json', JSON.stringify(json, null, 4)).value;
}



var initialSource = '{var a = 1/}';

serverAccessErrorAlert = {
	type: 'danger',
	id: 'server-access',
	text: 'Oops! Server is not responding...'
}

var hasChanged = false;

var poc = {

// Server control --------------------------------------------------------------

	ping: function() {
		var res = Backend.ping();

		if (res.status != 200) {
			GUI.alert(serverAccessErrorAlert);
		} else {
			GUI.alert({
				type: 'success',
				id: 'server-access',
				text: 'Congrats! Server responding.'
			});
		}
	},

	guid: function() {
		var res = Backend.guid();

		if (res.status != 200) {
			GUI.alert(serverAccessErrorAlert);
		} else {
			if (res.responseText != "e531ebf04fad4e17b890c0ac72789956") {
				GUI.alert({
					type: 'danger',
					id: 'server-guid',
					text: 'Server identification error'
				});
			} else {
				GUI.alert({
					type: 'success',
					id: 'server-guid',
					text: 'Congrats! Server identified properly.'
				});
			}
		}
	},

	shutdown: function() {
		var res = Backend.shutdown();

		if (res.status != 200) {
			GUI.alert({
				type: 'danger',
				id: 'server-shutdown',
				text: 'Error while trying to shut down server! Please do it manually...'
			});
		} else {
			GUI.alert({
				type: 'success',
				id: 'server-shutdown',
				text: 'Congrats! Server shut down properly.'
			});
		}
	},

// Code edition services -------------------------------------------------------

	introspection: {},

	source: initialSource,

	init: function() {
		poc.doc = Backend.init('athtml');

		GUI.alert({
			type: 'info',
			id: 'document-init',
			text: 'New document created!'
		});

		this.clear();

		var css = Backend.service(poc.doc, "css");
		$('#highlight-stylesheet').html(css);
	},

	updateEvery: function(interval) {
		if (interval) {
			this.editor.on('change', function () {
				hasChanged = true;
			});
			window.setInterval((function() {
				if (hasChanged) {
					this.update();
					hasChanged = false;
				}
			}).bind(this),interval);
		}
	},

	update: function() {
		this.source = this.editor.getSession().getDocument().getValue();
		Backend.updateAll(poc.doc, this.source);

		//this.parse();
		this.highlight();
		// this.fold();
		//this.outline();
		this.validate();
		this.refreshPreview();
	},

	clear: function() {
		this.editor.getSession().getDocument().setValue(initialSource);

		this.update();
	},

	parse: function() {
		// Request -------------------------------------------------------------

		var library = "cytoscape";

		var ast = Backend.service(poc.doc, "parse");
		var viewData = Backend.service(poc.doc, "graph", {library: library});

		// Output --------------------------------------------------------------

		poc.introspection.ast = ast;
		poc.introspection.graph = viewData;

		createJqTree('ast-content', objectToJqTree(ast));
		$("#ast-data-content").html(JSONToHTML(ast));

		$("#total-nodes").text(viewData.nodes);
		$("#total-leaves").text(viewData.leaves);

		var container = "graph-display";

		if (library === "jit") {
			Graphs.JIT(container, {
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
		} else if (library === "cytoscape") {
			Graphs.cytoscape(container, {
				nodes: viewData.graph.nodes,
				edges: viewData.graph.edges
			});
		}
	},

	highlight: function() {
		var htmlInfo = Backend.service(poc.doc, "html");
		var ranges = htmlInfo.ranges, html = htmlInfo.html;
		poc.introspection.highlight = ranges;
		poc.introspection.highlightedHtml = html;


		$('#highlight-content').html(html);
		$('#highlighting-data-content').html(JSONToHTML(ranges));
	},

	fold: function() {
		var ranges = Backend.service(poc.doc, "fold");
		poc.introspection.fold = ranges;

		$('#folding-data-content').html(JSONToHTML(ranges));
	},

	outline: function() {
		var data = Backend.service(poc.doc, "outline", {type: "full"});
		poc.introspection.outline = data;
		poc.introspection.simpleOutline = Backend.service(poc.doc, "outline", {type: "toObject"});

		createJqTree('outline-content', data.tree);
		$('#outline-data-content').html(JSONToHTML(data));
	},

	validate: function() {

		var response = Backend.service(poc.doc, "validate"), msg, err, items;
		var annotations = [];

		var types = ['error', 'warning'], keys = ['errors', 'warnings'];
		for (var j = 0; j < types.length; j++) {
			items = response[keys[j]];
			for (var i = 0, len = items.length; i < len; i++) {
				err = items[i];
				msg = '- ' + err.messages.join('\n- ');
				annotations.push({
					row: err.location.start.line - 1,
					column: err.location.start.column - 1,
					type: types[j],
					raw: msg,
					text: msg
				});
			}
		}
		poc.introspection.validation = response;
		this.editor.getSession().setAnnotations(annotations);
	},

// Live preview ----------------------------------------------------------------


	refreshPreview: function() {
		$('#preview-content').html(poc.introspection.highlightedHtml);
	},

	preview: function(evt) {
		// Update --------------------------------------------------------------

		var delta = evt.data;

		var action = delta.action;
		var range = delta.range;

		var editorDocument = this.editor.getSession().getDocument();

		var start;
		var end;
		var text;

		// ERROR! Position to index will give results for update dtext already!!!
		// When removing text it's annoying, and it doesn't work for 'del'

		start = editorDocument.positionToIndex(range.start);
		if (action === 'insertText') {
			text = delta.text;
		} else if (action === 'removeText') {
			text = '';
			end = start + delta.text.length;
		} else if (action === 'insertLines') {
			text = delta.lines.join('\n') + '\n';
		}

		var updateResult = Backend.service(poc.doc, "update", {source: text, start: start, end: end});

		if (updateResult.state === "pending") {
			if (!poc.pending) {
				poc.pendingAlert = GUI.alert({
					type: 'danger',
					id: 'pending-parser',
					text: "Couldn't parse current content",
					close: false
				});
			}
			poc.pending = true;
		} else {
			if (poc.pending) {
				//console.log("Now it's ok...");
				poc.pendingAlert.remove();
			}
			poc.pending = false;
		}

		// this.update();

		// Highlight -----------------------------------------------------------

		var ranges = Backend.service(poc.doc, "highlight");

		poc.introspection.highlight = ranges;

		var html = Backend.service(poc.doc, "html");

		$('#preview-content').html(html.html);
	}

};

window.poc = poc;
return poc;

});
