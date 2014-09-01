Edition backend.

This project aims at providing a solution for source code edition, providing services decoupled from any user interface, with an effort of abstraction of the underlying models. 





# Introduction

Please read the [introduction](./doc/introduction) if you never did it and don't know what the project is all about.

Reading the [meta-documentation](./doc/documentation) (disclaimer: this is not complete) is:

- advised before reading documentation
- __mandatory__ before writing documentation





# File system layout

- project related: 
	- [`readme.md`](./readme.md): the main documentation file
	- [`.gitignore`](./.gitignore): ignore rules for Git
- sources: 
	- [`doc/`](./doc/): documentation source & content
	- [`src/`](./src/): source code of the application
	- [`test/`](./test/): tests of the application
- package related: 
	- [`package.json`](./package.json): npm `package.json`, the package definition
	- [`scripts/`](./scripts/): scripts to expose various tasks to the developer
	- [`bin/`](./bin/): public binaries to expose some tasks to the end user
- others: 
	- [`public/`](./public/): a web application to demonstrate or test the backend
	- `node_modules/`: all third-party libraries used by the application





# Versioning

To ignore:

- `node_modules/`: can be installed from the [`package.json`](./package.json) data with the use of npm





# Documentation

As mentioned, the goal is to implement a generic solution to handle source code edition, whatever the language, whatever the [UI](http://en.wikipedia.org/wiki/User_interface) used behind (i.e. the tool(s)).

If you want to implement a client using this backend, please read [this tutorial](./doc/client).

## Architecture

You can view an architecture schema by importing the [xml file in the doc](doc/__resources__/img/root/architecture.xml) into the web application [draw.io](https://www.draw.io/) (you can copy the content directly, click on menu item `Options>Advanced>Edit...`).

We call the tools used to actually edit source code: [___frontends___](https://en.wikipedia.org/wiki/Front_and_back_ends). They provide the ([G](http://en.wikipedia.org/wiki/GUI))[UI](http://en.wikipedia.org/wiki/User_interface).

We call the application serving source edition features (processing): the [___backend___](http://en.wikipedia.org/wiki/Backend).

A frontend is a client of this backend (therefore acting as a server application), and they communicate through standard means.

Here is a quick description of the stack:

- [__backend__](http://en.wikipedia.org/wiki/Backend): a Node.js based application, providing services used by editors and IDEs
- [__API__](http://en.wikipedia.org/wiki/API): a classical programming interface for the backend, used by the JSON-RPC (Remote Procedure Call protocol using JSON) layer (which is the end point of the _communication interface_ - see below - for the backend)
- __communication interface__: [JSON](http://en.wikipedia.org/wiki/JSON)-[RPC](http://en.wikipedia.org/wiki/Remote_procedure_call) through [HTTP](http://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol) (default listening port: 3000)
- [__frontend__](http://en.wikipedia.org/wiki/Backend): any [IDE](http://en.wikipedia.org/wiki/Integrated_development_environment) or [editor](http://en.wikipedia.org/wiki/Source_code_editor) with extension capability, using the backend through the communication interface

This project aims at providing everything __except__ the last part: indeed, a frontend is a consumer of the project.





# List of known frontends

- [Eclipse](https://github.com/ariatemplates/editor-frontend-eclipse)
- [Demo web application](./public)





# Ideas for new frontends

- [Sublime Text](http://www.sublimetext.com/)
- [Notepad++](http://notepad-plus-plus.org/)
- [Cloud9](https://c9.io/)
- a custom/standard frontend (IDE for instance)
- ... and any other specific tools not even doing edition (but analysis for instance).





# Contribute

I would first give an advice to apply everywhere: __READ CAREFULLY THE DOCS__.

## Environment

To be able to develop the project or even use the product you need to:

- Install [Node.js](http://nodejs.org/download/) - developed with latest version, tested with version 8, 10 and latest one
	- the `node` binary must in in the `PATH` environment variable
- Install [npm](https://npmjs.org/) (it comes with the installer of Node.js, portable versions are discontinued)

Tested on Microsoft Windows 7 Enterprise 64-bit SP1.

## Setup

Install the node modules, by launching from [this current directory](./) the command (it might take some time):

```bash
npm install
```

Also, some components inside the package need to be generated, so run from anywhere the command:

```bash
npm run build
```

## Try

- make sure the port 3000 is free on your system
- execute the following command in a system shell: `npm start` (in [this current directory](./))
- (you can check it works if [http://localhost:3000/ping](http://localhost:3000/ping) sends `OK`)

## Test

You can also run the set of tests, and you __MUST DO IT__ when you develop, before requesting any integration of your work.

For that, simply run the npm script:

```bash
npm test
```

## Development utilities

To avoid rebuilding the grammars manually anytime you change them, or any other file that needs to be rebuilt, you can use the provided watch script. Run it from the root of the package, like this:

```bash
npm run watch
```

However, for now it doesn't handle restarting the whole application (the server) when a change is made in its code, because this is a bit heavy and requires some subtle logic to keep it handy.

But you can use the _native_ npm script to restart the application:

```bash
npm restart
```

This is possible due to the fact that a `stop` script has been added in addition to the `start` one. So you can also do:

```bash
npm stop
```

to shut the server down, instead of _manually_ sending a kill signal.

## Development

All folders inside this project have a main documentation file like this one, where they describe everything needed to understand it, and to contribute to it. So please refer to them.

Sub-sections below discuss about development at the whole project scale.

### Package definition

You can update the package by modifying the content of the `package.json` file.

For that you'll need to know the _npm_ [`package.json`](https://npmjs.org/doc/json.html) specifications.

What can be done among others:

- check required modules
	- remove unnecessary modules
	- maybe refine version constraints
- update the description, tags, etc.

You can also contribute more widely to the packaging of the project by implementing [scripts](./scripts) that can be launched by npm and [binaries](./bin) that can be installed by it.





# Resources

## References

Interesting external libraries: 

- [RPC](https://github.com/joyent/node/wiki/modules#wiki-rpc) (deprecated page)
	- [jsonrpclib](https://github.com/openmason/jsonrpclib)
	- [node-jsonrpc](https://github.com/andris9/node-jsonrpc)
	- ...
