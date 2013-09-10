var htmlParser = require("../app/node_modules/modes/html/parser/index.js");
var ParserTester = require("ParserTester").ParserTester;
var assert = require("assert")

describe('Parsers', function(){
  describe('test parse method of HTML parser', function(){

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

	/**
	 * Returns the test function. Important to define it like this in order to avoid defining its closure context in the following for loop
	 */
	var testFunction = function (test) {
		return function(){
	      assert.equal(tester.testParser(test), true);
	    };
	};

	for (var i = 0, len = tests.length; i < len; i++) {
  		var test = tests[i];
  		if (Object.prototype.toString.apply(test) == "[object String]") {
  			test = {
  				name: test,
  				rule: test,
  				multiple: false
  			};
  		}
	    it("should return true - rule " + test.rule + " is not being parsed correctly", testFunction(test));
  	}
  });
});

