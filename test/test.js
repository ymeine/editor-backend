var htmlParser = require("../app/node_modules/modes/html/parser/index.js");
var atHtmlParser = require("../app/node_modules/modes/at-html/parser/index.js");
var ParserTester = require("ParserTester").ParserTester;
var assert = require("assert");


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

		var basepath = "test/app/node_modules/modes/html/parser/index/";



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
		var statements = require("../app/node_modules/modes/at-html/parser/statements.js");

		/**
		 * Instance of the tester
		 */
		var tester = new ParserTester({
			parser : atHtmlParser,
			basepath : basepath,
			beforeEachTest: function () {
				statements.restartTracking();
			}
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
		 *     - toFile: string. If present, the output will be printed in a file
		 */
		var tests = [{
				name: "eols",
				rule: "eols",
				duration: 170
			}, {
				name: "spaces",
				rule: "spaces",
				duration: 2
			}, {
				name: "tabs",
				rule: "tabs",
				duration: 2
			}, {
				name: "wsSequence",
				rule: "wsSequence",
				duration: 8
			}, {
				name: "singleLineComment",
				rule: "singleLineComment",
				duration: 2
			}, {
				name: "multiLineComment",
				rule: "multiLineComment",
				duration: 5
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
				duration: 3
			}, {
				name: "multiLineCommentNoContent",
				rule: "multiLineComment",
				duration: 5
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
				duration: 4
			}, {
				name: "bracedParamOne",
				rule: "bracedParam",
				duration: 5,
				multiple: true
			}, {
				name: "bracedParamError",
				rule: "bracedParam",
				duration: 3,
				multiple: true,
				failure: true
			}, {
				name: "spacesAndComments",
				rule: "__",
				duration: 8
			}, {
				name: "genericParam",
				rule: "genericParam",
				duration: 8,
				multiple: true
			}, {
				name: "expressionOne",
				rule: "expression",
				duration: 20,
				multiple: true
			}, {
				name: "id",
				rule: "id",
				duration: 3,
				multiple: true
			}, {
				name: "idError",
				rule: "id",
				duration: 2,
				multiple: true,
				failure: true
			}, {
				name: "text",
				rule: "text",
				duration: 2,
				multiple: true
			}, {
				name: "textError",
				rule: "text",
				duration: 2,
				multiple: true,
				failure: true
			}, {
				name: "inlineStatementOne",
				rule: "inlineStatement",
				duration: 50,
				multiple: true
			}, {
				name: "inlineStatementTwo",
				rule: "inlineStatement",
				duration: 65,
				multiple: true
			}, {
				name: "inlineStatementMissingId",
				rule: "inlineStatement",
				duration: 6,
				multiple: true
			},  {
				name: "blockStatementClosing",
				rule: "blockStatementClosing",
				duration: 15,
				multiple: true
			},  {
				name: "blockStatementClosingWithoutId",
				rule: "blockStatementClosing",
				duration: 6,
				multiple: true
			}, {
				name: "blockStatementOpening",
				rule: "blockStatementOpening",
				duration: 50,
				multiple: true
			}, {
				name: "blockStatementOpeningWithoutId",
				rule: "blockStatementOpening",
				duration: 6,
				multiple: true
			}, {
				name: "blockStatementOne",
				rule: "blockStatement",
				duration: 18
			}, {
				name: "blockStatementOpeningWithoutClosing",
				rule: "blockStatementOpeningWithoutClosing",
				duration: 40,
				multiple: true
			}, {
				name: "blockStatementClosingWithoutOpening",
				rule: "blockStatementClosingWithoutOpening",
				duration: 20,
				multiple: true
			}, {
				name: "statementOpeningWithoutClosing",
				rule: "statementOpeningWithoutClosing",
				duration: 2
			}, {
				name: "statementOne",
				rule: "statement",
				duration: 35
			}, {
				name: "widgetId",
				rule: "widgetId",
				duration: 10,
				multiple: true
			}, {
				name: "inlineWidget",
				rule: "statement",
				duration: 15,
				multiple: true
			}, {
				name: "blockWidget",
				rule: "statement",
				duration: 35,
				multiple: true
			}, {
				name: "cdataOpening",
				rule: "cdataOpening",
				duration: 5
			}, {
				name: "cdataOpeningError",
				rule: "cdataOpening",
				duration: 2,
				failure: true
			}, {
				name: "cdata",
				rule: "cdata",
				duration: 10
			}, {
				name: "cdata",
				rule: "statement",
				duration: 10
			}, {
				name: "startOne",
				rule: "start",
				duration: 400
			}, {
				name: "startTwo",
				rule: "start",
				duration: 20
			}, {
				name: "startThree",
				rule: "start",
				duration: 20
			}, {
				name: "inlineHtmlTagOne",
				rule: "inlineHtmlElement",
				duration: 30
			}, {
				name: "inlineHtmlTagTwo",
				rule: "inlineHtmlElement",
				duration: 40
			}, {
				name: "inlineHtmlTagThree",
				rule: "inlineHtmlElement",
				duration: 25
			}, {
				name: "blockHtmlTagClosing",
				rule: "blockHtmlTagClosing",
				duration: 10,
				multiple: true
			}, {
				name: "blockHtmlTagOpening",
				rule: "blockHtmlTagOpening",
				duration: 30,
				multiple: true
			}, {
				name: "blockHtmlElementOne",
				rule: "blockHtmlElement",
				duration: 80,
				multiple: true
			}, {
				name: "blockHtmlElementClosingWithoutOpening",
				rule: "blockHtmlElementClosingWithoutOpening",
				duration: 5
			}, {
				name: "blockHtmlElementOpeningWithoutClosing",
				rule: "blockHtmlElementOpeningWithoutClosing",
				duration: 5
			}, {
				name: "inlineHtmlTagOne",
				rule: "htmlElement",
				duration: 25
			}, {
				name: "inlineHtmlTagTwo",
				rule: "htmlElement",
				duration: 40
			}, {
				name: "inlineHtmlTagThree",
				rule: "htmlElement",
				duration: 20
			}, {
				name: "blockHtmlElementOne",
				rule: "htmlElement",
				duration: 100,
				multiple: true
			}, {
				name: "blockHtmlElementOpeningWithoutClosing",
				rule: "htmlElement",
				duration: 15
			}, {
				name: "blockStatementClosingWithoutOpeningInHtmlBlock",
				rule: "htmlElement",
				duration: 15
			}, {
				name: "startFour",
				rule: "start",
				duration: 40
			}, {
				name: "startFive",
				rule: "start",
				duration: 15
			}, {
				name: "startSix",
				rule: "start",
				duration: 5
			}, {
				name: "htmlCdata",
				rule: "htmlCdata",
				duration: 5
			}, {
				name: "htmlCdata",
				rule: "htmlElement",
				duration: 5
			}, {
				name: "htmlComment",
				rule: "htmlComment",
				duration: 3
			}, {
				name: "htmlComment",
				rule: "htmlElement",
				duration: 3
			}, {
				name: "startSeven",
				rule: "start",
				duration: 25
			}, {
				name: "startEight",
				rule: "start",
				duration: 1200
			}
		];

		runTests(tester, tests);

	});
});
