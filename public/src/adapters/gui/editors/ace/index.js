define([
	'ace/ace'
], function(
	ace
) {

var exports = {};
var module = {exports: exports};






function create(dom_id, height) {
	// --------------------------------------------------------------------- DOM

	var editor_dom_element = $("#" + dom_id);

	// --------------------------------------------------------------------- css

	var editor_parent = editor_dom_element.parent();

	var css = {
		position: "absolute",
		top: editor_parent.css("top"),
		bottom: editor_parent.css("bottom"),
		left: editor_parent.css("left"),
		right: editor_parent.css("right")
	};

	if (height != null) {
		css.height = height;
	}

	editor_dom_element.css(css);

	// ---------------------------------------------------- editor configuration

	var configuration = {
		theme: "ace/theme/monokai",
		mode: "ace/mode/html",
		HighlightActiveLine: true,
		HighlightGutterLine: true,
		HighlightSelectedWord: true,
		PrintMarginColumn: 80,
		ShowPrintMargin: true,
		ShowInvisibles: true,
		WrapBehavioursEnabled: false
	};

	// ----------------------------------------------------------- instantiation

	var editor = ace.edit(dom_id);
	editor.setTheme(configuration.theme);
	editor.getSession().setMode(configuration.mode);
	editor.setHighlightActiveLine(configuration.HighlightActiveLine);
	editor.setHighlightGutterLine(configuration.HighlightGutterLine);
	editor.setHighlightSelectedWord(configuration.HighlightSelectedWord);
	editor.setPrintMarginColumn(configuration.PrintMarginColumn);
	editor.setShowPrintMargin(configuration.ShowPrintMargin);
	editor.setShowInvisibles(configuration.ShowInvisibles);
	editor.setWrapBehavioursEnabled(configuration.WrapBehavioursEnabled);

	// ------------------------------------------------------------------ return

	return editor;
}





/*******************************************************************************
 * Exports
 ******************************************************************************/

exports.create = create;





return module.exports;

});
