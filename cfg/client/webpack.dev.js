var path = require('path');
var webpack = require('webpack');
var _ = require('lodash');

var baseConfig = require('../webpack.base');

var config = _.merge({
  entry: [
    'webpack-hot-middleware/client?reload=true',
    path.join(__dirname, '../../src/client/index')
  ],
  cache: true,
  devtool: 'eval',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      __DEV__: true
    })
  ],
  module: {
    loaders: [
      {
        test: /\.md/,
        loader: 'react-markdown'
      },
      {
        test: /\.(png|jpg|gif|woff|woff2|svg)$/,
        loader: 'url-loader?limit=8192'
      },
      {
        test: /\.(js|jsx)$/,
        loader: 'babel',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loaders: ['style', 'css']
      },
      {
        test: /\.sass$/,
        loaders: ['style', 'css', 'sass?indentedSyntax']
      }
    ]
  },
  query: {
    plugins: [
      ["react-transform", {
        "transforms": [{
          "transform": "react-transform-hmr",
          "imports": ["react"],
          "locals": ["module"]
        }]
      }]
    ]
  }
}, baseConfig);

module.exports = config;
