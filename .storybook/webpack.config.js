const autoprefixer = require('autoprefixer');
const webpack = require('webpack');

module.exports = {
  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: function postcss() {
          return [autoprefixer];
        },
      },
    }),
  ],
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loader: 'style!css!postcss!sass',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          plugins: [
            'lodash',
            'transform-class-properties',
            'transform-decorators-legacy',
          ],
          presets: [
            'es2015',
            'stage-2',
          ],
        },
      },
    ],
  },
};
