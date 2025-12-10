
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI } from '@google/genai';

const CONSULTATION_SYSTEM_INSTRUCTION = `
You are a world-class professional hair colorist and Visagismo expert working for Beatriz Bittencourt Professional.
Your goal is to provide a personal hair color consultation based on the client's features (Visagismo).
1. Be concise, professional, and encouraging.
2. Ask the user about their current hair color, eye color, skin tone, and hair history.
3. Use Visagismo principles to recommend shades that enhance their natural features (e.g., "For your warm skin tone, I suggest a Golden Brown to add radiance").
4. Recommend specific types of products (e.g., Ammonia-free, acidic gloss, permanent coverage).
5. If they ask about shades, suggest specific tones (e.g., "7.1 Cool Blonde", "5.3 Golden Brown").
6. Keep responses short (under 100 words) to fit a mobile chat interface.
`;

// This function runs on the server, keeping the API key secure.
function getAiClient(): GoogleGenAI {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set.");
  }
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end('Method Not Allowed');
  }

  try {
    const { message, history } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Missing message in request body.' });
    }
     if (!Array.isArray(history)) {
      return res.status(400).json({ error: 'Missing or invalid history in request body.' });
    }

    const client = getAiClient();
    const chatSession = client.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: CONSULTATION_SYSTEM_INSTRUCTION,
      },
      // Pass the existing history to the chat session
      history: history.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.text }]
      }))
    });

    const result = await chatSession.sendMessage({ message });
    const responseText = result.text || "I apologize, I couldn't generate a response at this moment.";
    
    res.status(200).json({ responseText });

  } catch (error: any) {
    console.error('API Error in /api/chat:', error);
    res.status(500).json({ error: 'The consultation service is temporarily unavailable.', details: error.message });
  }
}
