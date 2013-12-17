// --------------------------------------------------------------------- Require

var http = require('http');



// ---------------------------------------------------------------------- Define

/**
 * @todo try to build the URL from configurations, the port or even the host might change. And also, getting the name of the route to use would be perfect!
 */
function exec() {
	http.get('http://localhost:3000/shutdown', function(response) {
		console.log("Status: " + response.statusCode);
	}).on('error', function(error) {
		console.error("Error: " + error.message);
	});
}



// ---------------------------------------------------------------------- Export

exports.exec = exec;



// ------------------------------------------------------------- Standalone exec

if (require.main === module) {
	exec();
}
