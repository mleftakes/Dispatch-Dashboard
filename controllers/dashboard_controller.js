
var express = require("express");

var router = express.Router();
// grabbing our models
var db = require("../models");

// get route -> index
router.get("/", function(req, res) {
  // send us to the next get function instead.
  res.redirect("/Dispatch");
});

// get route, edited to match sequelize
router.get("/Dispatch", function(req, res) {
  // replace old function with sequelize function
  db.Dispatch.findAll({
        // Here we specify we want to return our burgers in ordered by ascending burger_name
    order: [
      ["Checkin", "ASC"]
    ]
  })
  // use promise method to pass the burgers...
    .then(function(Dispatch) {
    // into the main index, updating the page
      var hbsObject = {
        dispatch: Dispatch
      };
      return res.render("index", hbsObject);
    });
});

module.exports = router;