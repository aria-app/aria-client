const merge = require('webpack-merge');
const webpack = require('webpack');
const baseConfig = require('./webpack-base.config.js');

module.exports = merge(baseConfig, {
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.HashedModuleIdsPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: this.devtool && (this.devtool.indexOf("sourcemap") >= 0 || this.devtool.indexOf("source-map") >= 0)
    }),
  ],
});
