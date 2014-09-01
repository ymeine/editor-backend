# Introduction

This folder contains all the tests and the relevant test utilities





# Current development state

The test strategy for parsers has been conceived and partially implemented only for the HTML parser.
The test framework that is used for the tests is [mocha](http://visionmedia.github.io/mocha/).





# File system layout

- [`readme.md`](./readme.md): the main documentation file
- `node_modules`: all test utility modules.
- [`app`](./app): contains the resources needed for testing purposes. The folder reflects the structure of the [`app`](../app) folder, so test files are placed in the same hierarchy as the corresponding classes to test.
- [`test.js`](./test.js): the actual test.





# Documentation

The module that is used in order to test the parser is [`parserTester.js`](./node_modules/parserTester.js). You will find the documentation in the file itself, inside JSDoc comments.


## Tests lists

Tests definition follow a specific schema, described below.

A test definition can be either: 

- a string: in this case the name of the test coincides with the rule to test
- an object: see below

Here is the schema of the object used to defined tests: 

- `name`, __mandatory__: a string with the name of the test. It is important in order to state where to find the input string and the expected type
- `rule`: the name of the rule to test
- `multiple`: see the parserTester class for more explanation
- `duration`: the maximum expected duration, if it has to be tested
- `display`: whether the output has to be logged in the console
- `toFile`: string. If present, the output will be printed in a file.
