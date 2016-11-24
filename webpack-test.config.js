// const webpack = require('webpack');
//
// module.exports = {
//   entry: './test.js',
//   output: {
//     path: '.',
//     filename: 'test-bundle.js',
//   },
//   devServer: {
//     stats: {
//       chunks: false,
//     },
//     contentBase: '.',
//   },
//   module: {
//     loaders: [
//       {
//         test: /\.scss$/,
//         exclude: /node_modules/,
//         loader: 'null',
//       },
//       {
//         test: /\.js$/,
//         exclude: /node_modules/,
//         loader: 'babel',
//       },
//       {
//         test: /\.json$/,
//         loader: 'json',
//       },
//     ],
//     noParse: [
//       /node_modules\/sinon/,
//     ],
//   },
//   externals: {
//     'react/addons': true,
//     'react/lib/ExecutionEnvironment': true,
//     'react/lib/ReactContext': true,
//   },
//   plugins: [
//     new webpack.HotModuleReplacementPlugin(),
//   ],
// };

const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  entry: {
    tests: './test/index.js',
    vendor: './test/vendor.js',
  },
  devServer: {
    stats: {
      chunks: false,
    },
    contentBase: '.',
  },
  output: {
    path: 'test',
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
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(true),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['tests', 'vendor'],
    }),
    new HtmlWebpackPlugin({
      template: 'test/index.html',
    }),
  ],
};
