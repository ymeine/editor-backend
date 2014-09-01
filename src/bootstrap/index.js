var modules = [
	"logger",
	"options",
	"routes"
].forEach(function(module) {
	var id = "./" + module;
	Object.defineProperty(exports, module, {
		get: function() {
			return require(id);
		}
	});
});
