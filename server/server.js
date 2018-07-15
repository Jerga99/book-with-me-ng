const express       = require("express"),
      app           = express(),
      bodyParser    = require("body-parser"),
      mongoose      = require("mongoose"),
      config        = require("./config"),
      fakeDB        = require("./seed-db"),
      Rental        = require("./models/rental"),
      path          = require("path");

const rentalsRoutes = require("./routes/rentals"),
      bookingRoutes = require("./routes/bookings"),
      authRoutes    = require("./routes/auth"),
      fileRoutes    = require("./routes/file-upload");

const url = `mongodb://${config.DB_USER}:${config.DB_PASSWORD}@${config.DB_URI}`;

mongoose.connect(url).then(() => {
  if (process.env.NODE_ENV != 'production') {
    fakeDB.seed();
  }
});

app.use(bodyParser.json()); // use od body parser to get values from get req

app.use("/api/v1/", authRoutes);
app.use("/api/v1/", fileRoutes);
app.use("/api/v1/rentals", rentalsRoutes);
app.use("/api/v1/bookings", bookingRoutes);


if (process.env.NODE_ENV == 'production') {
  const appPath = path.join(__dirname, "..", "dist");
  app.use(express.static(appPath));

  app.get('*', function(req, res) {
    res.sendFile(path.resolve(appPath, 'index.html'));
  });
}

const PORT = process.env.PORT || '3001';

app.listen(PORT, function(){
    console.log("Node server started on port " + PORT);
});

