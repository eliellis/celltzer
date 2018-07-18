class TemplateEngine {
  constructor(templateString, locals) {
    this.templateString = templateString;
    this.locals = locals;
    this.output = `<head>
  <title>Generated with TemplateEngine base-class</title>
</head>
<body style="font-family: monospace">
  You can use <a href="https://pugjs.org/">pug</a>,
  <a href="https://handlebarsjs.com/">handlebars</a>,
  and <a href="http://ejs.co/">ejs</a> out-of-the-box.
  Or extend the TemplateEngine class (me) and add your own template language support.
  Check out the <a href="https://github.com/eliellis/excelsior">repo</a> for more information.
</body>
`
  }
  compile() { return (() => Promise.resolve(this.output)); }
  render() { return (() => Promise.resolve(this.output)); }
}

module.exports = TemplateEngine;
