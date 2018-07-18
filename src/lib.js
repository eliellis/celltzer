const fs = require('fs');
const { promisify } = require('util');
const xlsx = require('xlsx');
const glob = promisify(require('glob'));

exports.transformFile = function transformFile() {
  return async (inputFile, templateFile, cmd) => {
    const engines = await glob(__dirname + '/engines/*.js');

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

        const Engine = require(engines.find(value => RegExp(cmd.engine).test(value)));
        const engine = new Engine(file, locals);

        const template = engine.compile();
        if (cmd.output) {
          console.log(`Total number of cells: ${size}`);
          const writeFile = promisify(fs.writeFile);
          await writeFile(`${ process.cwd() }/${cmd.output}`, await template(locals));
          console.log(`Wrote HTML file to ${cmd.output}.`);
        }
        else {
          console.log(await template(locals));
        }
      }
      if (err) {
        console.error(err.message);
      }
    });
  };
}
