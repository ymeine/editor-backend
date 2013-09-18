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



var initialSource = '<html></html>';

serverAccessErrorAlert = {
	type: 'danger',
	id: 'server-access',
	text: 'Oops! Server is not responding...'
}



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
		poc.doc = Backend.init('html');

		GUI.alert({
			type: 'info',
			id: 'document-init',
			text: 'New document created!'
		});

		this.clear();

		var css = Backend.service(poc.doc, "css");
		$('#highlight-stylesheet').html(css);
	},

	onBlurAce: function(evt) {
		poc.source = poc.editor.getSession().getDocument().getValue();

		poc.update();
	},

	onBlurCM: function(evt) {
		poc.source = poc.editorCM.getDoc().getValue();

		poc.update();
	},

	update: function() {
		Backend.updateAll(poc.doc, this.source);

		this.parse();
		this.highlight();
		this.fold();
		this.outline();
	},

	onAceTab: function() {
		poc.replaceEditorContentAce();
		poc.editor.focus();
	},

	onCMTab: function() {
		poc.replaceEditorContentCM();
		poc.editorCM.focus();
		poc.editorCM.refresh();
	},

	replaceEditorContentAce: function() {
		poc.editor.removeEventListener('change', poc.onChangeAce);
		poc.editor.getSession().getDocument().setValue(poc.source);
		poc.editor.on('change', poc.onChangeAce);
	},

	replaceEditorContentCM: function() {
		poc.editorCM.off('change', poc.onChangeCM);
		poc.editorCM.getDoc().setValue(poc.source);
		poc.editorCM.on('change', poc.onChangeCM);
	},

	clear: function() {
		this.source = initialSource;

		poc.replaceEditorContentAce();
		poc.replaceEditorContentCM();

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
		var ranges = Backend.service(poc.doc, "highlight");
		poc.introspection.highlight = ranges;

		var html = Backend.service(poc.doc, "html");

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

		createJqTree('outline-content', data.tree);
		$('#outline-data-content').html(JSONToHTML(data));
	},

// Live preview ----------------------------------------------------------------
	onChangeAce: function(evt) {
		// Update --------------------------------------------------------------

		var delta = evt.data;

		var action = delta.action;
		var range = delta.range;

		var editorDocument = poc.editor.getSession().getDocument();

		var start;
		var end;
		var text;

		// ERROR! Position to index will give results for updated text already!!!
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

		Backend.service(poc.doc, "update", {source: text, start: start, end: end});
		poc.source = editorDocument.getValue();

		poc.preview();
	},

	// FIXME Update document of the other editor: should be a feature of the backend: on focus on an editor, it should ask what changed since last time it edited the document. That's where the notion of client comes over the notion of session: two clients can edit the same document. So a client session should be created, and passed for requests on documents. This way the backend will be able to create

	onChangeCM: function(instance, changeObj) {
		var doc = instance.getDoc()

		var currentChange = changeObj;
		while (currentChange != null) {
			var text = currentChange.text.join('\n');
			var removed = currentChange.removed.join('\n');

			var start = doc.indexFromPos(currentChange.from);

			var end = start + removed.length;
			// Note indexFromPos will work on the new content of the document
			// This means after removal.
			// So in case you remove a character at the end of the line, the computed index is cropped since it's trying to hit a non-existing-anymore column on the line

			var update = {source: text, start: start, end: end};

			Backend.service(poc.doc, "update", update);

			currentChange = currentChange.next;
		}

		poc.source = doc.getValue();

		poc.preview();
	},

	preview: function() {
		// Highlight -----------------------------------------------------------

		var ranges = Backend.service(poc.doc, "highlight");

		poc.introspection.highlight = ranges;

		var html = Backend.service(poc.doc, "html");

		$('#preview-content').html(html);
	}

};

window.poc = poc;
return poc;

});
