const coreConfig = require('./webpack-core.config');
const merge = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');

module.exports = merge.smart({}, coreConfig, {
  devServer: {
    stats: {
      chunks: false,
    },
    contentBase: path.join(__dirname, '../public'),
  },
  devtool: 'eval',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
});
