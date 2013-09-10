# Introduction

This folder contains all the tests and the relevant test utilities

# Current development state

The test strategy for parsers has been conceived and partially implemented only for the HTML parser.
The test framework that is used for the tests is [mocha](http://visionmedia.github.io/mocha/).

# File system layout

* [`README.md`](./README.md): this current file
* `node_modules`: all test utility modules.
* [`app`](./app): contains the resources needed for testing purposes. The folder reflects the structure of the [`app`](../app) folder, so test files are placed in the same hierarchy as the corresponding classes to test.
* [`test.js`](./test.js): the actual test.

# Documentation

The module that is used in order to test the parser is [`parserTester.js`](./node_modules/parserTester.js). You will find the jsDoc in the file itself.