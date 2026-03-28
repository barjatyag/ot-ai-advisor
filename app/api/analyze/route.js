export const runtime = "nodejs";

export async function POST(req) {
  try {
    const { input } = await req.json();

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You are an OT cybersecurity expert.",
          },
          {
            role: "user",
            content: input,
          },
        ],
      }),
    });

    const data = await response.json();

    // 🔥 DEBUG LOG
    console.log("OpenAI Response:", data);

    // ❗ HANDLE ERROR
    if (!response.ok) {
      return new Response(
        JSON.stringify({
          error: data.error?.message || "OpenAI API error",
        }),
        { status: 500 }
      );
    }

    return new Response(
      JSON.stringify({
        result: data.choices?.[0]?.message?.content || "No AI response",
      }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: error.message,
      }),
      { status: 500 }
    );
  }
}
