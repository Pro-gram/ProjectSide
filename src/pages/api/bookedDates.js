import { pool } from '../../../server'; // Adjust the path based on your project structure

export default async function handler(req, res) {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM booked_dates');
    res.json(result.rows);
  } catch (error) {
    console.error('Error querying booked dates:', error);
    res.status(500).json({ error: 'Internal Server Error. Please use the Contact Sales button instead.' });
  } finally {
    client.release();
  }
}
