Documentation source & content.





# File system layout

_Standard_ folders: 

- [`__resources__/`](./__resources__/): resource files for documentation outside of here

Specific documentations: 

- [`introduction/`](./introduction/): an introduction to the project
- [`documentation/`](./documentation/): a documentation about the documentation in this project (meta-documentation)
- [`client/`](./client/): a recap documentation explaining how clients can use the backend





# Backlog

## Meta documentation

### `Contribute` section

Check how to structure the `Contribute` section.

Two things can be distinguished:

- content talking about how to setup the project, configure the environment, and also how to _try_ the project, to manually/visually test it: all of this is optional
- content talking about what can be done to actually develop the project

For the second one, it's harder to see how to structure it. At least we can bring out two aspects: development for the code, and work on the documentation. One last thing is the section about fixes to be done: it must appear first and be concise, since this concerns urgent tasks.

So here are the main parts in order in this section:

1. Setup: optional
1. Try/Test: optional
1. Develop
	1. FIXMEs
	1. Code
	1. Documentation

Inside the _code_ section, there can be many things, from little tasks to more complex ones, requiring detailed paragraphs.

I would put everything in a dedicated section with a meaningful name, followed by a single emphased line summarizing the nature of the task, and then possibly a description paragraph.

### `Guidelines`

__Complete the guidelines section.__

### `Documentation` / `Contribute` order

__Choose whether to put the `Documentation` section before the `Contribute` one or vice versa.__

Seems like the first one is the one mostly used.

### Wiki

__Determine content with a general purpose trait and consider putting it in a wiki.__

Think about putting documentation files other than `readme.md` ones into the wiki. Indeed, they seem to be more general files.

The `readme.md` files are specific, and there can be only one per folder. A folder often being a module, this is logical to use them to describe the module specifically.

Other files might be for more general purposes, so consider putting them into the wiki.