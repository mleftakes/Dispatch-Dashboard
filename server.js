/* eslint-env node */

const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');

// bring in the models
const db = require('./models');

const app = express();
const server = http.Server(app);
// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static('public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false,
  limit: '50mb',
}));

require('./controllers/api_routes.js')(app, server);
require('./controllers/frontend_routes.js')(app);
require('./controllers/image_routes.js')(app);

// listen on port 3000
const PORT = process.env.PORT || 3000;
db.sequelize.sync().then(() => {
  server.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`); // eslint-disable-line no-console
  });
});

