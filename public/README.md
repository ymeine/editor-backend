Web application for demonstration and testing of the backend.





# File system layout

- [`readme.md`](./readme.md): the main documentation file
- [`src/`](./src/): source code of the application

Third-party components: 

- `lib/`: manually installed
- `bower_components/`: installed through [Bower](http://bower.io/)





# Versioning

To ignore:

- 3rd party libraries: 
	- `lib/`
	- `bower_components/`





# Resources

## 3rd party libraries

I always use the latest releases except specified otherwise.

- modules management
	- [Require.js](http://requirejs.org/)
- standard/basic library
	- [JQuery](http://jquery.com/)
- GUI
	- [Bootstrap 3](http://getbootstrap.com/)
	- [Hogan.js](http://twitter.github.io/hogan.js/): templating
- code edition
	- [Ace](http://ace.c9.io/#nav=about)
	- [CodeMirror](http://codemirror.net/)
- introspection
	- code highlighting
		- [Highlight.js](http://softwaremaniacs.org/soft/highlight/en/)
	- tree display
		- [jqTree](http://mbraak.github.io/jqTree/)
	- graph display
		- [JavaScript InfoVis Toolkit](http://philogb.github.io/jit/)
		- [Cytoscape.js](http://cytoscape.github.io/cytoscape.js/)





# Contribute

## Setup

Considering the files have already been cloned from the repository, the only thing you need to do is to install the third party libraries.

For that, we are currently using [Bower](http://bower.io/), __please install it.__

Once installed, run this command in this current folder:

```bash
bower install
```

## Try

Just go to the root of the backend project and follow the [instructions to launch the backend](/#try).

The application is served on two [routes](/src/routes.js):

- `/` (no path)
- `/app`

Open a browser and connect to `localhost`, on the port specified in the backend options (default to 3000): http://localhost:3000





# Backlog

## Issues

- static locations specified in the options of the server are served considering the current working directory, which is a too weak convention (might change easily): change the use of the server library by specifying explicitly a root, resolved from a deterministic property (like the path of the module file)

## Documentation

- Write documentration

## Code

### JIT

__Implement a graph display using JavaScript InfoVis Toolkit.__

### Cytoscape

__Improve the use of the Cytoscape library.__

- Adapt width of nodes to its content
- Add scrolling features, more convenient than moving (by selecting all or pressing an edge) and playing with zoom
- See how to choose the children orientation with the current layout (from left to right instead of right to left - for now the order is reversed on server-side to fix that)

### Bootstrap

Maybe find an alternative.

What is missing now:

- easy layout management
