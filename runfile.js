const { run } = require('runjs');

const tasks = {
  clean: () => {
    run('rimraf ./public');
  },
  start: () => {
    tasks.clean();
    run('webpack-dev-server --inline --config ./webpack-dev.config.js');
  },
};

module.exports = tasks;
