"use client";

import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

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

  const getRiskScore = () => {
    if (result.includes("High")) return 90;
    if (result.includes("Medium")) return 60;
    return 30;
  };

  const chartData = [{ name: "Risk Score", value: getRiskScore() }];

  return (
    <div style={styles.app}>
      {/* SIDEBAR */}
      <div style={styles.sidebar}>
        <h2>⚡ OT AI</h2>
        <ul>
          <li>📊 Dashboard</li>
          <li>🧠 Analyze</li>
          <li>📄 Reports</li>
          <li>⚙️ Settings</li>
        </ul>
      </div>

      {/* MAIN */}
      <div style={styles.main}>
        {/* HEADER */}
        <div style={styles.header}>
          <h2>OT Cybersecurity Intelligence Platform</h2>
          <span>AI-powered risk analytics for critical infrastructure</span>
        </div>

        {/* INPUT */}
        <div style={styles.card}>
          <h3>🧠 Analyze OT Architecture</h3>

          <textarea
            placeholder="Paste your OT architecture..."
            style={styles.textarea}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <div style={{ display: "flex", gap: "10px" }}>
            <button style={styles.button} onClick={analyze}>
              {loading ? "Analyzing..." : "Run Analysis"}
            </button>

            <button
              style={styles.secondaryBtn}
              onClick={() =>
                setInput(
                  "SCADA system with no segmentation and legacy protocols"
                )
              }
            >
              ⚡ Demo
            </button>
          </div>
        </div>

        {/* LOADING */}
        {loading && (
          <div style={styles.loading}>
            🔍 Running AI Cyber Risk Assessment...
          </div>
        )}

        {/* RESULTS */}
        {result && (
          <>
            {/* TOP METRICS */}
            <div style={styles.topMetrics}>
              <div style={styles.metricBox}>
                <h4>Risk Level</h4>
                <p style={{ color: getRiskColor() }}>
                  {getRiskLevel()}
                </p>
              </div>

              <div style={styles.metricBox}>
                <h4>Risk Score</h4>
                <p>{getRiskScore()} / 100</p>
              </div>

              <div style={styles.metricBox}>
                <h4>Status</h4>
                <p>Analyzed</p>
              </div>
            </div>

            {/* PROGRESS BAR */}
            <div style={styles.progressBar}>
              <div
                style={{
                  width: `${getRiskScore()}%`,
                  background: getRiskColor(),
                  height: "8px",
                  borderRadius: "5px",
                }}
              />
            </div>

            {/* CHART */}
            <div style={styles.card}>
              <h3>📊 Risk Score Visualization</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={chartData}>
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Bar dataKey="value" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* SUMMARY */}
            <div style={styles.card}>
              <h3>🧠 Executive Summary</h3>
              <p>
                Your OT environment shows {getRiskLevel()} risk exposure with
                critical vulnerabilities requiring immediate attention.
              </p>
            </div>

            {/* SECTIONS */}
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

            {/* CTA */}
            <button style={styles.downloadBtn}>
              📄 Generate Executive Report
            </button>

            {/* TRUST */}
            <div style={styles.footer}>
              Trusted for Energy, Utilities, Industrial OT & Smart Cities
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* 🎨 STYLES */

const styles = {
  app: {
    display: "flex",
    fontFamily: "Arial",
    background: "linear-gradient(135deg, #020617, #0f172a)",
    color: "white",
    minHeight: "100vh",
  },
  sidebar: {
    width: "220px",
    background: "#020617",
    padding: "20px",
  },
  main: {
    flex: 1,
    padding: "20px",
  },
  header: {
    marginBottom: "20px",
  },
  card: {
    background: "#1e293b",
    padding: "20px",
    borderRadius: "10px",
    marginBottom: "20px",
    transition: "0.3s",
  },
  textarea: {
    width: "100%",
    height: "120px",
    marginTop: "10px",
    padding: "10px",
    borderRadius: "6px",
    border: "none",
  },
  button: {
    marginTop: "10px",
    padding: "10px 15px",
    background: "#3b82f6",
    border: "none",
    borderRadius: "6px",
    color: "white",
    cursor: "pointer",
  },
  secondaryBtn: {
    marginTop: "10px",
    padding: "10px 15px",
    background: "#334155",
    border: "none",
    borderRadius: "6px",
    color: "white",
    cursor: "pointer",
  },
  loading: {
    marginTop: "10px",
  },
  topMetrics: {
    display: "flex",
    gap: "15px",
    marginBottom: "20px",
  },
  metricBox: {
    background: "#111827",
    padding: "15px",
    borderRadius: "8px",
    flex: 1,
  },
  progressBar: {
    marginBottom: "20px",
    background: "#1e293b",
    borderRadius: "5px",
  },
  downloadBtn: {
    padding: "12px 20px",
    background: "#22c55e",
    border: "none",
    borderRadius: "6px",
    color: "white",
    cursor: "pointer",
  },
  footer: {
    marginTop: "30px",
    opacity: 0.6,
  },
};
