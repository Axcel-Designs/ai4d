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
  console.log("--------------------------");

  const prompt1 = `
  you are a bank customer support

  customer Query:
  {${customerQuery}

  task:
  Understand what the customer is asking or reporting
  `;
  const prompt1Res = await model(prompt1);
  console.log(`\ncustomers Intent:`, prompt1Res);
  console.log("--------------------------");

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
  console.log(`\nCategories suggested: `, prompt2Res);
  console.log("--------------------------");

  const prompt3 = `
  
  customer Query:
  ${customerQuery}
  
  customers Intent:
  ${prompt1Res}
  
  ${categories.join("\n")}

  Suggested Categories:
  ${prompt2Res}

  task:
  Select the best matching category
  `;

  const prompt3Res = await model(prompt3);
  console.log(`\nBest Matching Category: `, prompt3Res);
  console.log("--------------------------");

  const prompt4 = `
  
  customer Query:
  ${customerQuery}
  
  customers Intent:
  ${prompt1Res}
  
  ${categories.join("\n")}

  Suggested Categories:
  ${prompt2Res}
  
  Best Matching Category:
  ${prompt3Res}

  task:
  Identify any extra information needed to address the request (e.g., transaction date, amount, card type, etc.).
`;
  const prompt4Res = await model(prompt4);
  console.log(`\nExtra Information: `, prompt4Res);
  console.log("--------------------------");

  const prompt5 = `
  customer Query:
  ${customerQuery}
  
  customers Intent:
  ${prompt1Res}
  
  ${categories.join("\n")}

  Suggested Categories:
  ${prompt2Res}
  
  Best Matching Category:
  ${prompt3Res}

  Extra Information:
  ${prompt4Res}
  
  task:
  Produce a suitable reply to the customer based on the chosen category
  `;

  const prompt5Res = await model(prompt5);
  console.log(`\n Response:`, prompt5Res);
  console.log("--------------------------");
}

promptChain();
