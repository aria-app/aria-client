const coreConfig = require('./webpack-core.config');
const merge = require('webpack-merge');
const webpack = require('webpack');

module.exports = merge.smart({}, coreConfig, {
  devtool: 'cheap-module-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
  ],
});
