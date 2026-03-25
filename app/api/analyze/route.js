import OpenAI from "openai";

export async function POST(req) {
  try {
    const { input } = await req.json();

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `
You are an OT Cybersecurity Expert.

Respond in this format:

Risk Score: (High / Medium / Low)

Findings:
- ...

Risks:
- ...

Recommendations:
- ...
`,
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
      JSON.stringify({ error: error.message }),
      { status: 500 }
    );
  }
}
