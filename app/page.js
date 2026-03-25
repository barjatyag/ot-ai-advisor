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

    console.log("API Response:", data); // 👈 DEBUG

    setResult(data.result || data.error || "No response");
  } catch (err) {
    setResult("Error connecting to API");
  }
};
