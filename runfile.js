const { run } = require('runjs');

const tasks = {
  build() {
    tasks.clean();
    run('');
  },

  clean() {
    run('');
  },

  deploy() {
    tasks.build();
    run('');
  },

  lint() {
    run('');
  },

  start() {
    tasks.clean();
    run('');
  },

  storybook() {
    run('');
  },
};

module.exports = tasks;
