const mongoose = require("mongoose");

const TripSchema = new mongoose.Schema({
  title: String,
  destination: String,
  budget: Number,
  date: String,
  userId: String,
});

module.exports = mongoose.model("Trip", TripSchema);
