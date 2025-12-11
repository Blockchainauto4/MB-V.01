import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI, Type } from '@google/genai';

// Define interface locally to avoid module resolution issues in Vercel functions
interface VisagismAnalysis {
  faceShape: string;
  skinTone: string;
  eyeColor: string;
  bestColors: string[];
  hairSuggestion: string;
  reasoning: string;
  imageGenerationPrompt: string;
}

const LANGUAGE_NAMES: Record<string, string> = {
  en: 'English',
  pt: 'Portuguese',
  es: 'Spanish',
  de: 'German',
  fr: 'French',
  it: 'Italian'
};

// This function runs on the server, keeping the API key secure.
function getAiClient(): GoogleGenAI {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set.");
  }
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
}

const analysisSchema = {
  type: Type.OBJECT,
  properties: {
    faceShape: { type: Type.STRING, description: "The shape of the face (e.g., Oval, Round, Square, Heart)." },
    skinTone: { type: Type.STRING, description: "The skin tone and undertone (e.g., Fair Cool, Medium Warm, Deep Neutral)." },
    eyeColor: { type: Type.STRING, description: "The detected eye color." },
    bestColors: { type: Type.ARRAY, items: { type: Type.STRING }, description: "List of 3 color categories that suit this person." },
    hairSuggestion: { type: Type.STRING, description: "A specific hair color or cut suggestion." },
    reasoning: { type: Type.STRING, description: "Why this suggestion works based on Visagismo principles." },
    imageGenerationPrompt: { type: Type.STRING, description: "A highly detailed, photorealistic prompt for DALL-E 3. It MUST describe the person's physical facial features (approximate age, skin texture, eye shape, face shape, lips) AND the NEW suggested hairstyle. Format: 'A photorealistic portrait of a [age] year old woman/man with [skin tone], [face shape], [eye color] eyes... wearing [suggested hairstyle]'." }
  },
  required: ["faceShape", "skinTone", "eyeColor", "bestColors", "hairSuggestion", "reasoning", "imageGenerationPrompt"]
};

const analyzeFace = async (base64Image: string, language: string): Promise<VisagismAnalysis> => {
  const client = getAiClient();
  const cleanBase64 = base64Image.replace(/^data:image\/(png|jpeg|jpg);base64,/, "");
  
  const targetLang = LANGUAGE_NAMES[language] || 'English';

  const response = await client.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: {
      parts: [
        { inlineData: { mimeType: 'image/jpeg', data: cleanBase64 } },
        { text: `Analyze this face for a professional Visagismo consultation. Identify the face shape, skin tone, and suggest the best hair transformation. Return the response in JSON. IMPORTANT: All text fields (faceShape, skinTone, hairSuggestion, reasoning) MUST be in ${targetLang}. The 'imageGenerationPrompt' MUST be in English and serve as a full visual description of the person with the NEW hair style.` }
      ]
    },
    config: {
      responseMimeType: "application/json",
      responseSchema: analysisSchema
    }
  });

  const jsonText = response.text;
  if (!jsonText) throw new Error("No analysis generated");
  
  return JSON.parse(jsonText) as VisagismAnalysis;
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end('Method Not Allowed');
  }

  try {
    const { imageBase64, language } = req.body;
    if (!imageBase64) {
      return res.status(400).json({ error: 'Missing imageBase64 in request body.' });
    }

    // 1. Analyze the face ONLY (Image generation is now handled by /api/generate-final-image)
    const analysis = await analyzeFace(imageBase64, language || 'en');

    res.status(200).json({ analysis });

  } catch (error: any) {
    console.error('API Error in /api/analyze:', error);
    res.status(500).json({ error: 'An error occurred during the analysis.', details: error.message });
  }
}