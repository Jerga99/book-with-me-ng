const express = require("express");
const router = express.Router();
const Rental = require("../models/rental");
const User = require("../models/user");
const Auth = require("../controllers/auth");
const Booking = require("../models/booking");
const {normalizeErrors} = require("../helpers/mongoose-helper");

// TEST WITH AUTH MIDDLEWARE
router.get("", function(req, res) {
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

router.post("", Auth.authMiddleware, function(req, res) {
  const { title, city, street, category, image, bedrooms, description, dailyRate } = req.body;

  const rental = new Rental({title, city, street, category, image, bedrooms, description, dailyRate});
  const user = res.locals.user;
  rental.user = user;

  Rental.create(rental, function(err, newRental) {
    if (err) {
      return res.status(422).send({errors: normalizeErrors(err.errors) });
    } else {
      User.update({_id: user.id}, { $push: {rentals: newRental}}, function(){});
      res.status(200).send({});
    }
  });
});

router.get("/manage", Auth.authMiddleware, function(req, res) {
  const user = res.locals.user;

  Rental.where({user: user}).populate('bookings').exec(function(err, foundRentals){
    if (err) {
      return res.status(422).send({errors: normalizeErrors(err.errors) });
    }

    res.json(foundRentals);
  });
});

router.patch("/:id", Auth.authMiddleware, function(req, res) {

  const rentalData = req.body;
  const user = res.locals.user;

  Rental.findById(req.params.id)
  .populate('user')
  .exec(function(err, foundRental) {
     if (foundRental.user.id !== user.id) {
      return res.status(422).send({errors: [{title: 'Invalid User', detail: "Update not allowed!"}] });
    }

    if (err) { return res.status(422).send({errors: normalizeErrors(err.errors)})};

    foundRental.set(rentalData);
    foundRental.save(function(err) {
      if (err) { return res.status(422).send({errors: normalizeErrors(err.errors)})};

      return res.status(200).send(foundRental);
    });
  });
});

router.delete("/:id", Auth.authMiddleware, function(req, res) {

  Rental.deleteOne({_id: req.params.id})
    .where({bookings: {$size: 0}})
    .exec(function(err, rental) {
      if (err) { return res.status(422).send({errors: normalizeErrors(err.errors) });}
      if (rental.n == 0) {
        return res.status(422).send({errors: [{title: 'Has Bookings', detail: "Cannot delete rental with active bookings. Please contact support for more info"}] });
      }

      return res.status(200).send({success: "ok"});
  });
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

