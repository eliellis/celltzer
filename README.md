# excelsior

Transform .xlsx files into template formatted HTML with ease! Supports handlebars, EJS, and pug out of the box. 📈📊💃

## Install

`npm install -g excelsior`

## Usage

### Templates

In your template, the `sheets` variable will be exposed, which will contain an array of the worksheets available in your Excel document. Each of the elements within one of these worksheets will contain one of two data types:

1. an array of JS objects whose keys are cell names e.g. `[ 'A1': [CellObject], 'A2': [CellObject], ... ]`

2. a 2D array of zero-indexed rows and columns e.g. `[ [ [CellObject], [CellObject], [CellObject], ...], [ [CellObject], [CellObject], [CellObject], ...] ...]`

For the 2D array structure, you should pass the `-z` or `--zeroIndexed` flag into the CLI.

Documentation for the `CellObject` data type can be found [here](https://docs.sheetjs.com/#cell-object).

### CLI

Executing a command like `excelsior transform -e ejs input.xlsx template.ejs` will print your templated HTML to the standard output using the EJS template engine.

To specify an output file, use something like `excelsior transform -o output.html input.xlsx template.ejs`

### Programmatic Usage

```js
xl = require('excelsior');
xl.transformFile('input.xlsx', 'template.hbs', {
  engine: 'handlebars',
  output: 'out.html', // will pass output as a string if no file name is specified and promise is resolved
  engineOpts: { pretty: true }
})
.then(() => console.log('Success!'))
.catch((err) => console.error('Uh oh.'));
```
