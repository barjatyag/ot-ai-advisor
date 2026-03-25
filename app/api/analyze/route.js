import OpenAI from "openai";

export const runtime = "nodejs";

export async function POST(req) {
  try {
    const body = await req.json();
    const input = body.input;

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const completion = await openai.chat.completions.create({
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
    });

    return new Response(
      JSON.stringify({
        result: completion.choices[0].message.content,
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
