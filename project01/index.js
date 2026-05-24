const dotenv = require("dotenv");

dotenv.config();

const apiKey = process.env.OPENROUTER_API_KEY;
const modelName = process.env.MODEL_NAME;
const apiUrl =
  process.env.API_URL || "https://openrouter.ai/api/v1/chat/completions";

if (!apiKey) {
  console.error("Missing OPENROUTER_API_KEY in .env");
  process.exit(1);
}

if (!modelName) {
  console.error("Missing MODEL_NAME in .env");
  process.exit(1);
}

async function callOpenRouter(prompt) {
  try {
    const res = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: modelName,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`API Error: ${res.status} - ${errorText}`);
    }

    const data = await res.json();
    // console.log(JSON.stringify(data, null, 2));
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Error calling OpenRouter API:", error);
    throw error;
  }
}

async function main() {
  // const args = process.argv.slice(2);
  // console.log(process.argv);
  // console.log(args);
  

  // if (args.length === 0) {
  //   console.log('Usage: node index.js "Your prompt here"');
  //   process.exit(1);
  // }

  // const prompt = args.join(" ");

  // const response = await callOpenRouter(prompt );
  const response = await callOpenRouter('define ai' );

  console.log("\nAI Response:\n");
  console.log(response);
}
main();


