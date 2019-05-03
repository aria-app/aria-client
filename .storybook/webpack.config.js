module.exports = ({ config, mode }) => {
  delete config.resolve.alias["core-js"];
  return config;
};
