module.exports = {
  entry: './test.js',
  output: {
    path: '.',
    filename: 'test-bundle.js',
  },
  devServer: {
    stats: {
      chunks: false,
    },
    contentBase: '.',
  },
  module: {
    loaders: [
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loader: 'null',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
      },
      {
        test: /\.json$/,
        loader: 'json',
      },
    ],
  },
  externals: {
    'react/addons': true,
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true,
  },
  resolve: {
    modulesDirectories: [
      'node_modules',
      'src',
    ],
  },
};
