const { GoogleGenerativeAI } = require("@google/generative-ai");
const {
  buildItineraryPrompt,
  buildRegenerateDayPrompt,
} = require("../prompts/itinerary.prompt");

const MODEL = "gemini-1.5-flash";

const SYSTEM_INSTRUCTION = `You are a world-class travel planner.
Rules:
- Generate realistic, destination-specific travel plans.
- Match the user's budget and interests.
- Return structured itinerary, budget breakdown, and hotel suggestions.
- Respond with valid JSON only.
- Do NOT use markdown, code fences, or explanations.`;

const parseJsonResponse = (text) => {
  const clean = text
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();
  return JSON.parse(clean);
};

const getModel = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured");
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  return genAI.getGenerativeModel({
    model: MODEL,
    systemInstruction: SYSTEM_INSTRUCTION,
    generationConfig: {
      responseMimeType: "application/json",
      temperature: 0.7,
    },
  });
};

const callGemini = async (prompt) => {
  const model = getModel();
  const result = await model.generateContent(prompt);
  const text = result.response.text();

  if (!text) {
    throw new Error("Empty response from Gemini API");
  }

  return text;
};

const generateTripPlan = async ({
  destination,
  days,
  budgetType,
  interests,
}) => {
  try {
    const prompt = buildItineraryPrompt({
      destination,
      days,
      budgetType,
      interests,
    });

    const text = await callGemini(prompt);
    return parseJsonResponse(text);
  } catch (error) {
    console.error("Gemini generate error:", error.message || error);
    throw new Error(
      "Failed to generate trip plan. Please try again."
    );
  }
};

const regenerateDay = async ({
  destination,
  dayNumber,
  instruction,
  budgetType,
  interests,
}) => {
  try {
    const prompt = buildRegenerateDayPrompt({
      destination,
      dayNumber,
      instruction,
      budgetType,
      interests,
    });

    const text = await callGemini(prompt);
    return parseJsonResponse(text);
  } catch (error) {
    console.error("Gemini regenerate error:", error.message || error);
    throw new Error(
      "Failed to regenerate day. Please try again."
    );
  }
};

module.exports = {
  generateTripPlan,
  regenerateDay,
};
