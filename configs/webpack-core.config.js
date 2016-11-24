const _ = require('lodash');
const autoprefixer = require('autoprefixer');
const dependencies = require('../package.json').dependencies;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const vendor = _(dependencies)
  .omit('babel-polyfill')
  .omit('react-icons')
  .omit('tone')
  .keys()
  .value();
const webpack = require('webpack');

module.exports = {
  entry: {
    app: path.join(__dirname, '../src/index.js'),
    vendor,
  },
  output: {
    path: path.join(__dirname, '../public'),
    filename: '[name].bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loader: 'style!css!postcss!sass',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
      },
      {
        test: /\.json/,
        loader: 'json',
      },
    ],
  },
  externals: {
    'react/addons': true,
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../src/index.html'),
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: function postcss() {
          return [autoprefixer];
        },
      },
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
  ],
};
