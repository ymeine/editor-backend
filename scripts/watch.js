var chokidar = require('chokidar');

var grammarBuilder = require('./grammar-builder');

function createWatcher(grammar) {
	var watcher = chokidar.watch('app/node_modules/modes/' + grammar + '/parser/grammar.pegjs', {
		persistent: true
	});

	watcher.on('change', function(path) {
		grammarBuilder.build(grammar);
	});

	return watcher;
}

createWatcher('html');
createWatcher('at');
createWatcher('at-html');

