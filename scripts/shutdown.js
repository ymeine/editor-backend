var http = require('http');

http.get('http://localhost:3000/shutdown', function(response) {
	console.log("Status: " + response.statusCode);
}).on('error', function(error) {
	console.error("Error: " + error.message);
});
