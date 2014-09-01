var assert = require("assert");

var app = require('app');
var ParserTester = require("ParserTester").ParserTester;

var htmlParser = app.require_from_app("src/node_modules/modes/html/parser");
var atHtmlParser = app.require_from_app("src/node_modules/modes/at-html/parser");





/**
 * Runs a list of tests
 * @param {Object} tester
 * @param {Array} tests
 */
var runTests = function(tester, tests) {

	/**
	 * Returns the test function for the correctness of the result. Important to define it like this in order to avoid defining its closure context in the following for loop
	 */
	var testCorrectParsing = function (result) {
		return function(){
			assert.equal(result.result, true);
		};
	};

	/**
	 * Returns the test function for the performance of the parser. Important to define it like this in order to avoid defining its closure context in the following for loop
	 */
	var testCorrectDuration = function (result, test) {
		return function(){
			assert.equal(test.duration - result.duration > 0, true);
		};
	};

	var test, result;
	for (var i = 0, len = tests.length; i < len; i++) {
		test = tests[i];
		if (Object.prototype.toString.apply(test) == "[object String]") {
			test = {
				name: test,
				rule: test,
				multiple: false,
				failure: false
			};
		}

		result = tester.testParser(test)

		var message;

		var testDescription = "rule " + test.rule + " on test " + test.name;
		if (!test.failure) {
			message = "should return true - ";
			if (!result.failure) {
				message += testDescription + " is not being parsed correctly";
			} else {
				message += "the parser was unable to parse " + testDescription;
			}
		} else {
			message = "should return false - " + testDescription + " is being parsed correctly whereas it should not.";
		}

		it(message, testCorrectParsing(result, test));
		if (test.duration) {
			it("should return true - " + testDescription + " took too long to parse: " + result.duration + " > " + test.duration, testCorrectDuration(result, test));
		}
	}
};





describe('Parsers', function(){
	describe('test parse method of HTML parser', function(){
		var basepath = "test/src/node_modules/modes/html/parser/index/";

		/**
		 * Instance of the tester
		 */
		var tester = new ParserTester({
			parser : htmlParser,
			basepath : basepath
		});

	 	var tests = require('./tests-list-html.json');

		runTests(tester, tests);
	});



	describe('test parse method of AT-HTML parser', function(){
		var basepath = "test/src/node_modules/modes/at-html/parser/index/"
		var validator = app.require_from_app("src/node_modules/modes/at-html/validator");

		/**
		 * Instance of the tester
		 */
		var tester = new ParserTester({
			parser : atHtmlParser,
			basepath : basepath,
			beforeEachTest: function () {
				validator.restartTracking();
			}
		});

		var tests = require('./tests-list-athtml.json');
		for (i = 0, len = tests.length; i < len; i++) {
			tests[i].extension = tests[i].extension || "tpl";
		}

		runTests(tester, tests);
	});
});
