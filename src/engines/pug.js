const TemplateEngine = require('./base.js');
const pug = require('pug');

class PugTemplateEngine extends TemplateEngine {
  constructor(templateString, locals, engineOpts) {
    super(templateString, locals, engineOpts);
  }

  compile() {
    return pug.compile(this.templateString, { pretty: true, ...this.engineOpts });
  }

  render() {
    return this.compile(this.locals);
  }
}

module.exports = PugTemplateEngine;
