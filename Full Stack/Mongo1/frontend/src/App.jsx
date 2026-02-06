import { useState } from "react";

function App() {
  const [formData, setFormData] = useState({
    message: "",
    name: "",
    roll: "",
    sec: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const saveText = async (e) => {
    e.preventDefault();

    await fetch("http://localhost:5000/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    setFormData({
      message: "",
      name: "",
      roll: "",
      sec: "",
    });

    alert("Saved to MongoDB");
  };

  return (
    <div style={styles.container}>
      <form onSubmit={saveText} style={styles.form}>
        <h2 style={styles.heading}>Student Message Form</h2>

        <input
          type="text"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Type something"
          required
          style={styles.input}
        />

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your name"
          required
          style={styles.input}
        />

        <input
          type="number"
          name="roll"
          value={formData.roll}
          onChange={handleChange}
          placeholder="Enter your roll number"
          required
          style={styles.input}
        />

        <input
          type="text"
          name="sec"
          value={formData.sec}
          onChange={handleChange}
          placeholder="Enter your section"
          required
          style={styles.input}
        />

        <button type="submit" style={styles.button}>
          Save
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f4f6f8",
  },
  form: {
    background: "#fff",
    padding: "30px",
    borderRadius: "10px",
    width: "320px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "12px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "14px",
  },
  button: {
    width: "100%",
    padding: "10px",
    borderRadius: "6px",
    border: "none",
    background: "#2563eb",
    color: "#fff",
    fontSize: "15px",
    cursor: "pointer",
  },
};

export default App;
