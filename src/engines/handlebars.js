const TemplateEngine = require('./base.js');
const handlebars = require('handlebars');

class HandlebarsTemplateEngine extends TemplateEngine {
  constructor(templateString, locals, engineOpts) {
    super(templateString, locals, engineOpts);
  }

  compile() {
    return handlebars.compile(this.templateString, { ...this.engineOpts });
  }

  render() {
    return this.compile(this.locals);
  }
}

module.exports = HandlebarsTemplateEngine;
