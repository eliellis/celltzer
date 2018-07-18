const program = require('commander');
const lib = require('./src/lib.js');

program.version(require('./package.json').version);

program
.command('transform <inputFile> <templateFile>')
.alias('t')
.option('-o --output <filename>', 'Output file name.')
.option('-e --engine <templateEngine>', 'Templating engine to use.', /^(ejs|handlebars|pug|base)$/i, 'ejs')
.option('-z --zeroIndexed', 'Manipulates sheet data from named columns and 1-indexed rows to 0-indexed columns and rows.')
.description('Transforms an input Excel file to an HTML document using a specified template.')
.action(lib.transformFile());

program.parse(process.argv);

module.exports = lib;
