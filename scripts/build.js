// --------------------------------------------------------------------- Require

var grammarBuilder = require('grammar-builder');



// ---------------------------------------------------------------------- Define

function exec() {
	grammarBuilder.build('html');

	grammarBuilder.build('html', 'parser-noindex');
	grammarBuilder.build('html', 'parser-noindex-light');
	
	grammarBuilder.build('html', 'parser-simple');
	grammarBuilder.build('html', 'fast-line-column-parser');
	grammarBuilder.build('html', 'fake-parser');


	
	grammarBuilder.build('at');


	
	grammarBuilder.build('at-html');
	
	grammarBuilder.build('at-html', 'parser-noindex');
	grammarBuilder.build('at-html', 'parser-noindex-light')
}



// ---------------------------------------------------------------------- Export

exports.exec = exec;



// ------------------------------------------------------------- Standalone exec

if (require.main === module) {
	exec();
}
