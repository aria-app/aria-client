const CircularDependencyPlugin = require('circular-dependency-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  entry: {
    tests: path.join(__dirname, '../test/index.js'),
    vendor: path.join(__dirname, '../test/vendor.js'),
  },
  devServer: {
    stats: {
      chunks: false,
    },
    contentBase: '.',
  },
  output: {
    path: path.join(__dirname, '../test'),
    publicPath: 'http://localhost:5000/',
    filename: '[name].js',
    chunkFilename: '[id].chunk.js',
  },
  resolve: {
    extensions: ['.js'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.json$/,
        loader: 'json',
      },
      {
        test: /\.js$/,
        enforce: 'pre',
        exclude: /(node_modules|uxt-core)/,
        loader: 'eslint-loader',
      },
      {
        test: /\.(scss|png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: 'null-loader',
      },
    ],
  },
  externals: {
    cheerio: 'window',
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
      template: path.join(__dirname, '../test/index.html'),
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(true),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['tests', 'vendor'],
    }),
  ],
};
