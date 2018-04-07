const express = require("express");
const router = express.Router();
const Booking = require("../controllers/booking");
const Auth = require("../controllers/auth");

router.post('/', Auth.authMiddleware, Booking.createBooking)

module.exports = router;
