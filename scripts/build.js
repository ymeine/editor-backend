// --------------------------------------------------------------------- Require

var grammarBuilder = require('grammar-builder');



// ---------------------------------------------------------------------- Define

function exec() {
	grammarBuilder.build('html');
	grammarBuilder.build('html', 'fast-parser');
	grammarBuilder.build('html', 'fast-line-column-parser');
	grammarBuilder.build('html', 'fake-parser');

	grammarBuilder.build('at');
	grammarBuilder.build('at-html');
}



// ---------------------------------------------------------------------- Export

exports.exec = exec;



// ------------------------------------------------------------- Standalone exec

if (require.main === module) {
	exec();
}
