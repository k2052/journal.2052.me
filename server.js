'use strict';

var metal = require('./src/configureMetalsmith');
let indexView = require('./src/indexView')
let webpack = require('webpack');
let webpackDevMiddleware = require('webpack-dev-middleware');
let webpackHotMiddleware = require('webpack-hot-middleware');
let config = require('./webpack.client.config.js');

let app = require('express')();

const compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
app.use(webpackHotMiddleware(compiler));

let posts = null;
function getPosts(callback) {
  /**
   * Hack to prevent metalsmith from running multiple times. Because I still don't know JS apparently
   */
  if(posts != null) {
    return callback(posts)
  }

  posts = [];

  metal.read(function(err, files){
    metal.run(files, () => {
      let t = this;
      t._metadata.posts.map((post) => {
        posts.push({
          title: post.title,
          slug: post.slug,
          date: post.publishDate,
          contents: post.contents.toString('utf8')
        });
      })

      callback(posts)
    });
  });
}

app.get('/', function(req, res) {
  getPosts((posts) => {
    res.send(indexView({ title: 'Dev Server', data: {posts: posts}}));
  })
});

// TODO: Add route for individual posts

app.listen(8000);
console.log("listening on: " + 8000);
