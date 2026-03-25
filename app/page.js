"use client";
import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const analyze = async () => {
    setLoading(true);
    setResult("");

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input }),
      });

      const data = await res.json();
      setResult(data.result || data.error || "No response");
    } catch (err) {
      setResult("Error connecting to API");
    }

    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🚀 OT AI Cybersecurity Advisor</h1>

      <textarea
        placeholder="Paste your OT architecture or security scenario..."
        style={styles.textarea}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button style={styles.button} onClick={analyze}>
        {loading ? "Analyzing..." : "Analyze"}
      </button>

      {result && (
        <div style={styles.resultBox}>
          <h3>📊 Analysis Result</h3>
          <pre style={styles.resultText}>{result}</pre>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    background: "#0f172a",
    minHeight: "100vh",
    padding: "40px",
    color: "white",
    fontFamily: "Arial",
  },
  title: {
    textAlign: "center",
    marginBottom: "30px",
    fontSize: "28px",
  },
  textarea: {
    width: "100%",
    height: "140px",
    padding: "15px",
    borderRadius: "10px",
    border: "none",
    fontSize: "14px",
    marginBottom: "15px",
  },
  button: {
    padding: "12px 20px",
    borderRadius: "8px",
    border: "none",
    background: "#3b82f6",
    color: "white",
    cursor: "pointer",
    fontSize: "16px",
  },
  resultBox: {
    marginTop: "25px",
    background: "#1e293b",
    padding: "20px",
    borderRadius: "10px",
  },
  resultText: {
    whiteSpace: "pre-wrap",
  },
};
