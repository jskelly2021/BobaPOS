const pool = require('../config/database');
const express = require('express');
const router = express.Router();

// Gets all items
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM item');
        res.json(result.rows);
    }
    catch (err) {
        console.error('Error executing query', err);
        res.status(500).send('Server error');
    }
});

module.exports = router;
