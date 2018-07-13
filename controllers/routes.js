/* eslint-env node, es6 */

const express = require("express");
const router = express.Router();
const path = require('path');

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/trucker.html'));
});

router.get('/style.css', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/assets/css/style.css'));
});

router.get('/camera.js', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/assets/js/camera.js'));
});

router.get('/script.js', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/assets/js/script.js'));
});
