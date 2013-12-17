// --------------------------------------------------------------------- Require

var chokidar = require('chokidar');

var grammarBuilder = require('grammar-builder');



// ---------------------------------------------------------------------- Define

function createWatcher(grammar) {
	var watcher = chokidar.watch('app/node_modules/modes/' + grammar + '/parser/grammar.pegjs', {
		persistent: true
	});

	watcher.on('change', function(path) {
		grammarBuilder.build(grammar);
	});

	return watcher;
}

function exec() {
	createWatcher('html');
	createWatcher('at');
	createWatcher('at-html');
}



// ---------------------------------------------------------------------- Export

exports.createWatcher = createWatcher;
exports.exec = exec;



// ------------------------------------------------------------- Standalone exec

if (require.main === module) {
	exec();
}
