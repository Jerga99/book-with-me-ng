const express       = require("express"),
      app           = express(),
      bodyParser    = require("body-parser"),
      mongoose      = require("mongoose"),
      Rental        = require("./models/rental"),
      keys          = require("./keys"),
      fakeDB        = require("./seed-db");

const rentalsRoutes = require("./routes/rentals");
      // authRoutes    = require("./routes/auth"),

const url = `mongodb://${keys.DB_USER}:${keys.DB_PASSWORD}@ds163034.mlab.com:63034/bwm-dev`;
mongoose.connect(url).then(() => {
  // populate DB
  fakeDB.seed();
});


app.use(bodyParser.json()); // use od body parser to get values from get req

// app.use("api/v1/", authRoutes);
app.use("/api/v1/rentals", rentalsRoutes);

const PORT = process.env.PORT || '3000';

app.listen(PORT, function(){
    console.log("Node server started on port " + PORT);
});
