const mongoose = require("mongoose");

const rentalShema = new mongoose.Schema({
    title: String,
    city: String,
    street: String,
    category: String,
    image: String,
    bedrooms: Number,
    description: String,
    dailyRate: Number,
    createdAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model("Rental", rentalShema);
