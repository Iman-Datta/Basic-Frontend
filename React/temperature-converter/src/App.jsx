import React, { useState } from "react";

function TemperatureConverter() {
  const [value, setValue] = useState("");
  const [result, setResult] = useState("");
  const [unit, setUnit] = useState("C");

  const convertTemp = () => {
    if (value === "") {
      setResult("Please enter a value");
      return;
    }

    let converted;

    if (unit === "C") {
      converted = (value * 9) / 5 + 32;
      setResult(`${converted.toFixed(2)} °F`);
    } else {
      converted = ((value - 32) * 5) / 9;
      setResult(`${converted.toFixed(2)} °C`);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Temperature Converter</h2>

      <input type="number" placeholder="Enter temperature" value={value} onChange={(e) => setValue(e.target.value)} style={{ padding: "5px",margin: "5px" }}/>

      <br/>

      <select
        value={unit}
        onChange={(e) => setUnit(e.target.value)}
        style={{ padding: "5px", margin: "5px" }}
      >
        <option value="C">Celsius → Fahrenheit</option>
        <option value="F">Fahrenheit → Celsius</option>
      </select>

      <br />

      <button onClick={convertTemp} style={{ padding: "5px 10px", marginTop: "10px" }}>Convert</button>
      <p>{result}</p>
    </div>
  );
}

export default TemperatureConverter;
