import dotenv from "dotenv";
dotenv.config();
import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import fs from "fs";

const model = new ChatOpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  model: process.env.MODEL_NAME,
  configuration: {
    baseURL: "https://openrouter.ai/api/v1",
  },
});

const project = process.argv[2];

const interpretPrompt = fs.readFileSync("./prompts/interpret.txt", "utf8");
const categoryPrompt = fs.readFileSync("./prompts/categories.txt", "utf8");
const selectPrompt = fs.readFileSync("./prompts/select.txt", "utf8");
const missingPrompt = fs.readFileSync("./prompts/missing.txt", "utf8");
const assessmentPrompt = fs.readFileSync("./prompts/assessment.txt", "utf8");


const interpret = ChatPromptTemplate.fromTemplate(interpretPrompt);
const categories = ChatPromptTemplate.fromTemplate(categoryPrompt);
const select = ChatPromptTemplate.fromTemplate(selectPrompt);
const missing = ChatPromptTemplate.fromTemplate(missingPrompt);
const assessment = ChatPromptTemplate.fromTemplate(assessmentPrompt);

const stage1 = interpret.pipe(model);
const analysis = await stage1.invoke({
  project,
});
console.log("Stage 1");
console.log(analysis.content);

const stage2 = categories.pipe(model);
const categorySuggestions = await stage2.invoke({
  analysis: analysis.content,
});
console.log(categorySuggestions.content);

const stage3 = select.pipe(model);
const category = await stage3.invoke({
  categories: categorySuggestions.content,
});

const stage4 = missing.pipe(model);
const missingInfo = await stage4.invoke({
  project,
  category: category.content,
});

const stage5 = assessment.pipe(model);
const finalAssessment = await stage5.invoke({
  project,
  category: category.content,
  missing: missingInfo.content,
});

console.log(finalAssessment.content);