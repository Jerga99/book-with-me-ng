const express = require("express");
const router = express.Router();
const seedDb = require("../seed-db");
const Rental = require("../models/rental");

router.get("/", function(req, res) {
  Rental.find({}, function(err, allRentals) {
    res.json(allRentals);
  });
});

module.exports = router;
