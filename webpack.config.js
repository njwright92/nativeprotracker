const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function (env, argv) {
  const webpackConfig = await createExpoWebpackConfigAsync(env, argv);
  return webpackConfig;
};
