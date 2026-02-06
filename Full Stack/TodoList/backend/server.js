const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = 5000;

/* Middleware */
app.use(cors());
app.use(express.json());

/* MongoDB Connection */
mongoose.connect("mongodb://127.0.0.1:27017/todoApp").then(() => console.log("MongoDB connected")).catch((err) => console.error(err));

/* Task Schema */
const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  status: {
    type: String,
    enum: ["Pending", "Completed"],
    default: "Pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

/* Task Model */
const Task = mongoose.model("Task", taskSchema);

/* ================= ROUTES ================= */

/* POST /tasks → Add new task */
app.post("/tasks", async (req, res) => {
  try {
    const { name, description } = req.body;

    const task = new Task({
      name,
      description,
    });

    const savedTask = await task.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* GET /tasks → Fetch all tasks */
app.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* PUT /tasks/:id → Update task status */
app.put("/tasks/:id", async (req, res) => {
  try {
    const { status } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* DELETE /tasks/:id → Delete task */
app.delete("/tasks/:id", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* Server start */
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
