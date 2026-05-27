const { OpenRouter } = require("@openrouter/sdk");
require("dotenv").config();

const customerQuery = process.argv.slice(2).join(" ");

if (!customerQuery) {
  console.error(`input missing run:\nnode Index.js "prompt insert here"`);
  process.exit(1);
}

const client = new OpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
});

async function model(prompt) {
  try {
    const completion = await client.chat.send({
      chatRequest: {
        model: process.env.MODEL_NAME,
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      },
    });
    return completion.choices[0].message.content;
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}

async function promptChain() {
  const categories = [
    "Account Opening",
    "Billing Issue",
    "Account Access",
    "Transaction Inquiry",
    "Card Services",
    "Account Statement",
    "Loan Inquiry",
    "General Information",
  ];

  console.log(`customers Query: `, customerQuery);

  const prompt1 = `
  you are a bank customer support

  customer Query:
  {${customerQuery}

  task:
  Understand what the customer is asking or reporting
  `;
  const prompt1Res = await model(prompt1);

  console.log(`customers Intent:`, prompt1Res);

  const prompt2 = `

  ${categories.join("\n")}

  customer Query:
  ${customerQuery}

  customers Intent:
  ${prompt1Res}
  
  task:
  Suggest one or more categories that might apply
  `;
  const prompt2Res = await model(prompt2);

  console.log(prompt1Res);
  console.log(prompt1Res);
  console.log(prompt1Res);
  const prompt3 = ``;
  const prompt4 = ``;
  const prompt5 = ``;

  model(prompt2);
  model(prompt3);
  model(prompt4);
  model(prompt5);
}

promptChain();
