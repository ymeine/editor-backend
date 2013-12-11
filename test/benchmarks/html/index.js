var fs = require('fs');




function readSource(name) {
	return fs.readFileSync(__dirname + '/input/' + name + '.html', 'utf-8');
}


var name = 'HTML';

var parsers = [
	{name: 'noindex light', parser: require('../../../app/node_modules/modes/html/parser-noindex-light').parser}
	,
	{name: 'noindex', parser: require('../../../app/node_modules/modes/html/parser-noindex').parser}
	,
	{name: 'normal', parser: require('../../../app/node_modules/modes/html/parser').parser}



	// ,
	// {name: 'simple', parser: require('../../../app/node_modules/modes/html/parser-simple').parser}
	// ,
	// {name: 'fake', parser: require('../../../app/node_modules/modes/html/fake-parser').parser}
];

var inputs = [
	{name: 'small', source: readSource('small')}
	,
	{name: 'big', source: bigSource = readSource('big')}
];



exports.name = name;
exports.inputs = inputs;
exports.parsers = parsers;
