/**
 * This is a Webpack config. It has configs for Webpack so Webpack can build build.js.
 * Isn't that descriptive? Are you happy now? I wrote you a comment.
 */
var webpack = require('webpack');
var path = require('path');
var fs = require('fs');
var baseConfig = require('./cfg/webpack.base.js');

process.env.REACT_WEBPACK_ENV = 'dist';

/**
 * These lines exclude node_modules from be loaded in the bundled file and instead just keeps them as normal require statements
 * This is how we keep Webpack happy with node_modules.
 * Otherwise it would likely get very upset with us, like your mom that time your tried to hide the dog poop in the dryer.
 * @type {Object}
 */
var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

/**
 * Now we exports our config using a plain js object.
 * Webpack uses plain JS objects in a JS file, this makes it easier to write than JSON (seriously no comments? wtf json)
 * and composable.
 * Say you want to share config between two configs, with plain JS that it is dead simple,
 * you rejust put a reuiqre statement and call up lodash's merge and voila shared config!
 */
var config = {
  entry: './src/build.js',
  target: 'node',
  externals: nodeModules, // Happy now, Webpack? *Mudvayne song from that SAW film starts playing*
  output: {
    path:'./',
    filename: 'build.js'
  },
  node: {
    global: true,
    __filename: true,
    __dirname: './'
  },
  resolve: baseConfig.resolve,
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel',
        exclude: /node_modules/
      }
    ]
  }
}

module.exports = config;
