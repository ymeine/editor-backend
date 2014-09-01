define([
	'gui'
], function(
	GUI
) {

var exports = {};
var module = {exports: exports};





/*******************************************************************************
 * Various routes
 ******************************************************************************/

function get(path) {
	return $.ajax({
		url: path,
		async: false,
		type: "GET"
	});
}

function ping() {return get("ping");}
function guid() {return get("80d007698d534c3d9355667f462af2b0");}
function shutdown() {return get("shutdown");}



/*******************************************************************************
 * RPC
 ******************************************************************************/

function rpc(module, method, argument) {
	// ----------------------------------------------------------------- request

	var response = $.ajax({
		url: "rpc",
		async: false,
		type: "POST",
		contentType: "application/json",
		dataType: 'json',
		data: JSON.stringify({
			module: module,
			method: method,
			argument: argument
		})
	});

	// ------------------------------------------------------------------ errors

	if (response.status !== 200) {
		GUI.alert({
			type: 'danger',
			id: 'server',
			text: 'Server error: ' + response.responseText
		});

		throw(response);
	}

	// ------------------------------------------------------------------ return

	if (response.responseText != "") {
		return JSON.parse(response.responseText);
	}
}



/*******************************************************************************
 * Editor & co. through RPC
 ******************************************************************************/

function editor(method, argument) {
	return rpc("editor", method, argument);
}

function init(mode, source) {
	return editor("init",{
		mode: mode,
		source: source
	});
}



function service(doc, svc, arg) {
	// ---------------------------------------------------------------- argument

	var argument = {
		doc: doc,
		svc: svc
	};

	if (arg != null) {
		argument.arg = arg;
	}

	// ----------------------------------------------------------------- request

	return editor("exec", argument);
}



/*******************************************************************************
 * Shortcuts for some services
 ******************************************************************************/

function updateAll(doc, source) {
	return service(
		doc,
		"update",
		{
			replace: true,
			source: source
		}
	);
}





/*******************************************************************************
 * Exports
 ******************************************************************************/

exports.ping = ping;
exports.guid = guid;
exports.shutdown = shutdown;
exports.rpc = rpc;
exports.editor = editor;
exports.init = init;
exports.service = service;
exports.updateAll = updateAll;





return module.exports;

});
