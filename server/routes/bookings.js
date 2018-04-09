const express = require("express");
const router = express.Router();
const Booking = require("../controllers/booking");
const Auth = require("../controllers/auth");
const {normalizeErrors} = require("../helpers/mongoose-helper");

router.post('/', Auth.authMiddleware, Booking.createBooking)

router.get('/manage', Auth.authMiddleware, function(req, res) {
  const user = res.locals.user;

  Booking.where({user: user}, function(err, foundBookings){
    if (err) {
      return res.status(422).send({errors: normalizeErrors(err.errors) });
    }

    res.json(foundBookings);
  });
});

module.exports = router;
