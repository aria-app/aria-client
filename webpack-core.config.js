const _ = require('lodash');
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const dependencies = require('./package.json').dependencies;
const vendor = _(dependencies)
  .omit('babel-polyfill')
  .omit('react-icons')
  .keys()
  .value();

module.exports = {
  entry: {
    app: './src/index.js',
    vendor,
  },
  output: {
    path: 'public',
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
      template: './src/index.html',
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
