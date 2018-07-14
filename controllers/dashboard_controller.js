
var express = require("express");

var router = express.Router();
// grabbing our models
var db = require("../models");

// get route, edited to match sequelize
router.get("/dispatch", function(req, res) {
  // replace old function with sequelize function
  db.Dispatch.findAll({
    order: [
      ["checkin", "DESC"]
    ]
  })
    .then(function(dispatches) {
      res.json(dispatches);
    });
});

router.post("/dispatch/checkin", function(req, res) {
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
