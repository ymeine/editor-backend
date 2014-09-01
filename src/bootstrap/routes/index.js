/*******************************************************************************
 * Editor configuration
 ******************************************************************************/

var Editor = require('editor').editor.Editor;
var modes = require('modes');


var editor = new Editor();

editor.add_modes([
	{
		mode: modes['html'],
		names: [
			'html', 'HTML',
			'xhtml', 'XHTML'
		]
	},
	{
		mode: modes['at-html'],
		names: [
			'athtml', 'ATHTML',
			'at-html', 'AT-HTML',
			'at_html', 'AT_HTML',
			'at html', 'AT HTML'
		]
	}

	// // !!! JS mode not working for now
	// {
	// 	mode: modes['js'],
	// 	names: [
	// 		'js', 'JS',
	// 		'javascript', 'JavaScript'
	// 	]
	// },
	// // !!! AT mode not working for now because of the JS mode
	// {
	// 	mode: modes['at'],
	// 	names: [
	// 		'at', 'AT',
	// 		'ariatemplates', 'AriaTemplates'
	// 	]
	// }
]);



/*******************************************************************************
 * Web application
 ******************************************************************************/

function serveApp() {
	return this.res.sendfile('public/src/index.html');
}



/*******************************************************************************
 * Routes
 ******************************************************************************/

var routes = [
	// Standard routes ---------------------------------------------------------

	'shutdown',
	'ping',
	'info',

	// RPC ---------------------------------------------------------------------

	{
		type: 'rpc',
		modules: {
			'editor': editor
		}
	},


	// GUID identification pair ------------------------------------------------

	{
		url: '/80d007698d534c3d9355667f462af2b0',
		handler: function() {
			return this.send('e531ebf04fad4e17b890c0ac72789956');
		}
	},

	// Client-side application -------------------------------------------------
	// TODO Be able to serve automatically 'index.html' files when hitting a static location

	{
		url: '/app',
		handler: serveApp
	},

	{
		url: '/',
		handler: serveApp
	}
];



/*******************************************************************************
 * Export
 ******************************************************************************/

module.exports = routes;
