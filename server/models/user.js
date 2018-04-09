const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  username: String,
  email: {type: String,
          unique: true,
          lowercase: true,
          required: 'Email address is required',
          match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']},
  password: {type: String, required: 'Email address is required'},
  rentals: [{ type: Schema.Types.ObjectId, ref: 'Rental' }],
  bookings: [{ type: Schema.Types.ObjectId, ref: 'Booking' }]
});

userSchema.pre("save", function(next){
  const user = this;

  const salt = bcrypt.genSaltSync(10);
  const hashedPsw = bcrypt.hashSync(user.password, salt);
  user.password = hashedPsw;

  next();
});

userSchema.methods.isSamePassword = function(requestedPassword){
  return bcrypt.compareSync(requestedPassword, this.password);
}

module.exports = mongoose.model("User", userSchema);
