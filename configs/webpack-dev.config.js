const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack-base.config.js');

module.exports = merge(baseConfig, {
  devServer: {
    contentBase: path.join(__dirname, '../dist'),
    historyApiFallback: true,
    stats: {
      chunks: false,
    },
  },
  devtool: 'cheap-eval-source-map',
});
