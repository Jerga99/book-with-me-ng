const Booking = require("../models/booking");
const Rental = require("../models/rental");
const User = require("../models/user");
const {normalizeErrors} = require("../helpers/mongoose-helper");
const moment = require('moment');

exports.createBooking = function(req, res, next) {
  const { startAt, endAt, totalPrice, days, guests, rentalId, rental } = req.body;
  const user = res.locals.user;
  const booking = new Booking({startAt, endAt, totalPrice, days, guests});

  Rental.findById(rental._id).populate('bookings').populate('user').exec(function(err, foundRental) {
    if (err) {
      return res.status(422).send({errors: normalizeErrors(err.errors) });
    }

    if (foundRental.user.id === user.id) {
      return res.status(422).send({errors: [{title: 'Invalid User', detail: "Cannot create booking on your rental"}] });
    }

    if (isValidBooking(booking, foundRental)) {
      booking.user = user;
      booking.rental = foundRental;
      foundRental.bookings.push(booking);

      User.update({_id: user.id}, { $push: {bookings: booking}}, function(){});
      booking.save();
      foundRental.save();

      return res.json({startAt: booking.startAt, endAt: booking.endAt});
    } else {
      return res.status(422).send({errors: [{title: 'Invalid Booking', detail: "Choosen dates are already taken"}] });
    }
  })
}

exports.getUserBookings = function(req, res, next) {
  const user = res.locals.user;

  Booking.where({user: user}).populate('rental').exec(function(err, foundBookings){
    if (err) {
      return res.status(422).send({errors: normalizeErrors(err.errors) });
    }

    res.json(foundBookings);
  });
}

function isValidBooking(proposedBooking, rental) {
  let isValid = true;

  if (rental.bookings && rental.bookings.length > 0) {
    isValid = rental.bookings.every(function(booking) {
      const proposedStart = moment(proposedBooking.startAt);
      const proposedEnd = moment(proposedBooking.endAt);
      const actualStart = moment(booking.startAt);
      const actualEnd = moment(booking.endAt);

      return ((actualStart < proposedStart && actualEnd < proposedStart) || (proposedEnd < actualEnd && proposedEnd < actualStart));
    });
  }

  return isValid;
}


