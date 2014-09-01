Launches the backend.





# File system layout

- [`index`](./index): the main implementation file
- [`readme.md`](./readme.md): the main documentation file



# Documentation

Like the [npm script `start`](/package.json) does, this script just runs the bootstrap file of the application. However, technically it doesn't execute an external process, it simply `require`s the file.
