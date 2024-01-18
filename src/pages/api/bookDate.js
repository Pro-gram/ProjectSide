import { pool } from '../../../server'; // Adjust the path based on your project structure

export default async function handler(req, res) {
  const { date, time, userId } = req.body;

  if (!date || !time || !userId) {
    return res.status(400).json({ error: 'Invalid request. Please provide date, time, and userId.' });
  }

  const client = await pool.connect();
  try {
    await client.query('INSERT INTO booked_dates (date, time, user_id) VALUES ($1, $2, $3)', [date, time, userId]);
    res.json({ success: true });
  } catch (error) {
    console.error('Error booking date:', error);
    res.status(500).json({ error: 'Internal Server Error. Please use the Contact Sales button instead.' });
  } finally {  9
    client.release();
  }
}
