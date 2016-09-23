const autoprefixer = require('autoprefixer');
const coreConfig = require('./webpack-core.config');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = Object.assign({}, coreConfig, {
  devtool: 'cheap-module-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
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
