"use client";

import { useState } from "react";
import { jsPDF } from "jspdf";

export default function Home() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const analyze = async () => {
    if (!input.trim()) {
      setResult("Please enter architecture details");
      return;
    }

    if (loading) return;

    setLoading(true);
    setResult("Analyzing your architecture...");

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input }),
      });

      const data = await res.json();
      setResult(data?.result || data?.error || "No response");
    } catch {
      setResult("Error connecting to API");
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    const lines = doc.splitTextToSize(result, 180);

    doc.setFontSize(14);
    doc.text("OT Cybersecurity Assessment Report", 10, 10);

    doc.setFontSize(10);
    doc.text(lines, 10, 20);

    doc.save("OT_Report.pdf");
  };

  const getRiskColor = () => {
    if (result.includes("High")) return "red";
    if (result.includes("Medium")) return "orange";
    return "green";
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

      <button
        style={styles.button}
        onClick={analyze}
        disabled={loading}
      >
        {loading ? "Analyzing..." : "Analyze"}
      </button>

      {result && (
        <>
          <div
            style={{
              ...styles.resultBox,
              borderLeft: `6px solid ${getRiskColor()}`,
            }}
          >
            <pre style={styles.resultText}>{result}</pre>
          </div>

          <button style={styles.button} onClick={downloadPDF}>
            📄 Download Report
          </button>
        </>
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
    marginBottom: "25px",
  },
  textarea: {
    width: "100%",
    height: "140px",
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    marginBottom: "10px",
  },
  button: {
    padding: "10px 16px",
    borderRadius: "6px",
    border: "none",
    background: "#3b82f6",
    color: "white",
    cursor: "pointer",
    marginTop: "10px",
  },
  resultBox: {
    marginTop: "20px",
    background: "#1e293b",
    padding: "15px",
    borderRadius: "8px",
  },
  resultText: {
    whiteSpace: "pre-wrap",
  },
};
