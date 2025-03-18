const pool = require('./config/database');
const express = require('express');

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('API is working');
});

app.get('/api/items', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM item');
        res.json(result.rows);
    }
    catch (err) {
        console.error('Error executing query', err);
        res.status(500).send('Server error');
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
