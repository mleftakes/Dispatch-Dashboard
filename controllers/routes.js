/* eslint-env node, es6 */

const express = require("express");
const router = express.Router();
const path = require('path');

module.exports = (app) => {
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/truckerID.html'));
  });

  app.get('/checkin/:id', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/trucker.html'));
  });

  app.get('/style.css', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/assets/css/style.css'));
  });

  app.get('/camera.js', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/assets/js/camera.js'));
  });

  app.get('/script.js', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/assets/js/script.js'));
  });

  app.get('/moment.js', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/assets/js/moment.js'));
  });

  app.get('/bg.jpg', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/assets/images/bg.jpg'));
  });
};