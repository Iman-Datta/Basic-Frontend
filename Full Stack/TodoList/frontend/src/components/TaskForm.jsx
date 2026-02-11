import { useState } from "react";

function TaskForm({ addTask }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({...prev,[name]: value,}));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title.trim()) return;

    addTask(formData.title);

    setFormData({
      title: "",
      description: "",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        placeholder="Task title"
        value={formData.title}
        onChange={handleChange}
      />

      <input
        type="text"
        name="description"
        placeholder="Task description"
        value={formData.description}
        onChange={handleChange}
      />

      <button type="submit">Add Task</button>
    </form>
  );
}

export default TaskForm;