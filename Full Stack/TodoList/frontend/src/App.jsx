import { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

function App() {
  const [tasks, setTasks] = useState([]);

  // Fetch tasks
  useEffect(() => {
    fetch("http://localhost:5000/tasks")
      .then(res => res.json())
      .then(data => setTasks(data));
  }, []);

  // Add task
  const addTask = (title) => {
    fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, completed: false }),
    })
      .then(res => res.json())
      .then(newTask => setTasks([...tasks, newTask]));
  };

  // Toggle complete
  const toggleComplete = (id, completed) => {
    fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !completed }),
    })
      .then(res => res.json())
      .then(updated =>
        setTasks(tasks.map(t => (t.id === id ? updated : t)))
      );
  };

  // Delete task
  const deleteTask = (id) => {
    fetch(`http://localhost:5000/tasks/${id}`, {
      method: "DELETE",
    }).then(() =>
      setTasks(tasks.filter(t => t.id !== id))
    );
  };

  return (
    <div style={{ width: "400px", margin: "auto" }}>
      <h2>Todo App</h2>

      <TaskForm addTask={addTask} />

      <TaskList
        tasks={tasks}
        toggleComplete={toggleComplete}
        deleteTask={deleteTask}
      />
    </div>
  );
}

export default App;
