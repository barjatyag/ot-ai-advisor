export const dynamic = "force-dynamic";

"use client";
import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const analyze = async () => {
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
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>🚀 OT AI Cybersecurity Advisor</h1>

      <textarea
        placeholder="Paste your OT architecture..."
        style={{ width: "100%", height: 120 }}
        onChange={(e) => setInput(e.target.value)}
      />

      <button onClick={analyze} style={{ marginTop: 10 }}>
        Analyze
      </button>

      <pre style={{ marginTop: 20 }}>{result}</pre>
    </div>
  );
}
