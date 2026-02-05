import { GoogleGenAI } from "@google/genai";

if (!process.env.GEMINI_API_KEY) {
  throw new Error("Missing GEMINI_API_KEY");
}

const gemini = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export default gemini;



// const model = gemini.getGenerativeModel({ model: "gemini-1.5-pro" });

// const result = await model.generateContent("Hello world");

// const text = result.response.text();
