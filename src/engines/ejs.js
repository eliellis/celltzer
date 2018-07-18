const TemplateEngine = require('./base.js');
const ejs = require('ejs');

class EJSTemplateEngine extends TemplateEngine {
  constructor(templateString, locals) {
    super(templateString, locals);
  }

  compile() {
    return ejs.compile(this.templateString, { async: true });
  }

  async render() {
    return await this.compile(this.locals);
  }
}


module.exports = EJSTemplateEngine;
