import { useEffect, useState } from "react";

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
        body: JSON.stringify({
          taskName,
          description,
        }),
      });

      setTaskName("");
      setDescription("");
      fetchTasks();
      alert("Task Saved");
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
    <div style={{ padding: "40px" }}>
      <h2>Task Manager</h2>

      <form onSubmit={addTask}>
        <input
          type="text"
          placeholder="Task Name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          required
        />

        <br />
        <br />

        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <br />
        <br />

        <button type="submit">Add Task</button>
      </form>

      <br />

      {loading && <h3>Loading...</h3>}

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Task Name</th>
            <th>Description</th>
            <th>Status</th>
            <th>Created Date</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {tasks.map((t) => (
            <tr
              key={t._id}
              style={{
                textDecoration:
                  t.status === "Completed" ? "line-through" : "none",
                backgroundColor: t.status === "Completed" ? "#d4ffd4" : "white",
              }}
            >
              <td>{t.taskName}</td>
              <td>{t.description}</td>
              <td>{t.status}</td>
              <td>
                {t.createdAt ? new Date(t.createdAt).toLocaleString() : "N/A"}
              </td>
              <td>
                {t.status !== "Completed" && (
                  <button onClick={() => completeTask(t._id)}>Complete</button>
                )}

                <button
                  onClick={() => deleteTask(t._id)}
                  style={{ marginLeft: "10px" }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
