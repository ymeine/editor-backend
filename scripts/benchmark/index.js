// 3rd
var prelude = require('prelude-ls');
// app
var benchmarker = require('../../test/node_modules/benchmarker').benchmarker_2;
// input
var benchmarks = require('../../test/benchmarks');


prelude.each(function(benchmark) {
	benchmarker(benchmark.name, benchmark.parsers, benchmark.inputs);
}, benchmarks.modes);
