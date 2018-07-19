const TemplateEngine = require('./base.js');
const ejs = require('ejs');

class EJSTemplateEngine extends TemplateEngine {
  constructor(templateString, locals, engineOpts = {}) {
    super(templateString, locals, engineOpts);
  }

  compile() {
    return ejs.compile(this.templateString, { async: true, rmWhitespace: true, ...this.engineOpts });
  }

  async render() {
    return await this.compile(this.locals);
  }
}


module.exports = EJSTemplateEngine;
