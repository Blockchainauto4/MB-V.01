import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end('Method Not Allowed');
  }

  try {
    const { prompt, apiKey } = req.body;

    if (!prompt || !apiKey) {
      return res.status(400).json({ error: 'Missing prompt or apiKey in request body.' });
    }

    const openaiResponse = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "dall-e-2", // DALL-E 2 is more cost-effective for this use case
        prompt: `${prompt}, ultra-realistic photograph, 8k, cinematic lighting, sharp focus`,
        n: 1,
        size: "1024x1024",
        response_format: 'b64_json',
      }),
    });
    
    if (!openaiResponse.ok) {
        const errorData = await openaiResponse.json();
        console.error('OpenAI API Error:', errorData);
        throw new Error(errorData.error?.message || 'Failed to generate image with DALL-E 2.');
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