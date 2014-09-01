var fs = require("fs.extra");
var pathlib = require('path');
var winston = require('winston');





var output_folder = pathlib.join('__output__', 'logs');
fs.mkdirpSync(output_folder);


var logger = new winston.Logger({
	transports: [
		new winston.transports.Console({
			colorize: true,
			silent: false,
			timestamp: false
		}),
		new winston.transports.File({
			filename: pathlib.join(output_folder, 'content'),
			colorize: false,
			timestamp: true,
			json: false
		})
	]
});





module.exports = logger;
