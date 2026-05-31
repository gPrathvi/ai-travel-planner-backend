const Groq = require("groq-sdk");

const {
  buildItineraryPrompt,
  buildRegenerateDayPrompt,
} = require("../prompts/itinerary.prompt");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const callGroq = async (prompt) => {
  console.log("Groq Key Exists:", !!process.env.GROQ_API_KEY);

  const response = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    temperature: 0.2,
    max_tokens: 4000,

    messages: [
      {
        role: "system",
        content: `You are an expert travel planner.

Return ONLY valid JSON.

Rules:
- Start response with {
- End response with }
- No markdown
- No code fences
- No explanations
- No comments
- Must be valid for JSON.parse()
- Generate all requested days
- Generate budget object
- Generate hotels array
- Generate restaurants array
- Return valid JSON only`
      },
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  const content = response.choices[0].message.content;

  console.log("MODEL OUTPUT:");
  console.log(content);

  return content;
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

    const text = await callGroq(prompt);

    const clean = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    console.log("RAW AI RESPONSE:");
    console.log(clean);

    const parsed = JSON.parse(clean);

    if (
      !parsed.itinerary ||
      !parsed.itinerary.days ||
      !parsed.budget ||
      !parsed.hotels ||
      !parsed.restaurants
    ) {
      throw new Error("Invalid AI response structure");
    }

    return parsed;
  } catch (error) {
    console.error("Groq Generate Error:", error);
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

    const text = await callGroq(prompt);

    const clean = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    console.log("RAW AI RESPONSE:");
    console.log(clean);

    const parsed = JSON.parse(clean);

    if (!parsed.day || !parsed.activities) {
      throw new Error(
        "Invalid regenerated day structure"
      );
    }

    return parsed;
  } catch (error) {
    console.error("Groq Regenerate Error:", error);
    throw new Error(
      "Failed to regenerate day. Please try again."
    );
  }
};

module.exports = {
  generateTripPlan,
  regenerateDay,
};

