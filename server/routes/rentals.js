const express = require("express");
const router = express.Router();
const seedDb = require("../seed-db");

const db = seedDb();

router.get("/", function(req, res) {
  res.json(db['rentals']);
});

module.exports = router;
