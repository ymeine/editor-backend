var fs = require('fs');




function readSource(name) {
	return fs.readFileSync(__dirname + '/input/' + name + '.html', 'utf-8');
}


var name = 'HTML';

var parsers = [
	{name: 'normal', parser: require('../../../src/node_modules/modes/html/parser').parser}
];

var inputs = [
	{name: 'small', source: readSource('small')}
	,
	{name: 'big', source: bigSource = readSource('big')}
];



exports.name = name;
exports.inputs = inputs;
exports.parsers = parsers;
