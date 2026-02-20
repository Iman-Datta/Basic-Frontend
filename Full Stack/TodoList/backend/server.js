const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Connect MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/taskdb")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Schema
const TaskSchema = new mongoose.Schema({
  taskName: String,
  description: String,
  status: String,
});

// Model
const TaskModel = mongoose.model("Task", TaskSchema);

// CREATE
app.post("/tasks", async (req, res) => {
  try {
    const task = await TaskModel.create(req.body);
    res.json(task);
  } catch (error) {
    res.json({ message: error.message });
  }
});

// READ
app.get("/tasks", async (req, res) => {
  try {
    const tasks = await TaskModel.find();
    res.json(tasks);
  } catch (error) {
    res.json({ message: error.message });
  }
});

// UPDATE
app.put("/tasks/:id", async (req, res) => {
  try {
    await TaskModel.findByIdAndUpdate(req.params.id, req.body);
    res.json({ message: "Task Updated" });
  } catch (error) {
    res.json({ message: error.message });
  }
});

// DELETE
app.delete("/tasks/:id", async (req, res) => {
  try {
    await TaskModel.findByIdAndDelete(req.params.id);
    res.json({ message: "Task Deleted" });
  } catch (error) {
    res.json({ message: error.message });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});