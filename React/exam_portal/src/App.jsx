import React, { useState } from "react";

export default function ExamPortal() {
  const [student, setStudent] = useState({
    name: "",
    isLoggedIn: false,
    hasPaidFee: false,
    examStatus: "not_started",
    score: ""
  });

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Online Exam Portal</h2>

        <input
          style={styles.input}
          type="text"
          placeholder="Name"
          value={student.name}
          onChange={(e) => setStudent({ ...student, name: e.target.value })}
        />

        <label style={styles.checkbox}>
          <input
            type="checkbox"
            checked={student.isLoggedIn}
            onChange={(e) =>
              setStudent({ ...student, isLoggedIn: e.target.checked })
            }
          />
          <span style={styles.gradientText}>Logged In</span>
        </label>

        <label style={styles.checkbox}>
          <input
            type="checkbox"
            checked={student.hasPaidFee}
            onChange={(e) =>
              setStudent({ ...student, hasPaidFee: e.target.checked })
            }
          />
          <span style={styles.gradientText}>Fee Paid</span>
        </label>

        <select
          style={styles.input}
          value={student.examStatus}
          onChange={(e) =>
            setStudent({ ...student, examStatus: e.target.value })
          }
        >
          <option value="not_started">Not Started</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>

        <input
          style={styles.input}
          type="number"
          placeholder="Score"
          value={student.score}
          onChange={(e) =>
            setStudent({ ...student, score: e.target.value })
          }
        />

        <div style={styles.result}>
          {!student.isLoggedIn && (
            <p style={styles.warning}>Please log in to access the exam portal.</p>
          )}

          {student.isLoggedIn && !student.hasPaidFee && (
            <p style={styles.warning}>
              Complete the fee payment to access the exam.
            </p>
          )}

          {student.isLoggedIn && student.hasPaidFee && (
            <>
              <p style={styles.gradientText}>Welcome, {student.name}</p>

              {student.examStatus === "not_started" && (
                <p style={styles.gradientText}>Exam has not started yet.</p>
              )}

              {student.examStatus === "in_progress" && (
                <p style={styles.gradientText}>Exam in progress...</p>
              )}

              {student.examStatus === "completed" && (
                <>
                  <p style={styles.gradientText}>Exam completed.</p>
                  <p
                    style={
                      student.score >= 40 ? styles.pass : styles.fail
                    }
                  >
                    Result: {student.score >= 40 ? "PASS" : "FAIL"}
                  </p>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #ff9a9e, #fecfef)",
    fontFamily: "Segoe UI, sans-serif"
  },
  card: {
    background: "#ffffff",
    width: "360px",
    padding: "24px",
    borderRadius: "16px",
    boxShadow: "0 12px 30px rgba(0,0,0,0.25)"
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
    background: "linear-gradient(90deg, #ff416c, #ff4b2b)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    fontWeight: "700"
  },
  gradientText: {
    background: "linear-gradient(90deg, #ff416c, #ff4b2b)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    fontWeight: "600"
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "12px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    outline: "none"
  },
  checkbox: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "10px",
    fontSize: "14px"
  },
  result: {
    marginTop: "15px",
    textAlign: "center"
  },
  warning: {
    color: "#d63384",
    fontWeight: "600"
  },
  pass: {
    background: "linear-gradient(90deg, #11998e, #38ef7d)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    fontWeight: "700"
  },
  fail: {
    background: "linear-gradient(90deg, #ff416c, #ff4b2b)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    fontWeight: "700"
  }
};