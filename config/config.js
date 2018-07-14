/* eslint-env node, es6 */

const path = require('path');

module.exports = () => {
  if (process.env.JAWSDB_URL) {
    return process.env.JAWSDB_URL;
  }

  var config = require(path.join(__dirname, "local_config.json"));

  return config;
};
