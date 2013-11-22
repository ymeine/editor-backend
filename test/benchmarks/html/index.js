var fs = require('fs');




function readSource(name) {
	return fs.readFileSync(__dirname + '/input/' + name + '.html', 'utf-8');
}



exports.parsers = [
	{name: 'fast', parser: require('../../../app/node_modules/modes/html/fast-parser').parser},
	{name: 'fake', parser: require('../../../app/node_modules/modes/html/fake-parser').parser},
	{name: 'normal', parser: require('../../../app/node_modules/modes/html/parser').parser}
];

exports.inputs = [
	{name: 'small', source: readSource('small')},
	{name: 'big', source: bigSource = readSource('big')}
];

exports.name = 'HTML';
