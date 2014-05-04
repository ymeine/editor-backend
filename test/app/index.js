var child_process = require('child_process');
var path = require('path');


var scriptPath = path.join(__dirname, '..', '..', 'app', 'index');
console.log(scriptPath);

var child = child_process.spawn('node', [scriptPath, '--slave']);
console.log('Child PID: ' + child.pid);

// child.stderr.pipe(process.stderr);

setTimeout(function() {
	child.kill();
}, 10000);

child.stdout.on('data', function(buffer) {
	var message = JSON.parse(buffer.toString('ascii'));
	console.log('Message type: ' + message.type);
	if (message.type === 'data') {
		console.log('Property name: ' + message.value.name);
		console.log('Property value: ' + message.value.value);
	}
});

