function buildConfig(env) {
  var config = env || 'dev';
  return require('./webpack.' + config + '.js');
}

module.exports = buildConfig;
