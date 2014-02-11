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
	// TODO Ready to send the port
});
