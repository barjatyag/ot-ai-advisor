"use client";

import { useState, useEffect } from "react";

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
    setResult("");

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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

  // 🔥 Dynamic PDF
  const downloadPDF = async () => {
    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF();

    const lines = doc.splitTextToSize(result, 180);

    doc.setFontSize(14);
    doc.text("OT Cybersecurity Report", 10, 10);

    doc.setFontSize(10);
    doc.text(lines, 10, 20);

    doc.save("OT_Report.pdf");
  };

  // 🎯 Extract sections
  const getSection = (title) => {
    const part = result.split(title)[1];
    return part ? part.split("\n\n")[0].trim() : "";
  };

  const getRiskLevel = () => {
    if (result.includes("High")) return "High";
    if (result.includes("Medium")) return "Medium";
    return "Low";
  };

  const getRiskColor = () => {
    if (getRiskLevel() === "High") return "#ef4444";
    if (getRiskLevel() === "Medium") return "#f59e0b";
    return "#22c55e";
  };

  return (
    <div style={styles.container}>
      
      {/* 🚀 HERO */}
      <h1 style={styles.title}>🚀 OT AI Cybersecurity Advisor</h1>
      <p style={styles.subtitle}>
        AI-powered risk assessment for SCADA, OT & critical infrastructure
      </p>

      {/* INPUT */}
      <textarea
        placeholder="Paste your OT architecture..."
        style={styles.textarea}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      {/* BUTTONS */}
      <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
        <button style={styles.button} onClick={analyze}>
          {loading ? "Analyzing..." : "Analyze"}
        </button>

        <button
          style={styles.secondaryBtn}
          onClick={() =>
            setInput(
              "SCADA system with no segmentation and legacy protocols"
            )
          }
        >
          Try Sample
        </button>
      </div>

      {/* LOADING */}
      {loading && (
        <div style={styles.loading}>
          ⏳ Running AI Cyber Risk Analysis...
        </div>
      )}

      {/* RESULT */}
      {result && (
        <>
          {/* RISK SCORE */}
          <div style={styles.riskBox}>
            ⚠️ Risk Level:
            <span style={{ color: getRiskColor(), marginLeft: 10 }}>
              {getRiskLevel()}
            </span>
          </div>

          {/* CARDS */}
          <div style={styles.card}>
            <h3>🔍 Findings</h3>
            <pre>{getSection("Findings:")}</pre>
          </div>

          <div style={styles.card}>
            <h3>⚠️ Risks</h3>
            <pre>{getSection("Risks:")}</pre>
          </div>

          <div style={styles.card}>
            <h3>✅ Recommendations</h3>
            <pre>{getSection("Recommendations:")}</pre>
          </div>

          {/* DOWNLOAD */}
          <button style={styles.button} onClick={downloadPDF}>
            📄 Download Report
          </button>

          {/* PRO CTA */}
          <div style={styles.proBox}>
            🔒 Upgrade to Pro:
            <ul>
              <li>📄 Detailed PDF Report</li>
              <li>📊 Compliance Mapping (NIST, IEC)</li>
              <li>📈 Risk Dashboard</li>
            </ul>
          </div>
        </>
      )}

      {/* TRUST */}
      <div style={styles.footer}>
        Used for:
        <ul>
          <li>⚡ Energy & Utilities</li>
          <li>🏭 Industrial OT</li>
          <li>🏙 Smart Cities</li>
        </ul>
      </div>
    </div>
  );
}

/* 🎨 STYLES */

const styles = {
  container: {
    background: "#0f172a",
    minHeight: "100vh",
    padding: "40px",
    color: "white",
    fontFamily: "Arial",
    maxWidth: "900px",
    margin: "auto",
  },
  title: {
    textAlign: "center",
    fontSize: "32px",
  },
  subtitle: {
    textAlign: "center",
    opacity: 0.7,
    marginBottom: "20px",
  },
  textarea: {
    width: "100%",
    height: "140px",
    padding: "12px",
    borderRadius: "8px",
    border: "none",
  },
  button: {
    padding: "10px 16px",
    background: "#3b82f6",
    border: "none",
    borderRadius: "6px",
    color: "white",
    cursor: "pointer",
  },
  secondaryBtn: {
    padding: "10px 16px",
    background: "#334155",
    border: "none",
    borderRadius: "6px",
    color: "white",
    cursor: "pointer",
  },
  loading: {
    marginTop: "15px",
    opacity: 0.7,
  },
  riskBox: {
    marginTop: "20px",
    fontSize: "20px",
    fontWeight: "bold",
  },
  card: {
    marginTop: "15px",
    background: "#1e293b",
    padding: "15px",
    borderRadius: "8px",
  },
  proBox: {
    marginTop: "20px",
    background: "#111827",
    padding: "15px",
    borderRadius: "8px",
    border: "1px solid #334155",
  },
  footer: {
    marginTop: "40px",
    opacity: 0.6,
  },
};
