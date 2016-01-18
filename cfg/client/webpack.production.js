var path = require('path');
var webpack = require('webpack');
var _ = require('lodash');

var baseConfig = require('../webpack.base');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var config = _.merge({
  entry: path.join(__dirname, '../../src/client/index'),
  cache: false,
  devtool: 'none',
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      mangle: false,
      sourceMap: false
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin('app.css', {
    }),
    new webpack.DefinePlugin({
      __DEV__: false,
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
       }
    }),
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
        loader: ExtractTextPlugin.extract('raw')
      },
      {
        test: /\.sass$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css!sass?indentedSyntax=true')
      }
    ]
  }
}, baseConfig);

module.exports = config;
