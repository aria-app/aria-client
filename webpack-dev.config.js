const autoprefixer = require('autoprefixer');
const coreConfig = require('./webpack-core.config');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = Object.assign({}, coreConfig, {
  devServer: {
    stats: {
      chunks: false,
    },
    contentBase: 'public',
  },
  devtool: 'eval',
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
});
