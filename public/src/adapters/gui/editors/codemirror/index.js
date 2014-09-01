define([
	'codemirror/lib/codemirror',
	// below modules just require loading, they register themselves where appropriate
	'codemirror/mode/xml/xml.js',
	'codemirror/mode/javascript/javascript.js',
	'codemirror/mode/css/css.js',
	'codemirror/mode/htmlmixed/htmlmixed.js'
], function(
	CodeMirror
) {

var exports = {};
var module = {exports: exports};






function create(dom_id) {
	// --------------------------------------------------------------------- DOM

	var editor_dom_element = $("#" + dom_id)[0]; // FIXME Why is [0] required?

	// ---------------------------------------------------- editor configuration

	var configuration = {
		value: '<html></html>',
		mode: 'htmlmixed',
		theme: 'solarized',
		indentUnit: 4,
		smartIndent: true,
		tabSize: 4,
		indentWithTabs: true,
		electricChars: true,
		lineWrapping: false,
		lineNumbers: true,
		firstLineNumber: 1,
		fixedGutter: true,
		showCursorWhenSelecting: true
	};

	// ----------------------------------------------------------- instantiation

	var editor = CodeMirror(editor_dom_element, configuration);

	// ------------------------------------------------------------------ return

	return editor;
}





/*******************************************************************************
 * Exports
 ******************************************************************************/

exports.create = create;





return module.exports;

});
