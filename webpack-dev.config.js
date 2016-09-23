const coreConfig = require('./webpack-core.config');
const merge = require('webpack-merge');
const webpack = require('webpack');

module.exports = merge.smart({}, coreConfig, {
  devServer: {
    stats: {
      chunks: false,
    },
    contentBase: 'public',
  },
  devtool: 'eval',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
});
