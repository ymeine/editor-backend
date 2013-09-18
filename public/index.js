define([
	'backend',
	'actions',
	'gui',
	'editors',
	'tabsgroup'
], function(
	Backend,
	Actions,
	GUI,
	Editors,
	TabsGroup
) {

TabsGroup = TabsGroup.TabsGroup;


// Top of the page -------------------------------------------------------------

GUI.jumbotron({
	header: 'Ultimate editor!',
	content: 'Try the features of the ultimate editor, which funnily doesn\'t have a frontend...'
});
GUI.pageHeader({text: 'Graph visualization', small: 'Parse and play'});

// Actions ---------------------------------------------------------------------

GUI.addAction({label: 'Init', type: 'danger', onclick: 'poc.init()', icon: 'home'});
GUI.addAction({label: 'Clear', type: 'danger', onclick: 'poc.clear()', icon: 'trash', disabled: false});
GUI.addAction({label: 'Help', type: 'info', href: 'help', icon: 'question-sign'});
GUI.addAction({label: 'Ping', onclick: 'poc.ping()'});
GUI.addAction({label: 'Identify', onclick: 'poc.guid()'});
GUI.addAction({label: 'Shutdown', type: 'danger', onclick: 'poc.shutdown()', icon: 'off'});

// Tabs ------------------------------------------------------------------------

var tabs = new TabsGroup({id: 'tabs-section', type: 'pill'});

tabs.add({id: 'editor-ace', label: 'Editor (Ace)', onclick: 'poc.onAceTab()', active: false, disabled: false});
tabs.add({id: 'editor-cm', label: 'Editor (CodeMirror)', onclick: 'poc.onCMTab()', active: true, disabled: false});
tabs.add({id: 'highlighted', label: 'Highlighted'});
tabs.add({id: 'outline', label: 'Outline'});
tabs.add({id: 'ast', label: 'AST'});
tabs.add({id: 'graph', label: 'Graph'});
tabs.add({id: 'highlighting-data', label: 'Highlighting (data)'});
tabs.add({id: 'folding-data', label: 'Folding (data)'});
tabs.add({id: 'ast-data', label: 'AST (data)'});
tabs.add({id: 'outline-data', label: 'Outline (data)'});

// Dialogs ---------------------------------------------------------------------

GUI.addDialog({id: 'help', title: 'Help', closeLabel: 'Got it!'});

// Graph -----------------------------------------------------------------------

GUI.setNodePath({
	head: [
		{label: 'path'},
		{label: 'to'}
	],
	active: {label: 'node'}
});

// Editor creation -------------------------------------------------------------

var editorAce = poc.editor = Editors.createAceEditor('editor-ace', $('#' + tabs.id).css('height'));

editorAce.on('blur', poc.onBlurAce);
editorAce.on('change', poc.onChangeAce);

var editorCM = poc.editorCM = Editors.createCMEditor('editor-cm');

editorCM.on('blur', poc.onBlurCM);
editorCM.on('change', poc.onChangeCM);


// Initialization --------------------------------------------------------------

Actions.ping();
Actions.init();

});
