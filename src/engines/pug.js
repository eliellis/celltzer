const TemplateEngine = require('./base.js');
const pug = require('pug');

class PugTemplateEngine extends TemplateEngine {
  constructor(templateString, locals) {
    super(templateString, locals);
  }

  compile() {
    return pug.compile(this.templateString, { pretty: true });
  }

  render() {
    return this.compile(this.locals);
  }
}

module.exports = PugTemplateEngine;
