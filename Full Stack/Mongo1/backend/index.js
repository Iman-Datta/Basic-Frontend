const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json()); // It convert json into js object

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/textdb");

// Schema & Model
const TextSchema = new mongoose.Schema({
  message: String,
  name : String,
  roll : Number,
  sec : String,
});
const TextModel = mongoose.model("Text", TextSchema);

// API to save text
app.post("/save", async (req, res) => {
  await TextModel.create({ message: req.body.message });
  res.send("Saved");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
