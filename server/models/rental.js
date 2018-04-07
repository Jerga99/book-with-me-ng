const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const rentalShema = new Schema({
    title: String,
    city: {type: String, lowercase: true},
    street: String,
    category: {type: String, lowercase: true},
    image: String,
    bedrooms: Number,
    description: String,
    dailyRate: Number,
    createdAt: {type: Date, default: Date.now},
    user: { type: Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model("Rental", rentalShema);
