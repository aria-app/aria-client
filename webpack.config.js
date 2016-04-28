const autoprefixer = require('autoprefixer');
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: 'public',
    filename: 'bundle.js',
  },
  devServer: {
    stats: {
      chunks: false,
    },
    contentBase: 'public',
  },
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loader: 'style!css!postcss!sass',
      },
      {
        test: /\.json$/,
        exclude: /node_modules/,
        loader: 'json',
      },
      {
        test: /\.js$/,
        include: [
          path.join(__dirname, 'src'),
        ],
        loader: 'babel',
      },
    ],
  },
  postcss: function postcss() {
    return [autoprefixer];
  },
  resolve: {
    root: path.join(__dirname, 'src'),
  },
};
