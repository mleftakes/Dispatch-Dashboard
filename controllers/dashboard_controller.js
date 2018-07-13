// Our Burger controller
// =====================
// This file uses Sequelize to manage data manipulation
// for all apropos http requests.
// NOTE: This is the same file from last week's homework,
// but with each route gutted and replaced with sequelize queries
// where references to our outmoded ORM file once sat.
var express = require("express");

var router = express.Router();
// grabbing our models
var db = require("../models");

// get route -> index
router.get("/", function(req, res) {
  // send us to the next get function instead.
  res.redirect("/dispatch");
});

// get route, edited to match sequelize
router.get("/dispatch", function(req, res) {
  // replace old function with sequelize function
  db.Dispatch.findAll({
        // Here we specify we want to return our burgers in ordered by ascending burger_name
    order: [
      ["checkin", "DESC"]
    ]
  })
  .then(function(dispatches) {
    res.json(dispatches);
  });
});

// post route to create burgers
router.post("/dispatch/checkin", function(req, res) {
  // edited burger create to add in a burger_name
  db.Dispatch.create({
    driver: req.body.driver_id,
    is_shipper: req.body.is_shipper,
    checkin: db.sequelize.fn('NOW')
  })
  // pass the result of our call
    .then(function(data) {
    // log the result to our terminal/bash window
      console.log(data);
      // redirect
      res.json(data.id);
    });
});


router.post("/drivers/create", function(req, res) {
  // edited burger create to add in a burger_name
  db.driver.create({
    driver: req.body.name,
    image: req.body.image
  })
  // pass the result of our call
    .then(function(data) {
    // log the result to our terminal/bash window
      console.log(data);
      // redirect
      res.json(data.id);
    });
});

router.put('/dispatch/checkout', function(req, res) {
  var id = req.body.dispatch_id;

  db.Dispatch.update({
    checkout: db.sequelize.fn('NOW')
  }, {
    where: {
      id: id
    }
  })
  .then(function() {
    res.json('/');
  })
  .catch(function(err) {

  });
});

module.exports = router;
