import { configDotenv } from "dotenv";
import express from "express";

configDotenv();

const app = express();
app.use(express.json());

// Upload endpoint
app.post("/upload", (req, res) => {
  // TODO: implement upload handling
  res.json({ message: "Upload endpoint not yet implemented" });
});

// Prompt endpoint
app.post("/prompt", (req, res) => {
  // TODO: implement prompt handling
  res.json({ message: "Prompt endpoint not yet implemented" });
});

// Health endpoint
app.get("/health", (req, res) => {
  // TODO: implement health endpoint
  res.json({ message: "Status is OK" });
});

// Start server
const PORT = process.env.SERVER_PORT ;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
