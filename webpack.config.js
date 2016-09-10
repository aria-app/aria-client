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
        test: /\.js$/,
        include: [
          path.join(__dirname, 'src'),
        ],
        loader: 'babel',
      },
      {
        test: /\.json/,
        loader: 'json',
      },
    ],
  },
  externals: {
    'react/addons': true,
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true,
  },
  postcss: function postcss() {
    return [autoprefixer];
  },
};
