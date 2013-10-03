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

// Tabs ------------------------------------------------------------------------

var tabs = new TabsGroup({id: 'tabs-section', type: 'pill'});


// Editor creation -------------------------------------------------------------

var editorAce = poc.editor = Editors.createAceEditor('editor-ace', $('#' + tabs.id).css('height'));

editorAce.on('blur', poc.onBlurAce);
editorAce.on('change', poc.onChangeAce);
editorAce.on('focus', poc.onAceTab);

var editorCM = poc.editorCM = Editors.createCMEditor('editor-cm');

editorCM.on('blur', poc.onBlurCM);
editorCM.on('change', poc.onChangeCM);
editorCM.on('focus', poc.onCMTab);


// Initialization --------------------------------------------------------------

Actions.ping();
Actions.init();

});
