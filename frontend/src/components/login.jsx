import React, { useState, useEffect } from "react";

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  form: {
    width: "30%",
    minWidth: "300px",
    border: "1px solid #eee",
    padding: "20px",
    borderRadius: "5px",
    boxShadow: "0 0 10px #eee",
    backgroundColor: "#fff",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    boxSizing: "border-box",
    border: "1px solid #eee",
    borderRadius: "5px",
  },
  button: {
    width: "100%",
    padding: "10px",
    boxSizing: "border-box",
    border: "1px solid #eee",
    borderRadius: "5px",
    backgroundColor: "#eee",
    cursor: "pointer",
  },
  errorText: {
    color: "red",
    marginBottom: "10px",
    textAlign: "center",
  },
  successText: {
    color: "green",
    marginBottom: "10px",
    textAlign: "center",
  },
};

export default function Login() {
  useEffect(() => {
    document.title = "Login";
  }, []);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

    const handleSubmit = async (e) => {
    e.preventDefault();
    
    const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({
        username,
        password,
        }),
    });
    const data = await res.json();
    if (data.error) {
        setError(data.error);
        setSuccess("");
    } else {
        setError("");
        setSuccess(data.message);
    }
    };
    
  return (
    <div style={styles.container}>
      <form style={styles.form}>
        <h1 style={{ textAlign: "center" }}>Login</h1>
        <input
          style={styles.input}
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button style={styles.button} type="submit">
          Login
        </button>
      </form>
    </div>
  );
}
