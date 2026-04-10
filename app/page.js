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
        <h2 style={{ color: "#3b82f6" }}>⚡ OT AI</h2>

        <ul style={styles.menu}>
          <li style={styles.active}>📊 Dashboard</li>
          <li>🧠 Analyze</li>
          <li>📄 Reports</li>
          <li>⚙️ Settings</li>
        </ul>
      </div>

      {/* MAIN */}
      <div style={styles.main}>
        {/* HEADER */}
        <div style={styles.header}>
          <h2 style={styles.gradientTitle}>
            OT Cybersecurity Intelligence Platform
          </h2>
          <p style={styles.subtitle}>
            AI-powered risk analytics for critical infrastructure
          </p>
        </div>

        {/* INPUT */}
        <div
          style={styles.card}
          onMouseEnter={(e) =>
            (e.currentTarget.style.transform = "translateY(-5px)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.transform = "translateY(0)")
          }
        >
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

        {/* RESULT */}
        {result && (
          <>
            {/* METRICS */}
            <div style={styles.metrics}>
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

            {/* PROGRESS */}
            <div style={styles.progress}>
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
              <h3>📊 Risk Visualization</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={chartData}>
                  <XAxis dataKey="name" stroke="#94a3b8" />
                  <YAxis domain={[0, 100]} stroke="#94a3b8" />
                  <Tooltip />
                  <Bar dataKey="value" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
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
    fontFamily: "Inter, Arial",
    background: `
      radial-gradient(circle at 20% 0%, rgba(59,130,246,0.25), transparent 40%),
      radial-gradient(circle at 80% 100%, rgba(34,197,94,0.15), transparent 40%),
      #020617
    `,
    color: "#e2e8f0",
    minHeight: "100vh",
  },
  sidebar: {
    width: "220px",
    padding: "20px",
    background: "#020617",
    borderRight: "1px solid #1e293b",
  },
  menu: {
    marginTop: "20px",
    lineHeight: "2",
    color: "#94a3b8",
  },
  active: {
    background: "linear-gradient(135deg, #3b82f6, #2563eb)",
    padding: "8px",
    borderRadius: "6px",
    color: "white",
  },
  main: {
    flex: 1,
    padding: "30px",
  },
  header: {
    marginBottom: "20px",
  },
  gradientTitle: {
    fontSize: "28px",
    fontWeight: "700",
    background: "linear-gradient(90deg, #3b82f6, #22c55e)",
    WebkitBackgroundClip: "text",
    color: "transparent",
  },
  subtitle: {
    color: "#94a3b8",
  },
  card: {
    background: "linear-gradient(145deg, #0f172a, #1e293b)",
    padding: "20px",
    borderRadius: "12px",
    marginBottom: "20px",
    border: "1px solid rgba(59,130,246,0.2)",
    boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
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
    padding: "10px 18px",
    background: "linear-gradient(135deg, #3b82f6, #22c55e)",
    border: "none",
    borderRadius: "8px",
    color: "white",
    fontWeight: "600",
    cursor: "pointer",
    boxShadow: "0 6px 20px rgba(59,130,246,0.4)",
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
  metrics: {
    display: "flex",
    gap: "15px",
    marginBottom: "20px",
  },
  metricBox: {
    background: "linear-gradient(145deg, #020617, #0f172a)",
    padding: "15px",
    borderRadius: "10px",
    flex: 1,
    border: "1px solid #1e293b",
  },
  progress: {
    marginBottom: "20px",
    background: "#1e293b",
    borderRadius: "5px",
  },
};
