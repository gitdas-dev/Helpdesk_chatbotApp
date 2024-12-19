import express from "express";
import Chat from "../models/Chat.js";
import mongoose from "mongoose";

const router = express.Router();

const generateBankResponse = (message) => {
  const input = message.toLowerCase();

  // Bank account opening related responses
  if (input.includes("hello") || input.includes("hi")) {
    return "Hello! How can I help you today?";
  }

  if (input.includes("how are you")) {
    return "I'm doing well, thank you for asking! How can I assist you?";
  }

  if (input.includes("bye") || input.includes("goodbye")) {
    return "Goodbye! Have a great day!";
  }

  if (input.includes("help")) {
    return "I can help you with general questions, troubleshooting, and basic information. What would you like to know?";
  }

  if (input.includes("thank")) {
    return "You're welcome! Let me know if you need anything else.";
  }

  if (input.includes("weather")) {
    return "I'm sorry, I don't have access to real-time weather information. You might want to check a weather service for that.";
  }

  if (input.includes("time")) {
    return "I'm not able to provide real-time information, but you can check your device's clock for the current time.";
  }

  if (
    input.includes("open account") ||
    input.includes("new account") ||
    input.includes("create account")
  ) {
    return "To open a new bank account, you'll need: \n1. Valid ID proof (Passport/Driver's License) \n2. Proof of address \n3. Initial deposit \nWould you like to know about our account types?";
  }

  if (input.includes("account type") || input.includes("types of account")) {
    return "We offer these account types: \n1. Savings Account (3.5% interest) \n2. Checking Account \n3. Student Account (no fees) \n4. Business Account \nWhich one interests you?";
  }

  if (input.includes("document") || input.includes("requirements")) {
    return "Required documents: \n1. Government-issued ID \n2. Proof of address (utility bill/lease) \n3. SSN or Tax ID \n4. Initial deposit slip";
  }

  if (input.includes("minimum") || input.includes("initial deposit")) {
    return "Minimum initial deposits: \n- Savings: $100 \n- Checking: $50 \n- Student: $0 \n- Business: $500";
  }

  if (input.includes("interest") || input.includes("rate")) {
    return "Current interest rates: \n- Savings: 3.5% APY \n- Student: 2.5% APY \n- Business: 2.0% APY \n- Checking: 0.1% APY";
  }

  if (input.includes("time") || input.includes("how long")) {
    return "Account opening typically takes 15-20 minutes online or 30-45 minutes in branch. Your debit card will arrive in 5-7 business days.";
  }

  if (input.includes("hello") || input.includes("hi")) {
    return "Hello! I'm your banking assistant. How can I help you with opening a bank account today?";
  }

  if (input.includes("thank")) {
    return "You're welcome! Let me know if you have more questions about our banking services.";
  }

  // Default response
  return "I can help you with opening a bank account. You can ask about:\n- Account types\n- Required documents\n- Minimum deposits\n- Interest rates\n- Processing time";
};

router.post("/", async (req, res) => {
  try {
    const { message } = req.body;
    const response = generateBankResponse(message);

    // Save to database
    const chat = new Chat({
      message,
      response,
    });
    await chat.save();

    res.json({ response });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

router.get("/history", async (req, res) => {
  try {
    const history = await Chat.find().sort({ timestamp: -1 });
    res.json(history);
  } catch (error) {
    res.status(500).json({ error: "Error fetching chat history" });
  }
});

router.delete("/history", async (req, res) => {
  try {
    await Chat.deleteMany({});
    res.json({ message: "Chat history cleared" });
  } catch (error) {
    res.status(500).json({ error: "Error clearing chat history" });
  }
});

router.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

export default router;
