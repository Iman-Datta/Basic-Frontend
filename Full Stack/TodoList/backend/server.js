const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/taskdb").then(() => console.log("MongoDB Connected")).catch((err) => console.log(err));

const TaskSchema = new mongoose.Schema({
  taskName: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, default: "Pending" },
  createdDate: { type: Date, default: Date.now },
});

const TaskModel = mongoose.model("Task", TaskSchema);

app.post("/tasks", async (req, res) => {
  try {
    const newTask = await TaskModel.create({
      taskName: req.body.taskName,
      description: req.body.description,
    });
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/tasks", async (req, res) => {
  try {
    const tasks = await TaskModel.find().sort({ createdDate: -1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put("/tasks/:id", async (req, res) => {
  try {
    await TaskModel.findByIdAndUpdate(req.params.id, {
      status: req.body.status,
    });
    res.json({ message: "Task Updated" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete("/tasks/:id", async (req, res) => {
  try {
    await TaskModel.findByIdAndDelete(req.params.id);
    res.json({ message: "Task Deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
