// server/routes/ai.js
import express from 'express';
import { PrismaClient } from '@prisma/client';
import { GoogleGenerativeAI, SchemaType } from '@google/generative-ai';

const router = express.Router();
const prisma = new PrismaClient();

// Initialize the official Google Generative AI SDK using the key from .env
const genAI = new GoogleGenerativeAI(process.env.ANTIGRAVITY_API_KEY);

/**
 * Executes a call to Google Maps Distance Matrix API.
 * This is the actual code that runs when the AI decides it needs distance info.
 */
async function calculateShippingDistance(origin, destination) {
  try {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.rows[0]?.elements[0]?.status === 'OK') {
      return { distance: data.rows[0].elements[0].distance.text };
    }
    return { error: "Distance calculation failed or locations not found." };
  } catch (error) {
    console.error("Google Maps API Error:", error);
    return { error: "Failed to connect to routing service." };
  }
}

// Define the tool schema using Gemini's specific FunctionDeclaration format
const distanceTool = {
  functionDeclarations: [
    {
      name: "calculate_shipping_distance",
      description: "Calculates the shipping distance by road between two locations. Use this when a user asks about shipping, delivery distances, or logistics between a seller's location and their own location.",
      parameters: {
        type: SchemaType.OBJECT,
        properties: {
          origin: {
            type: SchemaType.STRING,
            description: "The starting location, usually the seller's city (e.g., 'Alappuzha, Kerala')",
          },
          destination: {
            type: SchemaType.STRING,
            description: "The destination location, usually the buyer's city",
          },
        },
        required: ["origin", "destination"],
      },
    },
  ],
};

// The system prompt controls identity, constraints, and language.
const SYSTEM_PROMPT = `
You are CoirBot, an expert assistant for the Coir Netra marketplace, specializing in Kerala's coir industry. 
Rules:
1. Limit responses to a maximum of 300 words. Be concise and helpful.
2. Reply natively in the language the user uses (English, Malayalam, or Manglish). Do not use external translation APIs.
3. Recommend products based ONLY on the "Available Products Context" provided below.
4. Do not make up product prices or quantities.
`;

router.post('/chat', async (req, res) => {
  try {
    const { userMessage } = req.body;

    if (!userMessage) {
      return res.status(400).json({ error: "userMessage is required." });
    }

    // --- 1. CONTEXT RETRIEVAL (RAG-lite) ---
    const keywords = userMessage.split(/\s+/).filter(w => w.length > 3);

    const searchConditions = keywords.map(word => ({
      name: { contains: word } // Remember we removed mode: 'insensitive' for SQLite compatibility
    }));

    const matchingProducts = await prisma.products.findMany({
      where: searchConditions.length > 0 ? { OR: searchConditions } : {},
      take: 5,
      include: {
        seller: {
          select: { location: true }
        }
      }
    });

    // --- 2. CONTEXT INJECTION ---
    let productContext = "Currently available products:\n";
    if (matchingProducts.length === 0) {
      productContext += "No specifically matching products found right now. Suggest general categories.\n";
    } else {
      matchingProducts.forEach(p => {
        productContext += `- ${p.name}: ₹${p.price_per_kg}/kg | ${p.quantity_available}kg available | Ships from: ${p.seller?.location || 'Unknown'}\n`;
      });
    }

    // --- 3. AI AGENT EXECUTION ---
    // Initialize the Gemini model with tools and injected system instructions
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash", // Using the fast Gemini flash model
      tools: [distanceTool],
      systemInstruction: `${SYSTEM_PROMPT}\n\n[Available Products Context]\n${productContext}`
    });

    // Start a chat session (keeps conversation state active for tool returns)
    const chat = model.startChat();

    // Send the user's message
    let result = await chat.sendMessage(userMessage);
    let response = result.response;

    // --- 4. HANDLING TOOL CALLS ---
    // Did Gemini decide it needs to query Google Maps?
    const calls = response.functionCalls();

    if (calls && calls.length > 0) {
      const toolResponses = [];

      for (const call of calls) {
        if (call.name === "calculate_shipping_distance") {
          const args = call.args;

          // Execute our native backend function
          const distanceResult = await calculateShippingDistance(args.origin, args.destination);

          // Prepare the response in Gemini's required functionResponse format
          toolResponses.push({
            functionResponse: {
              name: call.name,
              response: distanceResult
            }
          });
        }
      }

      // Send the fetched tool results BACK to Gemini so it can answer the user
      result = await chat.sendMessage(toolResponses);
      response = result.response;
    }

    // Return the final text string to the frontend
    return res.json({ reply: response.text() });

  } catch (error) {
    console.error("AI Endpoint Error:", error);
    // --- 5. FALLBACK MECHANISM ---
    return res.status(500).json({
      error: "Our AI assistant is temporarily unavailable. Please browse products or use the search bar."
    });
  }
});

export default router;
