// --------------------------------------------------------------------- Require

var grammarBuilder = require('grammar-builder');



// ---------------------------------------------------------------------- Define

function exec() {
	grammarBuilder.build('html');
	grammarBuilder.build('at');
	grammarBuilder.build('at-html');
	grammarBuilder.build('js');
}



// ---------------------------------------------------------------------- Export

exports.exec = exec;



// ------------------------------------------------------------- Standalone exec

if (require.main === module) {
	exec();
}
