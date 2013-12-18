var fs = require('fs');




function readSource(name) {
	return fs.readFileSync(__dirname + '/input/' + name + '.tpl', 'utf-8');
}



exports.parsers = [
	{name: 'noindex-light', parser: require('../../../app/node_modules/modes/at-html/parser-noindex-light').parser}
	,
	{name: 'noindex', parser: require('../../../app/node_modules/modes/at-html/parser-noindex').parser}
	,
	{name: 'normal', parser: require('../../../app/node_modules/modes/at-html/parser').parser}
];

exports.inputs = [
	{name: 'small', source: readSource('small')}
	,
	{name: 'medium', source: readSource('medium')} // issue: very long, and three times more with the most efficient parser!!!
	,
	{name: '200 lines', source: readSource('200-lines')}
	,
	{name: '500 lines', source: readSource('500-lines')}
	// ,
	// {name: '1000 lines', source: readSource('1000-lines')} // issue: can't finish
	// ,
	// {name: '1000 lines (2)', source: readSource('1000-lines-2')} // issue: can't finish
	// ,
	// {name: '1000 lines (3)', source: bigSource = readSource('big')} // issue: can't finish
];

exports.name = 'AT-HTML';
