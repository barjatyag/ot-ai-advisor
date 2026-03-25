"use client";

import { useState } from "react";
import jsPDF from "jspdf";

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
      setResult(data.result || data.error);
    } catch {
      setResult("Error connecting to API");
    }

    setLoading(false);
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text(result || "No data", 10, 10);
    doc.save("OT_Report.pdf");
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

      {result && (
        <>
          <div style={styles.resultBox}>
            <pre style={styles.resultText}>{result}</pre>
          </div>

          <button style={styles.button} onClick={downloadPDF}>
            Download PDF
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
  },
  title: { textAlign: "center", marginBottom: "20px" },
  textarea: {
    width: "100%",
    height: "140px",
    padding: "10px",
    borderRadius: "8px",
  },
  button: {
    marginTop: "10px",
    padding: "10px",
    background: "#3b82f6",
    color: "white",
    border: "none",
    borderRadius: "6px",
  },
  resultBox: {
    marginTop: "20px",
    background: "#1e293b",
    padding: "15px",
    borderRadius: "8px",
  },
  resultText: { whiteSpace: "pre-wrap" },
};
