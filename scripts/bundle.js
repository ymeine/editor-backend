var fs = require('fs');
var browserify = require('browserify');

var projectPath = __dirname + '/..'

var bundle = browserify({
	// basedir: projectPath + '/app/node_modules/modes/html/fast-parser',
	entries: [projectPath + '/app/node_modules/modes/html/fast-parser' + '/' + 'index.js']
});

var output = fs.createWriteStream(projectPath + '/public/lib/html/fast-parser.js')
bundle.bundle({
	debug: false,
	// standalone: 'fastParser'
	standalone: ''
}).pipe(output);
