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
