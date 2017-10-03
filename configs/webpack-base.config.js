const autoprefixer = require('autoprefixer');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const htmlWebpackTemplate = require('html-webpack-template');
const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    app: path.join(__dirname, '../src/index.js'),
    vendor: [
      'babel-polyfill',
      'classnames',
      'lodash',
      'prop-types',
      'react',
      'redux-devtools-extension',
      'react-dom',
      'react-hyperscript',
      'react-redux',
      'redux',
      'redux-saga',
    ],
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'eslint-loader',
          options: {
            quiet: true,
          },
        },
      },
      {
        exclude: /node_modules/,
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [
              'transform-class-properties',
              'transform-decorators-legacy',
            ],
            presets: [
              'es2015',
              'stage-2',
            ],
          },
        },
      },
      {
        test: /\.scss/,
        use: ExtractTextWebpackPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: [
                  autoprefixer(),
                ],
                sourceMap: true,
              },
            },
            'resolve-url-loader',
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
              },
            },
          ],
        }),
      },
      {
        test: /\.ttf$/,
        use: [
          'file-loader',
        ],
      },
    ],
  },
  output: {
    filename: '[name].[chunkhash].bundle.js',
    path: path.resolve(__dirname, '../dist'),
  },
  plugins: [
    new CleanWebpackPlugin([
      path.join(__dirname, '../dist'),
    ], {
      root: path.join(__dirname, '../'),
    }),
    new HtmlWebpackPlugin({
      appMountId: 'root',
      baseHref: '/',
      inject: false,
      title: 'Zen Sequencer',
      template: htmlWebpackTemplate,
    }),
    new ExtractTextWebpackPlugin('[name][contenthash].css'),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'runtime',
    }),
    new CircularDependencyPlugin({
      exclude: /node_modules/,
      failOnError: true,
    }),
  ],
};
