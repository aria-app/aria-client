const coreConfig = require('./webpack-core.config');
const webpack = require('webpack');
const merge = require('webpack-merge');

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
