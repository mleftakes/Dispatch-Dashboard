/* eslint-env node, es6 */

const bodyParser = require('body-parser');
const path = require('path');

const images = require('../models/bols.js');

module.exports = (app) => {
  app.get('/cameratest', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/cameratest.html'));
  });

  app.post('/add-image', (req, res) => {
    images(req.body.uri)
      .then(imageName => res.json({ imageName }))
      .catch(error => res.json({ error }));
  });
};
