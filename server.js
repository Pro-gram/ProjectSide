const express = require('express');
const { Pool } = require('pg');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// Set up a PostgreSQL connection pool
const pool = new Pool({
  user: 'Pro-gram',
  host: 'localhost',
  database: 'booking_system',
  password: '2020',
  port: 5432,
});

app.prepare().then(() => {
  const server = express();

  server.use(express.json());

  server.get('/api/bookedDates', async (req, res) => {
    const client = await pool.connect();
    try {
      const result = await client.query('SELECT * FROM booked_dates');
      res.json(result.rows);
    } catch (error) {
      console.error('Error querying booked dates:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } finally {
      client.release();
    }
  });

  server.post('/api/bookDate', async (req, res) => {
    const { date, time, userId } = req.body;
  
    // Ensure userId is a valid integer
    const userIdAsInt = parseInt(userId, 10);
  
    if (!date || !time || isNaN(userIdAsInt)) {
      return res.status(400).json({ error: 'Invalid request. Please provide valid date, time, and userId.' });
    }
  
    const client = await pool.connect();
    try {
      await client.query('INSERT INTO booked_dates (date, time, user_id) VALUES ($1, $2, $3)', [date, time, userIdAsInt]);
      res.json({ success: true });
    } catch (error) {
      console.error('Error booking date:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } finally {
      client.release();
    }
  });

  server.get('*', (req, res) => {
    return handle(req, res);
  });

  const port = process.env.PORT || 3000;

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
