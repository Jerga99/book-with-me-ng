const express = require("express");
const router = express.Router();
const Rental = require("../models/rental");
const Auth = require("../controllers/auth");


// TEST WITH AUTH MIDDLEWARE
router.get("/", function(req, res) {
  Rental.find({}, function(err, allRentals) {
    res.json(allRentals);
  });
});

router.get("/:id", function(req, res) {
  Rental.findById(req.params.id, function(err, foundRental){
    res.json(foundRental);
  });
});

module.exports = router;
