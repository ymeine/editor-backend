define(function() {

var exports = {};
var module = {exports: exports};





function create(container, data) {
	var options = {
		showOverlay: false,
		layout: {
			name: 'breadthfirst',
			fit: true,
			directed: true,
			circle: false,
		},
		zoom: 1,
		style: cytoscape.stylesheet().selector('node').css({
			'content': 'data(name)',
			'font-family': 'helvetica',
			'font-size': 14,
			'text-outline-width': 3,
			'text-outline-color': '#888',
			'text-valign': 'center',
			'color': '#fff',
			'border-color': '#fff',
			'shape': 'rectangle'
		}),
		elements: data,

		container: document.getElementById(container),

		ready: function() {
		}
	};

	cytoscape(options);
}





/*******************************************************************************
 * Exports
 ******************************************************************************/

exports.create = create;





return module.exports;

});
