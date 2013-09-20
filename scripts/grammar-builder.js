var fs = require('fs');

var peg = require('pegjs');



function build(name) {
	var basePath = 'app/node_modules/modes/' + name + '/parser/';
	var options = require('../' + basePath + 'options');
	var grammar = fs.readFileSync(basePath + 'grammar.pegjs', 'utf-8');

	options.output = 'source';
	var source = peg.buildParser(grammar, options);

	fs.writeFileSync(basePath + 'grammar.js', 'module.exports = ' + source);
}


exports.build = build;
