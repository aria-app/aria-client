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
    rules: [
      {
        test: /\.scss$/,
        loader: 'style-loader!css-loader!postcss-loader!sass-loader',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          plugins: [
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
