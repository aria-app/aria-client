const { run } = require('runjs');

const tasks = {
  build() {
    tasks.clean();
    run('webpack --progress --colors --config configs/webpack-prod.config.js');
  },

  clean() {
    run('rimraf public');
  },

  deploy() {
    tasks.build();
    run('surge ./public zen-sequencer.surge.sh');
  },

  lint() {
    run('eslint src');
  },

  start() {
    tasks.clean();
    run('webpack-dev-server --inline --config configs/webpack-dev.config.js');
  },

  storybook() {
    run('start-storybook -p 6006');
  },

  test() {
    tasks.clean();
    run('webpack-dev-server --inline --config configs/webpack-test.config.js --port 5000');
  },
};

module.exports = tasks;
