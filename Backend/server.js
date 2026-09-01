const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const pool = require('./models/db');

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Retailer logs request
app.post('/api/retailers/request', async (req, res) => {
  const { retailer_id, customer_name, item } = req.body;
  const result = await pool.query(
    'INSERT INTO requests (retailer_id, customer_name, item, status) VALUES ($1,$2,$3,$4) RETURNING *',
    [retailer_id, customer_name, item, 'Requested']
  );
  res.json(result.rows[0]);
});

// Dispatcher assigns rider
app.post('/api/dispatchers/assign', async (req, res) => {
  const { request_id, rider_id } = req.body;
  const result = await pool.query(
    'UPDATE requests SET rider_id=$1, status=$2 WHERE id=$3 RETURNING *',
    [rider_id, 'Assigned', request_id]
  );
  res.json(result.rows[0]);
});

// Rider updates status
app.post('/api/riders/update', async (req, res) => {
  const { rider_id, status } = req.body;
  const result = await pool.query(
    'INSERT INTO statusupdates (request_id, status) SELECT id, $1 FROM requests WHERE rider_id=$2 RETURNING *',
    [status, rider_id]
  );
  res.json(result.rows[0]);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
