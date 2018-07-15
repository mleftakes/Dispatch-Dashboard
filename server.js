var express = require("express");
var bodyParser = require("body-parser");

// bring in the models
var db = require("./models");

var app = express();
// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false,
  limit: '50mb'
}));

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({
  defaultLayout: "main"
}));
app.set("view engine", "handlebars");

var routes = require("./controllers/api_routes");

app.use(routes);

require('./controllers/frontend_routes.js')(app);
require('./controllers/image_routes.js')(app);

// listen on port 3000
var PORT = process.env.PORT || 3000;
// db.sequelize.sync().then(function() {
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
// });

