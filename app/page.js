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

  // ✅ SAFE PARSER
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

  return (
    <div style={styles.container}>
      <h1>🚀 OT AI Cybersecurity Advisor</h1>

      <textarea
        placeholder="Paste your OT architecture..."
        style={styles.textarea}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button style={styles.button} onClick={analyze}>
        {loading ? "Analyzing..." : "Analyze"}
      </button>

      {/* RESULT */}
      {result && (
        <div style={styles.resultBox}>
          
          {/* DEBUG (IMPORTANT) */}
          <h3>🧪 Raw Output</h3>
          <pre>{result}</pre>

          {/* FINDINGS */}
          <h3>🔍 Findings</h3>
          {findings.length ? (
            <ul>
              {findings.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          ) : (
            <p>No findings detected</p>
          )}

          {/* RISKS */}
          <h3>⚠️ Risks</h3>
          {risks.length ? (
            <ul>
              {risks.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          ) : (
            <p>No risks detected</p>
          )}

          {/* RECOMMENDATIONS */}
          <h3>✅ Recommendations</h3>
          {recommendations.length ? (
            <ul>
              {recommendations.map((rec, i) => (
                <li key={i}>{rec}</li>
              ))}
            </ul>
          ) : (
            <p>No recommendations available</p>
          )}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    background: "#020617",
    minHeight: "100vh",
    padding: "40px",
    color: "white",
  },
  textarea: {
    width: "100%",
    height: "120px",
    marginTop: "20px",
    padding: "10px",
  },
  button: {
    marginTop: "10px",
    padding: "10px",
    background: "#3b82f6",
    color: "white",
    border: "none",
  },
  resultBox: {
    marginTop: "20px",
    background: "#1e293b",
    padding: "20px",
  },
};
