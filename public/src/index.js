define([
	'backend',

	'gui',
	'gui/actions',
	'gui/widgets/tabsgroup',

	'adapters/gui/editors'
], function(
	Backend,

	gui,
	editor, // <=> actions, name of module should be changed
	tabsgroup,

	editors
) {

TabsGroup = tabsgroup.TabsGroup;





/*******************************************************************************
 * Top of the page
 ******************************************************************************/

// gui.pageHeader({text: 'Graph visualization', small: 'Parse and play'});



/*******************************************************************************
 * Actions
 ******************************************************************************/

gui.add_action({label: 'Init', type: 'danger', onclick: 'at_editor_frontend_web.init()', icon: 'home'});
// gui.add_action({label: 'Parse', type: 'primary', loading: 'Parsing...', onclick: 'at_editor_frontend_web.parse()'});
// gui.add_action({label: 'Highlight', type: 'primary', loading: 'Highlighting...', onclick: 'at_editor_frontend_web.highlight()'});
// gui.add_action({label: 'Fold', type: 'primary', loading: 'Folding...', onclick: 'at_editor_frontend_web.fold()'});
// gui.add_action({label: 'Update all', type: 'primary', loading: 'Updating...', onclick: 'at_editor_frontend_web.update()', icon: 'refresh'});
gui.add_action({label: 'Clear', type: 'danger', onclick: 'at_editor_frontend_web.clear()', icon: 'trash'});
gui.add_action({label: 'Help', type: 'info', href: 'help', icon: 'question-sign'});
gui.add_action({label: 'Ping', onclick: 'at_editor_frontend_web.ping()'});
gui.add_action({label: 'Identify', onclick: 'at_editor_frontend_web.guid()'});
gui.add_action({label: 'Shutdown', type: 'danger', onclick: 'at_editor_frontend_web.shutdown()', icon: 'off'});



/*******************************************************************************
 * Tabs
 ******************************************************************************/

var tabs = new TabsGroup({id: 'tabs-section', type: 'pill'});

tabs.add({id: 'editor-ace', label: 'Editor (Ace)', active: true});
tabs.add({id: 'editor-cm', label: 'Editor (CodeMirror)', disabled: false});
tabs.add({id: 'highlighted', label: 'Highlighted'});
tabs.add({id: 'outline', label: 'Outline', onclick: 'at_editor_frontend_web.outline()'});
tabs.add({id: 'ast', label: 'AST'});
tabs.add({id: 'graph', label: 'Graph'});
tabs.add({id: 'highlighting-data', label: 'Highlighting (data)'});
tabs.add({id: 'folding-data', label: 'Folding (data)'});
tabs.add({id: 'ast-data', label: 'AST (data)'});
tabs.add({id: 'outline-data', label: 'Outline (data)'});



/*******************************************************************************
 * Dialogs
 ******************************************************************************/

gui.add_dialog({id: 'help', title: 'Help', close_label: 'Got it!'});



/*******************************************************************************
 * Graph
 ******************************************************************************/

// gui.set_node_path({
// 	head: [
// 		{label: 'path'},
// 		{label: 'to'}
// 	],
// 	active: {label: 'node'}
// });



/*******************************************************************************
 * Editor creation
 ******************************************************************************/

var editor_ace = at_editor_frontend_web.editor = editors.ace.create(
	'editor-ace',
	$('#' + tabs.id).css('height')
);

editor.update_every(2000);
//editor_ace.on('change', at_editor_frontend_web.preview.bind(at_editor_frontend_web));

at_editor_frontend_web.editor_codemirror = editors.codemirror.create('editor-cm');



/*******************************************************************************
 * Initialization
 ******************************************************************************/

editor.ping();
editor.init();

});
