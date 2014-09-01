var pathlib = require('path');

process.chdir(pathlib.normalize(pathlib.join(__dirname, '..')));



// --------------------------------------------------------------------- exports

Object.defineProperty(exports, "bootstrap", {
	get: function() {
		return require("./bootstrap");
	}
});

Object.defineProperty(exports, "modules", {
	get: function() {
		return require("./node_modules");
	}
});



// ------------------------------------------------------------------- execution

var httpServer = require('http-server');

var bootstrap = require('./bootstrap');

httpServer.run(bootstrap.routes, bootstrap.options, bootstrap.logger);
