/* eslint-env node, es6 */

const nanoid = require('nanoid');
const path = require('path');
const fs = require('fs');

module.exports = (uri) => {
  return new Promise((resolve, reject) => {
    const prefix = 'data:image/png;base64,';

    if (!uri.startsWith(prefix)) {
      reject(Error('Invalid URI! Must be a Base64-encoded PNG file'));
      return;
    }

    const buf = Buffer.from(uri.slice(prefix.length), 'base64');

    const fileName = `${nanoid()}.png`;
    const filePath = path.join(__dirname, `../bols/${fileName}`);

    fs.writeFile(filePath, buf, (err) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(fileName);
    });
  });
};