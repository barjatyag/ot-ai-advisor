const completion = await openai.chat.completions.create({
  model: "gpt-4o-mini",
  messages: [
    {
      role: "system",
      content: `
You are an OT Cybersecurity Expert.

Analyze the input and respond in this EXACT format:

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
