import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI } from '@google/genai';

const LANGUAGE_NAMES: Record<string, string> = {
  en: 'English',
  pt: 'Portuguese',
  es: 'Spanish',
  de: 'German',
  fr: 'French',
  it: 'Italian'
};

const BASE_INSTRUCTION = `
You are a world-class professional hair colorist and Visagismo expert working for Beatriz Bittencourt Professional.
Your goal is to provide a personal hair color consultation based on the client's features (Visagismo).
1. Be concise, professional, and encouraging.
2. Ask the user about their current hair color, eye color, skin tone, and hair history.
3. Use Visagismo principles to recommend shades that enhance their natural features.
4. Recommend specific types of products (e.g., Ammonia-free, acidic gloss, permanent coverage).
5. If they ask about shades, suggest specific tones (e.g., "7.1 Cool Blonde", "5.3 Golden Brown").
6. Keep responses short (under 100 words) to fit a mobile chat interface.
`;

// Helper for OpenRouter
async function chatWithOpenRouter(
  openRouterKey: string,
  messages: any[],
  systemInstruction: string
): Promise<string> {
  const model = "google/gemini-2.0-flash-001"; 

  const finalMessages = [
    { role: "system", content: systemInstruction },
    ...messages
  ];

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${openRouterKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://beatrizbittencourt.vercel.app", 
      "X-Title": "Beatriz Bittencourt Visagismo"
    },
    body: JSON.stringify({
      model: model,
      messages: finalMessages,
      temperature: 0.7,
      max_tokens: 500
    })
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error?.message || "OpenRouter chat failed");
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content || "";
}

// Helper for SiliconFlow
async function chatWithSiliconFlow(
  siliconFlowKey: string,
  messages: any[],
  systemInstruction: string
): Promise<string> {
  // Using DeepSeek-V3 on SiliconFlow as a powerful alternative
  const model = "deepseek-ai/DeepSeek-V3"; 

  const finalMessages = [
    { role: "system", content: systemInstruction },
    ...messages
  ];

  const response = await fetch("https://api.siliconflow.cn/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${siliconFlowKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: model,
      messages: finalMessages,
      temperature: 0.7,
      max_tokens: 500,
      stream: false
    })
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error?.message || "SiliconFlow chat failed");
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content || "";
}

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
    const { message, history, language, image, openRouterKey, siliconFlowKey } = req.body;
    
    // Validate that we have either text or image
    if (!message && !image) {
      return res.status(400).json({ error: 'Missing message content (text or image) in request body.' });
    }
     if (!Array.isArray(history)) {
      return res.status(400).json({ error: 'Missing or invalid history in request body.' });
    }

    // Determine Language
    const targetLang = LANGUAGE_NAMES[language] || 'English';
    const dynamicInstruction = `${BASE_INSTRUCTION}\n\nIMPORTANT: You MUST respond in ${targetLang}.`;
    
    // Prepare standard messages format for alternatives
    const standardMessages = history.map((msg: any) => ({
             role: msg.role === 'model' ? 'assistant' : 'user',
             content: msg.text
    }));
    
    // Add current message
    let currentContent: any = message;
    if (image) {
         // Standard Vision format
         currentContent = [
             { type: "text", text: message || "Analyze this image." },
             { type: "image_url", image_url: { url: image } }
         ];
    }
    standardMessages.push({ role: 'user', content: currentContent });

    // Priority 1: OpenRouter
    const activeOpenRouterKey = openRouterKey || process.env.ADMIN_OPENROUTER_KEY;
    if (activeOpenRouterKey) {
        console.log("Using OpenRouter for chat");
        const responseText = await chatWithOpenRouter(activeOpenRouterKey, standardMessages, dynamicInstruction);
        return res.status(200).json({ responseText });
    }

    // Priority 2: SiliconFlow
    const activeSiliconFlowKey = siliconFlowKey || process.env.ADMIN_SILICONFLOW_KEY;
    if (activeSiliconFlowKey && !image) { // DeepSeek-V3 typically text only via SiliconFlow chat endpoint, use fallback for images unless checking specific vision model
        console.log("Using SiliconFlow for chat");
        const responseText = await chatWithSiliconFlow(activeSiliconFlowKey, standardMessages, dynamicInstruction);
        return res.status(200).json({ responseText });
    }

    // Fallback: Direct Gemini
    console.log("Using Gemini for chat");
    const client = getAiClient();
    const chatSession = client.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: dynamicInstruction,
      },
      // Pass the existing history to the chat session
      history: history.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.text }]
      }))
    });

    let result;
    if (image) {
      // Clean base64 string
      const cleanBase64 = image.replace(/^data:image\/(png|jpeg|jpg);base64,/, "");
      
      // Multimodal message - Must be wrapped in { message: ... }
      result = await chatSession.sendMessage({
        message: [
          { text: message || "Analyze this image." },
          { inlineData: { mimeType: 'image/jpeg', data: cleanBase64 } }
        ]
      });
    } else {
      // Text-only message
      result = await chatSession.sendMessage({ message });
    }

    const responseText = result.text || "I apologize, I couldn't generate a response at this moment.";
    
    res.status(200).json({ responseText });

  } catch (error: any) {
    console.error('API Error in /api/chat:', error);
    res.status(500).json({ error: 'The consultation service is temporarily unavailable.', details: error.message });
  }
}