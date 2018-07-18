const fs = require('fs');
const { promisify } = require('util');
const xlsx = require('xlsx');
const ejs = require('ejs');
const program = require('commander');

program.version(require('./package.json').version);

program
.command('transform <inputFile> <templateFile>')
.alias('t')
.option('-o --output <filename>', 'Output file name.')
.option('-z --zeroIndexed', 'Manipulates sheet data from named columns and 1-indexed rows to 0-indexed columns and rows.')
.description('Transforms an input Excel file to an HTML document using a specified template.')
.action(async (inputFile, templateFile, cmd) => {
  const wb = xlsx.readFile(inputFile);
  fs.readFile(templateFile, { encoding: 'utf8' }, async (err, file) => {
    if (!err && wb.SheetNames.length > 0) {
      let locals = {
        sheets: wb.SheetNames.map(name => wb.Sheets[name])
      };

      const size = locals.sheets
      .map(sheet => sheet['!ref'])
      .map(range => xlsx.utils.decode_range(range))
      .map(range => (range.e.c - range.s.c) * (range.e.r - range.s.r))
      .reduce((a, b) => a + b);
      console.log(`Total number of cells: ${ size }`);


      if (cmd.zeroIndexed) {
        locals.sheets = locals.sheets.map(sheet => {
          if (sheet['!ref']) {
            const range = xlsx.utils.decode_range(sheet['!ref']);
            let arr = new Array(range.e.r);
            // row major, no thrashing
            for (let j = range.s.r; j <= range.e.r; j++) {
              if (!arr[j]) {
                arr[j] = new Array(range.e.c);
              }
              for (let i = range.s.c; i <= range.e.c; i++) {
                let cellName = xlsx.utils.encode_cell({ c: i, r: j });
                let cell = sheet[cellName] ? sheet[cellName] : null;
                arr[j][i] = cell;
              }
            }

            return arr;
          }
        });
      }

      const template = ejs.compile(file, { async: true });

      if (cmd.output) {
        const writeFile = promisify(fs.writeFile);
        await writeFile(`${ __dirname }/${ cmd.output }`, await template(locals));
        console.log(`Wrote HTML file to ${ cmd.output }.`)
      }
    }

    if (err) {
      console.error(err.message);
    }
  })
});

program.parse(process.argv);
