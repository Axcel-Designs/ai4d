const dotenv = require("dotenv");

dotenv.config();

const apiKey = process.env.OPENROUTER_API_KEY;
const modelName = process.env.MODEL_NAME;
const apiUrl =
  process.env.API_URL || "https://openrouter.ai/api/v1/chat/completions";

async function callOpenRouter(messages) {
  try {
    const res = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: modelName,
        messages,
      }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`API Error: ${res.status} - ${errorText}`);
    }
    const data = await res.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Error calling OpenRouter API:", error);
    throw error;
  }
}
module.exports = callOpenRouter;

async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log('Usage: node main.js "Your prompt here"');
    process.exit(1);
  }

  const prompt = args.join(" ");

  const response = await callOpenRouter([{ role: "user", content: prompt }]);

  console.log("\nAI Response:\n");
  console.log(response);
}

main();