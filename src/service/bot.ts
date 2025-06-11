import { GoogleGenAI } from "@google/genai";
// const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const ai = new GoogleGenAI({
  apiKey: "AIzaSyAXTtLqBJO3apunAzB8lFXbjOAdORQfQ7A",
});

export const generateContent = async (prompt: string) => {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash-001",
    contents: prompt,
  });

  return response.text;
};
