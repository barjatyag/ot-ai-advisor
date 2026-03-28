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

IMPORTANT:
Always respond STRICTLY in this format:

Risk Score: High / Medium / Low

Findings:
- Point 1
- Point 2

Risks:
- Risk 1
- Risk 2

Recommendations:
- Recommendation 1
- Recommendation 2
          `,
        },
        {
          role: "user",
          content: input,
        },
      ],
    });

    const text = completion.choices[0].message.content;

    return new Response(
      JSON.stringify({ result: text }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500 }
    );
  }
}
