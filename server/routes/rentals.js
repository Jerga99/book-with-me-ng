const express = require("express");
const router = express.Router();
const Rental = require("../models/rental");
const Auth = require("../controllers/auth");


// TEST WITH AUTH MIDDLEWARE
router.get("/", function(req, res) {
  const city = req.query.city;

  if (city) {
    Rental.find({city: city.toLowerCase()}).select('-bookings').exec(function(err, filteredRentals) {
      if (err || filteredRentals.length === 0 ) {
        return res.status(422).send({errors: [{title: 'No Rentals found', detail: `There are no rentals for city ${city}`}] });
      }

      res.json(filteredRentals);
    });
  } else {
      Rental.find({}).select('-bookings').exec(function(err, allRentals) {
      res.json(allRentals);
    });
  }
});

router.get("/:id", function(req, res) {
  Rental.findById(req.params.id).
    populate('user', 'email -_id').
    populate('bookings', 'startAt endAt -_id').
    exec(function(err, foundRental) {
      res.json(foundRental);
  });
});

module.exports = router;
