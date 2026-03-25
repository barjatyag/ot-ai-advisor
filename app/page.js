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
    } catch (err) {
      setResult("Error connecting to API");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>🚀 OT AI Cybersecurity Advisor</h1>

      <textarea
        style={{ width: "100%", height: 120 }}
        onChange={(e) => setInput(e.target.value)}
      />

      <button onClick={analyze}>
        {loading ? "Analyzing..." : "Analyze"}
      </button>

      <pre>{result}</pre>
    </div>
  );
}
