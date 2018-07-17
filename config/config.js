/* eslint-env node, es6 */

const path = require('path');

const config = require(path.join(__dirname, 'local_config.json')); // eslint-disable-line import/no-dynamic-require

module.exports = () => {
  if (process.env.JAWSDB_URL) {
    return process.env.JAWSDB_URL;
  }

  return config;
};
