const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookingShema = new Schema({
    endAt: Date,
    startAt: Date,
    totalPrice: Number,
    days: Number,
    guests: Number,
    createdAt: {type: Date, default: Date.now},
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    rental: { type: Schema.Types.ObjectId, ref: 'Rental' }
});

module.exports = mongoose.model("Booking", bookingShema);
