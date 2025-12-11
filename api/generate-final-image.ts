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

    // Use passed key or server environment variable for OpenAI
    const keyToUse = apiKey || process.env.OPENAI_API_KEY;

    if (!keyToUse) {
      return res.status(401).json({ 
        error: 'No API Key available.', 
        details: 'System is missing API Key configuration.' 
      });
    }

    // Call OpenAI DALL-E 2 API
    const response = await fetch('https://api.openai.com/v1/images/generations', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${keyToUse}`
        },
        body: JSON.stringify({
            model: "dall-e-2",
            prompt: `Professional portrait photography, 8k resolution, highly detailed, photorealistic. ${prompt}`,
            n: 1,
            size: "1024x1024",
            response_format: "b64_json"
        })
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'OpenAI API Error');
    }

    const data = await response.json();
    
    if (!data.data || !data.data[0] || !data.data[0].b64_json) {
        throw new Error("Invalid response format from OpenAI.");
    }

    const finalImage = `data:image/png;base64,${data.data[0].b64_json}`;

    res.status(200).json({ finalImage });

  } catch (error: any) {
    console.error('API Error in /api/generate-final-image:', error);
    res.status(500).json({ error: 'Failed to generate the final image.', details: error.message });
  }
}