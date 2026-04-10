"use client";

import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const analyze = async () => {
    if (!input.trim()) {
      setResult("Please enter architecture details");
      return;
    }

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
    } catch {
      setResult("Error connecting to API");
    }

    setLoading(false);
  };

  // 🔍 PARSER
  const extractSection = (title) => {
    if (!result.includes(title)) return [];

    const section = result.split(title)[1];
    if (!section) return [];

    return section
      .split("\n")
      .filter((line) => line.trim().startsWith("-"))
      .map((line) => line.replace("-", "").trim());
  };

  const findings = extractSection("Findings:");
  const risks = extractSection("Risks:");
  const recommendations = extractSection("Recommendations:");

  // 🎯 Risk detection
  const getSeverity = (text) => {
    if (text.toLowerCase().includes("no segmentation")) return "High";
    if (text.toLowerCase().includes("legacy")) return "Medium";
    return "Low";
  };

  const getColor = (level) => {
    if (level === "High") return "#ef4444";
    if (level === "Medium") return "#f59e0b";
    return "#22c55e";
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🚀 OT AI Cybersecurity Advisor</h1>

      <textarea
        placeholder="Paste your OT architecture..."
        style={styles.textarea}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button style={styles.button} onClick={analyze}>
        {loading ? "Analyzing..." : "Analyze"}
      </button>

      {/* RESULTS */}
      {result && (
        <div style={styles.resultBox}>
          
          {/* FINDINGS */}
          <h2>🔍 Findings</h2>
          <div style={styles.grid}>
            {findings.length ? (
              findings.map((f, i) => {
                const level = getSeverity(f);
                return (
                  <div key={i} style={styles.card}>
                    <p>{f}</p>
                    <span
                      style={{
                        ...styles.badge,
                        background: getColor(level),
                      }}
                    >
                      {level}
                    </span>
                  </div>
                );
              })
            ) : (
              <p>No findings detected</p>
            )}
          </div>

          {/* RISKS */}
          <h2>⚠️ Risks</h2>
          <div style={styles.grid}>
            {risks.length ? (
              risks.map((r, i) => {
                const level = getSeverity(r);
                return (
                  <div key={i} style={styles.card}>
                    <p>{r}</p>
                    <span
                      style={{
                        ...styles.badge,
                        background: getColor(level),
                      }}
                    >
                      {level}
                    </span>
                  </div>
                );
              })
            ) : (
              <p>No risks detected</p>
            )}
          </div>

          {/* RECOMMENDATIONS */}
          <h2>✅ Recommendations</h2>
          <div style={styles.grid}>
            {recommendations.length ? (
              recommendations.map((rec, i) => (
                <div key={i} style={styles.card}>
                  <p>{rec}</p>
                  <span style={{ ...styles.badge, background: "#3b82f6" }}>
                    Action
                  </span>
                </div>
              ))
            ) : (
              <p>No recommendations available</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* 🎨 STYLES */

const styles = {
  container: {
    background: "#020617",
    minHeight: "100vh",
    padding: "40px",
    color: "white",
    fontFamily: "Arial",
  },
  title: {
    marginBottom: "20px",
  },
  textarea: {
    width: "100%",
    height: "120px",
    padding: "10px",
    borderRadius: "6px",
  },
  button: {
    marginTop: "10px",
    padding: "10px 20px",
    background: "#3b82f6",
    border: "none",
    borderRadius: "6px",
    color: "white",
    cursor: "pointer",
  },
  resultBox: {
    marginTop: "30px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "15px",
    marginBottom: "30px",
  },
  card: {
    background: "#1e293b",
    padding: "15px",
    borderRadius: "10px",
    border: "1px solid #334155",
    position: "relative",
  },
  badge: {
    position: "absolute",
    top: "10px",
    right: "10px",
    padding: "4px 8px",
    borderRadius: "5px",
    fontSize: "12px",
    color: "white",
  },
};
