var bower = require('bower');

process.chdir('public');

bower.commands.install()
.on('end', function(results) {
	console.log(results);
})
.on('error', function(error) {
	console.error(error);
});
