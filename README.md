This project aims at providing a solution for source code edition services, decoupled from any user interface, with an effort of abstraction of the underlying models. We call it: the _backend_.

This is for now concretely applied to specific things:

* Edition services modules (called _modes_):
	* JavaScript
	* HTML
	* [Aria Templates](http://ariatemplates.com), using the two above

The file system layout can be surprising, but comes from the way the module system works for Node.js and a will not to mix application modules and third-party modules.

# Introduction

Please read the [introduction](./introduction.md) if you never did it and don't know what the project is all about.

Please see the [meta-documentation](./documentation.md) __before reading or WRITING any documentation__. This helps understanding the documentation, and is required to maintain it consistent while adding content.

# Current development state

For now the work is focused on HTML (easy for tests). The structure of the language is close to Aria Templates, which is a good thing.

You can launch a backend instance (see procedure below) and interact with it the way you want.

# File system layout

* [`README.md`](./README.md): this current file
* [`roadmap.md`](./roadmap.md): a roadmap for the project
* [`client.md`](./client.md): a recap documentation explaining how clients can use the backend
* [`introduction.md`](./introduction.md): an introduction to the project
* [`documentation.md`](./documentation.md): a documentation about the documentation in this project (meta-documentation)
* [`.gitignore`](./.gitignore): Git related file
* [`package.json`](./package.json): npm `package.json`
* `node_modules`: all third-party libraries used by the application.

## [`app`](./app)

Applications files.

The application follows a modular architecture, and all the module are hierarchically organized into this root folder.

Under this root, there are _pseudo-standard_ modules and modules of the application: this is described in the respective documentation.

A _pseudo-standard_ module is a module that is not installed through the package management system ( _npm_ here) since it is _home-made_. However this is a module that is not specific to this application, it could be re-used in many other ones.

# Versioning

To ignore:

* `node_modules`: can be installed from the [`package.json`](./package.json) data with the use of npm

To version: _everything else_.

# Documentation

As mentioned, the goal is to implement a generic solution to handle source code edition, whatever the language, whatever the [UI](http://en.wikipedia.org/wiki/User_interface) used behind (i.e. the tool(s)).

If you want to implement a client using this backend, please read [this tutorial](./client.md).

## Architecture

You can view an architecture schema by importing the [xml file in the doc](doc/img/root/architecture.xml) into the web application [draw.io](https://www.draw.io/).

We call the tools used to actually edit source code: [___frontends___](http://en.wikipedia.org/wiki/Backend). They provide the ([G](http://en.wikipedia.org/wiki/GUI))[UI](http://en.wikipedia.org/wiki/User_interface).

We call the application serving source edition features (processing): the [___backend___](http://en.wikipedia.org/wiki/Backend).

A frontend is a client of this backend (then acting as a server application), and they communicate through standard means.

Here is a quick description of the stack:

* [__backend__](http://en.wikipedia.org/wiki/Backend): a Node.js based application, providing services used by editors and IDEs
* [__API__](http://en.wikipedia.org/wiki/API): a classical programming interface for the backend, used by the JSON-RPC (Remote Procedure Call protocol using JSON) layer (which is the end point of the _communication interface_ - see below - for the backend)
* __communication interface__: [JSON](http://en.wikipedia.org/wiki/JSON)-[RPC](http://en.wikipedia.org/wiki/Remote_procedure_call) through [HTTP](http://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol) (default listening port: 3000)
* [__frontend__](http://en.wikipedia.org/wiki/Backend): any [IDE](http://en.wikipedia.org/wiki/Integrated_development_environment) or [editor](http://en.wikipedia.org/wiki/Source_code_editor) with extension capability, using the backend through the communication interface

This project aims at providing everything __except__ the last part: indeed, a frontend is a consumer of the project.

### List of frontends

Existing:

* [Eclipse](https://github.com/ariatemplates/editor-frontend-eclipse)

Ideas:

* [Sublime Text](http://www.sublimetext.com/)
* [Notepad++](http://notepad-plus-plus.org/)
* [Cloud9](https://c9.io/)
* a custom/standard frontend (IDE for instance)

Even any other specific tools not even doing edition (but analysis for instance).

# Contribute

I would first give an advice to apply everywhere: __READ CAREFULLY THE DOCS__.

## Environment

To be able to develop the project or even use the product you need to:

* Install [Node.js](http://nodejs.org/download/) - tested with latest version ([0.10.12](http://nodejs.org/dist/v0.10.12/node.exe) at the time of writing)
	* the `node` binary must in in the `PATH` environment variable
* Install [npm](https://npmjs.org/) ([releases](http://nodejs.org/dist/npm/))

Tested on Microsoft Windows 7 Enterprise 64-bit SP1.

## Setup

Install the node modules, by launching from [that current directory](./) the command (this might take some time):

```bash
npm install
```

Also, some components inside the package need to be generated, so run from anywhere the command:

```bash
editor-backend-build
```

## Try

* make sure the port 3000 is free on your system
* open a terminal emulator executing a system shell
* execute the command: `npm start` from this directory
* (you can check it works if [this](http://localhost:3000/ping) sends `OK`)

## Test

You can also run the set of tests, and you __MUST DO IT__ when you develop, before requesting any integration of your work.

For that, simply run the npm script:

```bash
npm test
```

## Development utilities

To avoid rebuilding the grammars manually anytime you change them, or any other file that needs to be rebuilt, you can use the provided watch script. Run it from the root of the package, like this:

```bash
npm run-script watch
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

to shut the server down, instead of using a kill signal.

## Development

Please refer to the subfolders of the project for details about corresponding modules specific development: every folder containing a documentation like this contains a section talking about contributions you can make to it.

Sections below discuss about development at the whole project scale.

__Please have a look at the [roadmap](./roadmap.md) too for a prioritization of what has to be done.__ It will link to specific documentations' sections (including some of below ones).

### Package definition

You can update the package by modifying the content of the `package.json` file.

For that you'll need to know the _npm_ `package.json` specifications.

What can be done among others:

* check required modules
	* remove unecessary modules
	* maybe put version constraints
* update the description, tags, ...
* work on the _packaging_: installation, generated commands, local vs. global, ...

### Application code

Please refer to the content of the [`app`](./app) folder.

### Documentation

__Review the documentation of the documentation (the meta-documentation), written in [`documentation.md`](./documentation.md) for now.__

#### `Contribute` section

Check how to structure the `Contribute` section.

Two things can be distinguished:

* content talking about how to setup the project, configure the environment, and also how to _try_ the project, to manually/visually test it: all of this is optional
* content talking about what can be done to actually develop the project

For the second one, it's harder to see how to structure it. At least we can bring out two aspects: development for the code, and work on the documentation. One last thing is the section about fixes to be done: it must appear first and be concise, since this concerns urgent tasks.

So here are the main parts in order in this section:

1. Setup: optional
1. Try/Test: optional
1. Develop
	1. FIXMEs
	1. Code
	1. Documentation

Inside the _code_ section, theer can be many things, from little tasks to more complex ones, requiring detailed paragraphs.

I would put everything in a dedicated section with a meaningful name, followed by a single emphased line summarizing the nature of the task, and then possibly a description paragraph.

#### `Guidelines`

__Complete the guidelines section.__

#### `Documentation` / `Contribute` order

__Choose wether to put the `Documentation` section before the `Contribute` one or vice versa.__

Seems like the first one is the one mostly used.

#### Wiki

__Determine content with a general purpose trait and consider putting it in a wiki.__

Think about putting documentation files other than `README.md` ones into the wiki. Indeed, they seem to be more general files.

The `README.md` files are specific, and there can be only one per folder. A folder often being a module, this is logical to use them to describe the module specifically.

Other files might be for more general purposes, so consider putting them into the wiki.

## External libraries

__Interesting external libraries__

* [RPC](https://github.com/joyent/node/wiki/modules#wiki-rpc)
	* [jsonrpclib](https://github.com/openmason/jsonrpclib)
	* [node-jsonrpc](https://github.com/andris9/node-jsonrpc)
	* ...

# References

* npm [`package.json`](https://npmjs.org/doc/json.html)
