import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Pool } from 'pg';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end('Method Not Allowed');
  }

  if (!process.env.POSTGRES_URL) {
    return res.status(500).json({ error: 'The POSTGRES_URL environment variable is not set.' });
  }

  const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
    ssl: {
      rejectUnauthorized: false, 
    },
  });

  try {
    const client = await pool.connect();
    const result = await client.query('SELECT NOW()');
    client.release();
    // Return a successful response with the current time from the database
    res.status(200).json({ dbTime: result.rows[0].now });
  } catch (error: any) {
    console.error('Database Connection Error:', error);
    // Return a generic error message to the client
    res.status(500).json({ error: 'Failed to connect to the database.', details: error.message });
  }
}
