/* eslint-env node, es6 */

const fs = require('fs');
const path = require('path');
const nanoid = require('nanoid');

module.exports = (app) => {
  app.get('/cameratest', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/cameratest.html'));
  });

  app.post('/add-image', (req, res) => {
    const uri = req.body.uri;
    const prefix = 'data:image/png;base64,';

    if (!uri.startsWith(prefix)) {
      res.json({ error: 'Invalid URI! Must be a Base64-encoded PNG file' });
      return;
    }

    const buf = Buffer.from(uri.slice(prefix.length), 'base64');

    const fileName = `${nanoid()}.png`;
    const filePath = path.join(__dirname, `../bols/${fileName}`);

    fs.writeFile(filePath, buf, (err) => {
      if (err) {
        res.json({ error: err });
        return;
      }

      res.json( { fileName: fileName });
    });
  });
};
