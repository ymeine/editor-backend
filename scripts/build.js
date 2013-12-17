// --------------------------------------------------------------------- Require

var grammarBuilder = require('grammar-builder');



// ---------------------------------------------------------------------- Define

function exec() {
	grammarBuilder.build('html');
	grammarBuilder.build('at');
	grammarBuilder.build('at-html');
}



// ---------------------------------------------------------------------- Export

exports.exec = exec;



// ------------------------------------------------------------- Standalone exec

if (require.main === module) {
	exec();
}
