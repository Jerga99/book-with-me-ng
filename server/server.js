const express       = require("express"),
      app           = express(),
      bodyParser    = require("body-parser");
      // mongoose        = require("mongoose"),
      // Rental          = require("./models/rental"),

const rentalsRoutes = require("./routes/rentals");
      // authRoutes    = require("./routes/auth"),

// var url = process.env.DATABASEURL || "mongodb://localhost/yelp_camp";
// mongoose.connect(url);

app.use(bodyParser.json()); // use od body parser to get values from get req

// app.use("api/v1/", authRoutes);
app.use("/api/v1/rentals", rentalsRoutes);

const PORT = process.env.PORT || '3000';

app.listen(PORT, function(){
    console.log("Node server started on port " + PORT);
});
