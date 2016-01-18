function indexView(locals) {
  return `
<!--- This is used by the Webpack dev server only -->
<!doctype html>
<html>
  <head>
    <title>${locals.title}</title>
    <script type="text/javascript">
      window.__DATA__ = ${JSON.stringify(locals.data)};
    </script>
    <link rel="stylesheet" href="assets/app.css" media="screen" title="no title" charset="utf-8">
  </head>
  <body>
    <div id='app'>
      ${locals.reactApp}
    </div>
    <script type="text/javascript" src="assets/app.js"></script>
  </body>
</html>
  `;
}

module.exports = indexView;
