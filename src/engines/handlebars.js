const TemplateEngine = require('./base.js');
const handlebars = require('handlebars');

class HandlebarsTemplateEngine extends TemplateEngine {
  constructor(templateString, locals) {
    super(templateString, locals);
  }

  compile() {
    return handlebars.compile(this.templateString);
  }

  render() {
    return this.compile(this.locals);
  }
}

module.exports = HandlebarsTemplateEngine;
