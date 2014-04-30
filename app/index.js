// Slave mode application if activated -----------------------------------------

// What we do by default is directly hijacking stdout, not matter if we really need it or not
// This way if we want to use 3rd party libraries to parse command line arguments for instance or anything, they won't mess up with stdout
// In case we didn't need to hijack stdout, we will restore it

var stdoutDescriptor = Object.getOwnPropertyDescriptor(process, 'stdout');

var stdoutBackup = {
	stdout: process.stdout,
	getter: stdoutDescriptor.get
}

stdoutDescriptor.get = function() {return process.stderr;};
Object.defineProperty(process, 'stdout', stdoutDescriptor);

var slave = false;

var argv = process.argv.slice(2);
for (var i = 0, length = argv.length; i < length; i++) {
	var option = argv[i];
	if (option === '-s' || option === '--slave') {
		slave = true;
		break;
	}
}

if (!slave) {
	stdoutDescriptor.get = stdoutBackup.getter;
	Object.defineProperty(process, 'stdout', stdoutDescriptor);
}



// Sets the current working directory to the root of the application -----------

var path = require('path');

process.chdir(path.normalize(__dirname + '/..'));



// Default mode: starts a HTTP server as interface to internal API -------------

var httpServer = require('http-server');

var logger = require('./logger');
var routes = require('./routes');
var options = require('./options');

var server = httpServer.run(routes, options, logger);

server.on('start', function(server, port) {
	if (slave) {
		var stdout = stdoutBackup.stdout;

		var message = {
			type: 'data',
			value: {
				name: 'port',
				value: port
			}
		};
		var data = JSON.stringify(message);
		// var length = new Buffer();
		// length.writeUInt32LE(data.length);
		// stdout.write(length);
		stdout.write(data);
	}
});
