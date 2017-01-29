const webpack = require('webpack');
const wallabyWebpack = require('wallaby-webpack');

module.exports = function wallabyConfig(wallaby) {
  const webpackPostprocessor = wallabyWebpack({
    externals: {
      'react/addons': true,
      'react/lib/ExecutionEnvironment': true,
      'react/lib/ReactContext': true,
    },
    plugins: [
      new webpack.NormalModuleReplacementPlugin(/\.(gif|png|scss|css)$/, 'node-noop'),
    ],
  });
  return {
    files: [
      { pattern: 'setup.js', load: false },
      { pattern: 'src/**/*.js', load: false },
      { pattern: '!src/**/*.stories.js', load: false },
      { pattern: '!src/**/*.test.js', load: false },
    ],
    tests: [
      { pattern: 'src/**/*.test.js', load: false },
    ],
    compilers: {
      '**/*.js': wallaby.compilers.babel({
        plugins: [
          'lodash',
          'transform-class-properties',
          'transform-runtime',
        ],
        presets: [
          'es2015',
          'stage-2',
        ],
      }),
    },
    postprocessor: webpackPostprocessor,
    debug: true,
    setup: function setup() {
      // eslint-disable-next-line no-underscore-dangle
      window.__moduleBundler.loadTests();
    },
  };
};
