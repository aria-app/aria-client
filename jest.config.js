module.exports = {
  transform: {
    [`(@material-ui/core).+\\.js$`]: 'babel-jest',
  },
  transformIgnorePatterns: [`/node_modules/(?!@material-ui/core)`],
};
