/* eslint-env node, es6 */

const fs = require('fs');
const path = require('path');
const nanoid = require('nanoid');

function addImage(dirName, uri, res) {
  const prefix = 'data:image/png;base64,';

  if (!uri.startsWith(prefix)) {
    res.json({ error: 'Invalid URI! Must be a Base64-encoded PNG file' });
    return;
  }

  const buf = Buffer.from(uri.slice(prefix.length), 'base64');

  const fileName = `${nanoid()}.png`;

  const dirPath = path.join(__dirname, `../${dirName}`);

  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
  }

  const filePath = path.join(dirPath, fileName);

  fs.writeFile(filePath, buf, (err) => {
    if (err) {
      res.json({ error: err });
      return;
    }

    res.json( { fileName: fileName });
  });
}

module.exports = (app) => {
  app.get('/cameratest', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/cameratest.html'));
  });

  app.post('/add-bol', (req, res) => {
    addImage('bols', req.body.uri, res);
  });

  app.post('/add-user-image', (req, res) => {
    addImage('user-images', req.body.uri, res);
  });
};
