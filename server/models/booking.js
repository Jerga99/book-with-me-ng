const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookingShema = new Schema({
  endAt: {type: Date, required: 'Starting date is required'},
  startAt: {type: Date, required: 'Ending date is required'},
  totalPrice: Number,
  days: Number,
  guests: Number,
  createdAt: {type: Date, default: Date.now},
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  rental: { type: Schema.Types.ObjectId, ref: 'Rental' }
});

module.exports = mongoose.model("Booking", bookingShema);
