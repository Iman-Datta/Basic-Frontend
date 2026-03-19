import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

function App() {
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [trips, setTrips] = useState([]);
  const [title, setTitle] = useState("");
  const [destination, setDestination] = useState("");
  const [budget, setBudget] = useState("");
  const [date, setDate] = useState("");

  const headers = { headers: { Authorization: `Bearer ${token}` } };

  const signup = async () => {
    await axios.post("http://localhost:5000/signup", { email, password });
    alert("Signup success");
  };

  const login = async () => {
    const res = await axios.post("http://localhost:5000/login", {
      email,
      password,
    });
    setToken(res.data.token);
  };

  const fetchTrips = useCallback(async () => {
    const res = await axios.get("http://localhost:5000/trips", {
      headers: { Authorization: token },
    });
    setTrips(res.data);
  }, [token]);

  const addTrip = async () => {
    await axios.post(
      "http://localhost:5000/add",
      { title, destination, budget, date },
      headers,
    );
    fetchTrips();
  };

  const updateTrip = async (id) => {
    const newTitle = prompt("Enter new title");
    await axios.put(
      `http://localhost:5000/update/${id}`,
      { title: newTitle },
      headers,
    );
    fetchTrips();
  };

  const deleteTrip = async (id) => {
    await axios.delete(`http://localhost:5000/delete/${id}`, headers);
    fetchTrips();
  };
  useEffect(() => {
    if (token) {
      fetchTrips();
    }
  }, [token, fetchTrips]);

  const chartData = {
    labels: trips.map((t) => t.title),
    datasets: [
      {
        label: "Budget",
        data: trips.map((t) => Number(t.budget)), // important fix
      },
    ],
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold">Travel Planner</h1>

      {!token && (
        <>
          <input
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            placeholder="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={signup}>Signup</button>
          <button onClick={login}>Login</button>
        </>
      )}

      {token && (
        <>
          <input
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            placeholder="Destination"
            onChange={(e) => setDestination(e.target.value)}
          />
          <input
            placeholder="Budget"
            onChange={(e) => setBudget(e.target.value)}
          />
          <input placeholder="Date" onChange={(e) => setDate(e.target.value)} />
          <button onClick={addTrip}>Add</button>

          <Bar data={chartData} />

          {trips.map((t) => (
            <div key={t._id} className="border p-2 m-2">
              <h3>{t.title}</h3>
              <p>{t.destination}</p>
              <p>₹{t.budget}</p>
              <button onClick={() => updateTrip(t._id)}>Edit</button>
              <button onClick={() => deleteTrip(t._id)}>Delete</button>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default App;
