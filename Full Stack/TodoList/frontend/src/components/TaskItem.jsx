function TaskItem({ task, toggleComplete, deleteTask }) {
  return (
    <li style={{ display: "flex", gap: "10px", alignItems: "center" }}>
      <span
        onClick={() => toggleComplete(task.id, task.completed)}
        style={{
          cursor: "pointer",
          textDecoration: task.completed ? "line-through" : "none",
        }}
      >
        {task.title}
      </span>

      <button onClick={() => deleteTask(task.id)}>
        Delete
      </button>
    </li>
  );
}

export default TaskItem;