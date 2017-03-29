const _ = require('lodash');
// const autoprefixer = require('autoprefixer');
const CircularDependencyPlugin = require('circular-dependency-plugin');
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
    rules: [
      {
        test: /\.scss$/,
        loader: 'style-loader!css-loader!postcss-loader!sass-loader',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.json/,
        loader: 'json-loader',
      },
    ],
  },
  performance: {
    hints: false,
  },
  externals: {
    'react/addons': true,
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true,
  },
  plugins: [
    new CircularDependencyPlugin({
      exclude: /node_modules/,
      failOnError: true,
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../src/index.html'),
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
  ],
};
