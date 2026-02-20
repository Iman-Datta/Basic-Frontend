import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/tasks");
      const data = await res.json();
      setTasks(data);
      setLoading(false);
    } catch {
      alert("Error fetching tasks");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async (e) => {
    e.preventDefault();
    if (!taskName || !description) return;

    try {
      await fetch("http://localhost:5000/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ taskName, description }),
      });

      setTaskName("");
      setDescription("");
      fetchTasks();
    } catch {
      alert("Error saving task");
    }
  };

  const completeTask = async (id) => {
    try {
      await fetch(`http://localhost:5000/tasks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "Completed" }),
      });
      fetchTasks();
    } catch {
      alert("Error updating task");
    }
  };

  const deleteTask = async (id) => {
    if (!window.confirm("Delete this task?")) return;

    try {
      await fetch(`http://localhost:5000/tasks/${id}`, {
        method: "DELETE",
      });
      fetchTasks();
    } catch {
      alert("Error deleting task");
    }
  };

  return (
    <div className="container">
      <h2>Task Manager</h2>

      <form onSubmit={addTask} className="task-form">
        <input
          type="text"
          placeholder="Task Name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button type="submit">Add Task</button>
      </form>

      {loading && <p className="loading">Loading...</p>}

      <div className="task-list">
        {tasks.map((t) => (
          <div
            key={t._id}
            className={`task-card ${
              t.status === "Completed" ? "completed" : ""
            }`}
          >
            <div>
              <h3>{t.taskName}</h3>
              <p>{t.description}</p>
              <small>
                {t.createdDate
                  ? new Date(t.createdDate).toLocaleString()
                  : "N/A"}
              </small>
            </div>

            <div className="actions">
              {t.status !== "Completed" && (
                <button
                  className="complete-btn"
                  onClick={() => completeTask(t._id)}
                >
                  Complete
                </button>
              )}

              <button
                className="delete-btn"
                onClick={() => deleteTask(t._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {tasks.length === 0 && !loading && (
        <p className="empty">No tasks yet. Add one!</p>
      )}
    </div>
  );
}

export default App;