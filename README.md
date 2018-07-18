# excelsior

Transform .xlsx files into template formatted HTML with ease! Kelly Roland approved.

<div style="width:100%;height:0;padding-bottom:74%;position:relative;"><iframe src="https://giphy.com/embed/OgRQGJ3dbuz8A" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div><p><a href="https://giphy.com/gifs/OgRQGJ3dbuz8A">via GIPHY</a></p>

## Install

`npm install -g excelsior`

## Usage

### Templates

In your template, the `sheets` variable will be exposed, which will contain an array of the worksheets available in your Excel document. Each of the elements within one of these worksheets will contain one of two data types:

1. an array of JS objects whose keys are cell names e.g. `[ 'A1': [CellObject], 'A2': [CellObject], ... ]`

2. a 2D array of zero-indexed rows and columns e.g. `[ [ [CellObject], [CellObject], [CellObject], ...], [ [CellObject], [CellObject], [CellObject], ...] ...]`

For the 2D array structure, you should pass the `-z` or `--zeroIndexed` flag.

### CLI

Executing a command like `excelsior transform input.xlsx template.ejs` will print your templated HTML to the standard output.

To specify an output file, use something like `excelsior transform -o output.html input.xlsx template.ejs`

### Programmatic Usage

TODO
