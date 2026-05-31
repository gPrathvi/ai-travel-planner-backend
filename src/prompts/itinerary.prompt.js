const buildItineraryPrompt = ({ destination, days, budgetType, interests }) => {
  return `You are an expert travel planner.

Generate a complete travel plan for:

Destination: ${destination}
Days: ${days}
Budget Type: ${budgetType}
Interests: ${interests.join(", ")}

Return ONLY valid JSON.

IMPORTANT RULES:
- Start response with {
- End response with }
- No markdown
- No code fences
- No explanations
- No comments
- Must be valid JSON.parse()
- Generate exactly ${days} days
- Include itinerary, budget, hotels and restaurants

CURRENCY RULES:
- If destination is in India use INR and currencySymbol "₹"
- If destination is outside India use USD and currencySymbol "$"

IMPORTANT BUDGET RULES:
- Generate REALISTIC costs based on destination, days and budget type
- Do NOT use fixed values
- Do NOT reuse prices from examples
- Hotel prices must reflect actual destination pricing
- Food costs must reflect local pricing
- Transport costs must reflect local pricing
- Activity costs must reflect local attraction prices

Examples:
- Mysore (3 days, low budget): ₹4000 - ₹9000
- Goa (3 days, medium budget): ₹15000 - ₹30000
- Tokyo (5 days, medium budget): $1500 - $3000
- Paris (5 days, luxury budget): $3000 - $8000

RESTAURANT PRICE RULES:
- For Indian destinations use:
  ₹
  ₹₹
  ₹₹₹

- For international destinations use:
  $
  $$
  $$$

JSON Structure Example:

{
  "itinerary": {
    "days": [
      {
        "day": 1,
        "activities": [
          {
            "time": "Morning",
            "title": "Activity Name",
            "description": "Activity Description"
          },
          {
            "time": "Afternoon",
            "title": "Activity Name",
            "description": "Activity Description"
          },
          {
            "time": "Evening",
            "title": "Activity Name",
            "description": "Activity Description"
          }
        ]
      }
    ]
  },

  "budget": {
    "transport": 0,
    "accommodation": 0,
    "food": 0,
    "activities": 0,
    "miscellaneous": 0,
    "total": 0,
    "currency": "INR",
    "currencySymbol": "₹",
    "note": "Realistic estimated trip cost"
  },

  "hotels": [
    {
      "name": "Hotel Name",
      "tier": "Budget",
      "pricePerNight": 0,
      "rating": 0,
      "highlight": "Near city center"
    },
    {
      "name": "Hotel Name",
      "tier": "Mid-Range",
      "pricePerNight": 0,
      "rating": 0,
      "highlight": "Great amenities"
    },
    {
      "name": "Hotel Name",
      "tier": "Luxury",
      "pricePerNight": 0,
      "rating": 0,
      "highlight": "Premium experience"
    }
  ],

  "restaurants": [
    {
      "name": "Restaurant Name",
      "cuisine": "Local Cuisine",
      "priceRange": "$$",
      "rating": 0,
      "mapsLink": "https://maps.google.com/?q=Restaurant+Name"
    }
  ]
}

Generate exactly ${days} days.

Generate:
- 3 hotel recommendations
- 5 restaurant recommendations
- realistic hotel prices
- realistic restaurant price ranges
- realistic budget estimates
- destination-specific activities
- valid Google Maps links
`;
};

const buildRegenerateDayPrompt = ({ destination, dayNumber, instruction, budgetType, interests }) => {
  return `You are an expert travel planner.

Regenerate Day ${dayNumber} for:

Destination: ${destination}
Budget Type: ${budgetType}
Interests: ${interests.join(", ")}

Special Instruction:
${instruction}

Return ONLY valid JSON.

Rules:
- Start with {
- End with }
- No markdown
- No explanations
- No comments
- Must be valid JSON.parse()

{
  "day": ${dayNumber},
  "activities": [
    {
      "time": "Morning",
      "title": "Activity Name",
      "description": "Detailed Description"
    },
    {
      "time": "Afternoon",
      "title": "Activity Name",
      "description": "Detailed Description"
    },
    {
      "time": "Evening",
      "title": "Activity Name",
      "description": "Detailed Description"
    }
  ]
}

Generate destination-specific activities only.
`;
};

module.exports = {
  buildItineraryPrompt,
  buildRegenerateDayPrompt
};