var htmlParser = require("../app/node_modules/modes/html/parser/index.js");
var atHtmlParser = require("../app/node_modules/modes/at-html/parser/index.js");
var ParserTester = require("ParserTester").ParserTester;
var assert = require("assert");

var _describe = function() {};


/**
 * Runs a list of tests
 * @param {Object} tester
 * @param {Array} tests
 */
var runTests = function(tester, tests) {

	/**
	 * Returns the test function for the correctedness of the result. Important to define it like this in order to avoid defining its closure context in the following for loop
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
	_describe('test parse method of HTML parser', function(){

		var basepath = "test/app/node_modules/modes/html/parser/index/"

		/**
		 * Instance of the tester
		 */
		var tester = new ParserTester({
			parser : htmlParser,
			basepath : basepath
		});

		/**
		 * List of tests. Each entry of the array can be
		 * - a string: in this case the name of the test coincides with the rule to test
		 * - an object containing
		 *     - name (mandatory): a string with the name of the test. It is important in order to state where to find the input string and the expected type
		 *     - rule: the name of the rule to test
		 *     - multiple: see the parserTester class for more expalantion
		 *     - duration: the maximum expected duration, if it has to be tested
		 *     - display: whether the output has to be logged in the console
		 */
		var tests = [
			"slash",
			"closingAngleBracket",
			"eols",
			"tabs",
			"spaces",
			{
				name: "id",
				rule: "id",
				multiple: true
			},
			"comment",
			"simpleQuoteString",
			"doubleQuoteString",
			"attributeList"
		];

		runTests(tester, tests);
  });

	describe('test parse method of AT-HTML parser', function(){

		var basepath = "test/app/node_modules/modes/at-html/parser/index/"

		/**
		 * Instance of the tester
		 */
		var tester = new ParserTester({
			parser : atHtmlParser,
			basepath : basepath
		});

		/**
		 * List of tests. Each entry of the array can be
		 * - a string: in this case the name of the test coincides with the rule to test
		 * - an object containing
		 *     - name (mandatory): a string with the name of the test. It is important in order to state where to find the input string and the expected type
		 *     - rule: the name of the rule to test
		 *     - multiple: see the parserTester class for more expalantion
		 *     - duration: the maximum expected duration, if it has to be tested
		 *     - display: whether the output has to be logged in the console
		 */
		var tests = [/*{
				name: "eols",
				rule: "eols",
				duration: 150
			}, {
				name: "spaces",
				rule: "spaces",
				duration: 2
			}, {
				name: "tabs",
				rule: "tabs",
				duration: 1
			}, {
				name: "wsSequence",
				rule: "wsSequence",
				duration: 13
			}, {
				name: "singleLineComment",
				rule: "singleLineComment",
				duration: 30
			}, {
				name: "multiLineComment",
				rule: "multiLineComment",
				duration: 2.7
			}, {
				name: "singleLineComment",
				rule: "comment",
				duration: 4
			}, {
				name: "multiLineComment",
				rule: "comment",
				duration: 5
			}, {
				name: "multiLineCommentError",
				rule: "multiLineComment",
				duration: 2
			}, {
				name: "multiLineCommentNoContent",
				rule: "multiLineComment",
				duration: 15
			},
			"doubleQuoteString",
			"singleQuoteString",
			{
				name: "doubleQuoteString",
				rule: "string",
				duration: 3
			}, {
				name: "singleQuoteString",
				rule: "string",
				duration: 3
			}, {
				name: "bracedContentOne",
				rule: "bracedContent",
				duration: 2,
				multiple: true,
				display: false
			}, {
				name: "bracedContentError",
				rule: "bracedContent",
				duration: 28,
				multiple: true,
				failure: true
			}, {
				name: "spacesAndComments",
				rule: "__",
				duration: 10
			}, {
				name: "genericContent",
				rule: "genericContent",
				duration: 50,
				multiple: true
			}, {
				name: "expressionOne",
				rule: "expression",
				duration: 50,
				multiple: true
			}, {
				name: "id",
				rule: "id",
				duration: 200,
				multiple: true
			}, {
				name: "idError",
				rule: "id",
				duration: 45,
				multiple: true,
				failure: true
			}, */{
				name: "inlineStatementOne",
				rule: "inlineStatement",
				duration: 45,
				multiple: true,
				display: true
			}
		];


		runTests(tester, tests);

  });
});
