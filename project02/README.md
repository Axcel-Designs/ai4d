# Calling Provider SDK with Prompt Chaining

You have been tasked with building an **intelligent customer support system** for a bank that converses with customers and helps solve their problems.

The first stage of implementation is to design and implement **prompt chain** that processes a customer’s free-text query step by step to understand what the customer wants and how to respond.

Your prompt chain should have 5 clearly defined prompts that accomplish the following:

- **Interpret the customer’s intent** — Understand what the customer is asking or reporting.
- **Map the query to possible categories** — Suggest one or more categories that might apply.
- **Choose the most appropriate category** — Select the best matching category.
- **Extract additional details** — Identify any extra information needed to address the request (e.g., transaction date, amount, card type, etc.).
- **Generate a short response** — Produce a suitable reply to the customer based on the chosen category.

Each stage builds on the previous one, forming a logical reasoning chain from understanding → classification → response.

## Available Categories

All customer queries must be classified into one of these buckets:

- Account Opening
- Billing Issue
- Account Access
- Transaction Inquiry
- Card Services
- Account Statement
- Loan Inquiry
- General Information

## Code Requirements

- Do not hardcode your API key in the code, rather use environment variables

- The following environment variable names should be used:

  - `OPENROUTER_API_KEY` for the API key

    - `MODEL_NAME` for the name of the model you are calling

- Load your environment variables from a `.env` file in the same folder as the main file, however, this file should not be in your repo to avoid leaking API keys

- Save your code in a single script file called `main.py` or `main.js` or `main.ts` or `main.dart` or `main.go` depending on the programming language of choice.

- Your code must:

  - Be invokable from the command line with the first argument being the customer query (string) as input.
  - Execute each step in your prompt chain sequentially.
  - After each step of the prompt chain make sure to print the response from the LLM before moving on to the next step
  - The final response from the LLM must be clearly printed at the end.

- Ensure that all your libraries and other dependencies are specified in the dependencies file (e.g. requirements.txt, package.json, pyproject.toml, pub.spec, go.mod) as the grading of the script will be automated, so any missing dependencies will result in a failure.
- You may use direct API calls or AI Provider SDKs, but do not use LangChain.