import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end('Method Not Allowed');
  }

  try {
    const { prompt, apiKey } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Missing prompt in request body.' });
    }

    // PRIORITY: 
    // 1. User provided key (from frontend/localStorage)
    // 2. Admin Global Key (from Vercel Environment Variables)
    const keyToUse = apiKey || process.env.ADMIN_OPENAI_KEY;

    if (!keyToUse) {
      return res.status(401).json({ 
        error: 'No API Key available.', 
        details: 'User has not provided a key and no Global Admin Key is configured.' 
      });
    }

    // Upgraded to DALL-E 3 for "Fiel Copy" (High Fidelity)
    const openaiResponse = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${keyToUse}`,
      },
      body: JSON.stringify({
        model: "dall-e-3", 
        prompt: `Professional portrait photography. ${prompt}`,
        n: 1,
        size: "1024x1024",
        quality: "hd", // High Definition for better facial details
        style: "natural", // Natural style to avoid "AI cartoon" look
        response_format: 'b64_json',
      }),
    });
    
    if (!openaiResponse.ok) {
        const errorData = await openaiResponse.json();
        console.error('OpenAI API Error:', errorData);
        throw new Error(errorData.error?.message || 'Failed to generate image with DALL-E 3.');
    }

    const data = await openaiResponse.json();
    const imageB64 = data.data[0].b64_json;
    const finalImage = `data:image/png;base64,${imageB64}`;

    res.status(200).json({ finalImage });

  } catch (error: any) {
    console.error('API Error in /api/generate-final-image:', error);
    res.status(500).json({ error: 'Failed to generate the final image.', details: error.message });
  }
}