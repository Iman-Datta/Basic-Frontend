require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = require("./models/user");
const Trip = require("./models/trip");
const auth = require("./middleware/auth");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// DB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// ================= AUTH =================

// Signup
app.post("/signup", async (req, res) => {
  try {
    const hashed = await bcrypt.hash(req.body.password, 10);

    const user = new User({
      email: req.body.email,
      password: hashed,
    });

    await user.save();
    res.json({ msg: "User Created" });
  } catch (err) {
    res.status(500).json({ msg: "Error creating user" });
  }
});

// Login
app.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).json({ msg: "User not found" });

    const valid = await bcrypt.compare(req.body.password, user.password);
    if (!valid) return res.status(400).json({ msg: "Wrong password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({ token });
  } catch (err) {
    res.status(500).json({ msg: "Login error" });
  }
});

// ================= TRIPS =================

// Add Trip
app.post("/add", auth, async (req, res) => {
  const trip = new Trip({
    ...req.body,
    userId: req.user.id,
  });

  await trip.save();
  res.json(trip);
});

// Get Trips
app.get("/trips", auth, async (req, res) => {
  const trips = await Trip.find({ userId: req.user.id });
  res.json(trips);
});

// Update Trip
app.put("/update/:id", auth, async (req, res) => {
  await Trip.findByIdAndUpdate(req.params.id, req.body);
  res.json({ msg: "Updated" });
});

// Delete Trip
app.delete("/delete/:id", auth, async (req, res) => {
  await Trip.findByIdAndDelete(req.params.id);
  res.json({ msg: "Deleted" });
});

// Start Server
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
