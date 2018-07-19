const fs = require('fs');
const { promisify } = require('util');
const xlsx = require('xlsx');
const glob = promisify(require('glob'));
const debug = require('debug')('excelsior');

exports.transformFile = async function transformFile(inputFile, templateFile, options) {
  // get list of engines
  const engines = await glob(__dirname + '/engines/*.js');

  // TODO streaming read
  const wb = xlsx.readFile(inputFile);
  const readFile = promisify(fs.readFile);
  let file = await readFile(templateFile, { encoding: 'utf8' });
  // if no error and there are sheets present in the document
  if (wb.SheetNames.length > 0) {
    let locals = {
      sheets: wb.SheetNames.map(name => wb.Sheets[name])
    };

    // calculate records count
    const size = locals.sheets
      .map(sheet => sheet['!ref'])
      .map(range => xlsx.utils.decode_range(range))
      .map(range => (range.e.c - range.s.c) * (range.e.r - range.s.r))
      .reduce((a, b) => a + b);

    // tranform data to 2D structure from alphanumeric key / value structure
    if (options.zeroIndexed) {
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

    // search through 'engines' directory for templating engines
    // require the first match, and instantiate it like a TemplateEngine should be
    const Engine = require(engines.find(value => RegExp(options.engine).test(value)));
    const engine = new Engine(file, locals, options.engineOpts ? options.engineOpts : {});

    // compile the template
    const template = engine.compile();

    if (options.output) {
      debug(`Total number of cells: ${ size }`);
      const writeFile = promisify(fs.writeFile);
      await writeFile(`${ process.cwd() }/${ options.output }`, await template(locals));
      debug(`Wrote HTML file to ${ options.output }.`);
      return await null;
    }
    else {
      return template(locals);
    }
  }
};
