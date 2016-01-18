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
    <script>
      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

      ga('create', 'UA-39611341-2', 'auto');
      ga('send', 'pageview');

    </script>
  </body>
</html>
  `;
}

module.exports = indexView;
