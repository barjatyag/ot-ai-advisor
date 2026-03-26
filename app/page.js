export const dynamic = "force-dynamic";

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

    if (loading) return;

    setLoading(true);
    setResult("Analyzing...");

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

  return (
    <div style={{ padding: 40 }}>
      <h1>🚀 OT AI Cybersecurity Advisor</h1>

      <textarea
        placeholder="Paste your OT architecture..."
        style={{ width: "100%", height: 120 }}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button onClick={analyze} style={{ marginTop: 10 }}>
        {loading ? "Analyzing..." : "Analyze"}
      </button>

      <pre style={{ marginTop: 20 }}>{result}</pre>
    </div>
  );
}
