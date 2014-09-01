define([
	'gui/widgets/templates'
], function(
	templates
) {

var exports = {};
var module = {exports: exports};





/*******************************************************************************
 * Widgets
 ******************************************************************************/

/**
 * type: 'danger', 'success', 'info'
 * id
 * text
 * close: true to display a close button
 */
function alert(input) {
	if (input.text != null) {
		if (input.type === 'error') input.type = 'danger';
		if (input.type === 'fatal') input.type = 'danger';

		if (input.type == null) input.type = 'info';

		if (input.close == null) input.close = true;

		var element = $(templates.render('message', input));
		$('#messages-section').append(element);
		return element;
	}

	throw Error('No text given for alert');
}

function add_action(input) {
	input.type == null && (input.type = 'default');
	input.type = input.type.toLowerCase();

	var element = $(templates.render('action', input));
	$('#sidebar-section').append(element);
	return element;
}

function add_tab(input) {
	input.active == null && (input.active = false);
	input.disabled == null && (input.disabled = false);

	$('#' + input.tabbar + ' .nav').append(templates.render('tab', input));
	$('#' + input.tabbar + ' .tab-content').append(templates.render('tab-content', input));

	var content = $('#tab-content-' + input.id)[0];
	return $('#tab-' + input.id).append(content);
}

function add_dialog(input) {
	var element = $(templates.render('dialog', input));
	$('#dialogs-section').append(element);

	var content = $('#dialog-content-' + input.id)[0];
	$('#' + input.id + ' .modal-body').append(content);

	return element;
}

function jumbotron(input) {
	var element = $(templates.render('jumbotron', input));
	$('#jumbotron-section').html(element);
	return element;
}

function page_header(input) {
	var element = $(templates.render('page-header', input));
	$('#page-header-section').html(element);
	return element;
}



/*******************************************************************************
 * Page
 ******************************************************************************/

function add_style(css, id) {
	var element = $('<style>', {id: id, text: css});
	$('head').append(element);
	return element;
}



/*******************************************************************************
 * Specific
 ******************************************************************************/

function set_node_path(input) {
	var element = $(templates.render('breadcrumb', input));
	$('#breadcrumb-section').html(element);
	return element;
}





/*******************************************************************************
 * Exports
 ******************************************************************************/

exports.alert = alert;
exports.add_style = add_style;

exports.jumbotron = jumbotron;
exports.page_header = page_header;
exports.add_action = add_action;
exports.add_tab = add_tab;
exports.add_dialog = add_dialog;

exports.set_node_path = set_node_path;





return module.exports;

});
