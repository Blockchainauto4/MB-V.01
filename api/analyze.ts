
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI, Type } from '@google/genai';
import { VisagismAnalysis } from '../types';

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
    imageGenerationPrompt: { type: Type.STRING, description: "A highly detailed English prompt for an AI image generator to create a photorealistic portrait of this person with the suggested hairstyle. Include details like 'cinematic lighting', '8k', 'photorealistic'." }
  },
  required: ["faceShape", "skinTone", "eyeColor", "bestColors", "hairSuggestion", "reasoning", "imageGenerationPrompt"]
};

const analyzeFace = async (base64Image: string): Promise<VisagismAnalysis> => {
  const client = getAiClient();
  const cleanBase64 = base64Image.replace(/^data:image\/(png|jpeg|jpg);base64,/, "");

  const response = await client.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: {
      parts: [
        { inlineData: { mimeType: 'image/jpeg', data: cleanBase64 } },
        { text: "Analyze this face for a professional Visagismo consultation. Identify the face shape, skin tone, and suggest the best hair transformation. Return the response in JSON." }
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

const generatePreview = async (prompt: string): Promise<string> => {
  const client = getAiClient();
  const response = await client.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: { parts: [{ text: prompt }] }
  });

  if (response.candidates?.[0]?.content?.parts) {
     for (const part of response.candidates[0].content.parts) {
       if (part.inlineData) {
         return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
       }
     }
  }
  throw new Error("No image generated");
};


export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end('Method Not Allowed');
  }

  try {
    const { imageBase64 } = req.body;
    if (!imageBase64) {
      return res.status(400).json({ error: 'Missing imageBase64 in request body.' });
    }

    // 1. Analyze the face
    const analysis = await analyzeFace(imageBase64);

    // 2. Generate the style preview
    const generatedImage = await generatePreview(analysis.imageGenerationPrompt);

    // 3. Send both back to the client
    res.status(200).json({ analysis, generatedImage });

  } catch (error: any) {
    console.error('API Error in /api/analyze:', error);
    res.status(500).json({ error: 'An error occurred during the analysis.', details: error.message });
  }
}
