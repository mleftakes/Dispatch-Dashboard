const fs = require('fs');
const path = require('path');
const nanoid = require('nanoid');

const bolsPath = path.join(__dirname, '../public/assets/images/bols');
const userImagesPath = path.join(__dirname, '../public/assets/images/user-images');

function getImage(dirPath, name, res) {
  res.sendFile(path.join(dirPath, name));
}

function addImage(dirPath, uri, res) {
  const prefix = 'data:image/png;base64,';

  if (!uri.startsWith(prefix)) {
    res.json({ error: 'Invalid URI! Must be a Base64-encoded PNG file' });
    return;
  }

  const buf = Buffer.from(uri.slice(prefix.length), 'base64');

  const fileName = `${nanoid()}.png`;

  fs.exists(dirPath, (exists) => {
    if (!exists) {
      fs.mkdirSync(dirPath);
    }

    const filePath = path.join(dirPath, fileName);

    fs.writeFile(filePath, buf, (err) => {
      if (err) {
        res.json({ error: err });
        return;
      }

      res.json({ fileName });
    });
  });
}

module.exports = (app) => {
  app.get('/bol/:name', (req, res) => {
    getImage(bolsPath, req.params.name, res);
  });

  app.get('/user-image/:name', (req, res) => {
    getImage(userImagesPath, req.params.name, res);
  });

  app.post('/add-bol', (req, res) => {
    addImage(bolsPath, req.body.uri, res);
  });

  app.post('/add-user-image', (req, res) => {
    addImage(userImagesPath, req.body.uri, res);
  });
};
