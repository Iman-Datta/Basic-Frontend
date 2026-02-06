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
    setFormData({ ...formData, [name]: value });
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
    <div style={{ padding: "40px" }}>
      <form onSubmit={saveText}>
        <input
          type="text"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Type something"
        />
        <br></br>

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your name"
        />
        <br></br>
        <input
          type="number"
          name="roll"
          value={formData.roll}
          onChange={handleChange}
          placeholder="Enter your roll number"
        />
        <br></br>
        <input
          type="text"
          name="sec"
          value={formData.sec}
          onChange={handleChange}
          placeholder="Enter your section"
        />
        <br></br>

        <button type="submit" onClick={saveText}>Save</button>
      </form>
    </div>
  );
}

export default App;