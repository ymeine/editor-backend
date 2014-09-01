define([
	'gui'
], function(
	gui
) {

var exports = {};
var module = {exports: exports};





/*******************************************************************************
 * Class: TabsGroup
 ******************************************************************************/

function TabsGroup(input) {
	// ---------------------------------------------------------------------- id

	var id = input.id;
	this.id = id;

	// -------------------------------------------------------------------- type

	var type = input.type;
	if (type == null) {
		type = 'pill';
	}
	this.type = type;
}

TabsGroup.prototype.add = function(input) {
	// -------------------------------------------------------- input completion

	input.tabbar = this.id;
	input.type = this.type;

	// ---------------------------------------------------------------- creation

	return gui.add_tab(input);
}





/*******************************************************************************
 * Exports
 ******************************************************************************/

exports.TabsGroup = TabsGroup;





return module.exports;

});
