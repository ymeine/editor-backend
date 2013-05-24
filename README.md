Backend implementation.

The tricky file system layout comes from the way the module system works for Node.js, and a will not to mix application modules and third-parties modules.

# File system layout

* `README.md`: this current file
* `.gitignore`: Git related file

## `app`

All files of the applications.

Parts of the application are modules, and are mixed with other own _standard_ modules (that you could see duplicated in other projects, as they are not integrated to the package management system - _npm_ here)

## `node_modules`

All 3rd party libraries used by the modules in `app`.

## Package

* `package.json.ls`: LiveScript equivalent of npm `package.json`
* `compile.bat`: generates `package.json` from `package.json.ls`
* `package.json`: generated by `compile.bat`

# Versioning

To version:

* `README.md`
* `.gitignore`
* `app`

Optional:

* `compile.bat`: convenient script only

To ignore:

* `package.json`: generated from `package.json.ls`
* `node_modules`: can be installed from the `package.json` data with the use of npm

# Contribute

## Setup

### Pre-requisites

* Node.js
* npm
* LiveScript

### Process

1. Generate `package.json` from `package.json.ls`
	* LiveScript must be installed
	* if LiveScript is installed globally
		* if the `compile.bat` script is present, launch it
		* otherwise launch the following command: `lsc -cj package.json.ls`
	* otherwise if it's locally, launch the LiveScript program with the following arguments: `-cj package.json.ls`
1. Install the node modules
	* npm must be installed
	* launch the following command: `npm install`

## Development

### Package definition

You can update the package by modifying the content of the `package.json.ls` file.

For that, you must know a bit the LiveScript language to write this file, and you'll need to know the `package.json` specifications for npm.

### Application code

Please refer to the content of the `app` folder.

# References

* [LiveScript](http://livescript.net/)
* [Node.js](http://nodejs.org/)
* [npm](https://npmjs.org/)
	* [`package.json`](https://npmjs.org/doc/json.html)

# TODO

* Check the package definition, notably for required modules
