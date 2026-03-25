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

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(errorText || "API error");
    }

    const data = await res.json();

    setResult(data?.result || data?.error || "No response");
  } catch (err) {
    console.error(err);
    setResult(err.message || "Error connecting to API");
  } finally {
    setLoading(false); // ✅ ALWAYS resets
  }
};
