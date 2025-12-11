import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI, Type } from '@google/genai';

// Helper to get Google Client
function getAiClient(): GoogleGenAI {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set.");
  }
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
}

const formulaSchema = {
  type: Type.OBJECT,
  properties: {
    startingLevel: { type: Type.STRING, description: "Estimated current hair level (1-10) based on source image." },
    targetLevel: { type: Type.STRING, description: "Target hair level (1-10) based on generated image." },
    process: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
            step: { type: Type.INTEGER },
            title: { type: Type.STRING },
            description: { type: Type.STRING },
            products: { type: Type.ARRAY, items: { type: Type.STRING } },
            time: { type: Type.STRING }
        }
      }
    },
    maintenance: { type: Type.STRING, description: "Home care advice." },
    estimatedCost: { type: Type.STRING, description: "Symbolic cost ($, $$, $$$)" }
  },
  required: ["startingLevel", "targetLevel", "process", "maintenance", "estimatedCost"]
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end('Method Not Allowed');
  }

  try {
    const { currentImage, targetImage, language } = req.body;

    if (!targetImage) {
      return res.status(400).json({ error: 'Missing target image.' });
    }

    const client = getAiClient();
    const parts: any[] = [];

    // Prompt Context
    const lang = language || 'en';
    const prompt = `Act as a Master Colorist Specialist in L'Oreal Professionnel products.
    Create a technical step-by-step formula to transform the hair from the 'Current Look' (if provided) to the 'Target Look'.
    
    If 'Current Look' is missing, assume a standard base 5 (Light Brown) natural hair.
    
    Use specific L'Oreal product lines (Majirel, Inoa, Dia Light, Blond Studio).
    Calculate the mixture, oxidant volume, and pause time.
    Return ONLY JSON. Language of the content: ${lang}.`;

    parts.push({ text: prompt });
    
    // Clean base64 headers
    const cleanTarget = targetImage.replace(/^data:image\/(png|jpeg|jpg);base64,/, "");
    parts.push({ inlineData: { mimeType: 'image/jpeg', data: cleanTarget } });

    if (currentImage) {
        const cleanCurrent = currentImage.replace(/^data:image\/(png|jpeg|jpg);base64,/, "");
        parts.push({ inlineData: { mimeType: 'image/jpeg', data: cleanCurrent } });
    }

    const response = await client.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: { parts: parts },
      config: {
        responseMimeType: "application/json",
        responseSchema: formulaSchema
      }
    });

    const jsonText = response.text;
    if (!jsonText) throw new Error("No formula generated");
    
    const formula = JSON.parse(jsonText);
    res.status(200).json({ formula });

  } catch (error: any) {
    console.error('API Error in /api/generate-formula:', error);
    res.status(500).json({ error: 'Failed to generate formula.', details: error.message });
  }
}