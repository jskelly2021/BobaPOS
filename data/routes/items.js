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

// Get items by category
router.get('/category/:category', async (req, res) => {
    const { category } = req.params;
    try {
        const result = await pool.query('SELECT * FROM item WHERE category = $1', [category]);
        if (result.rows.length === 0) {
            return res.status(404).send('No items found for this category');
        }
        res.json(result.rows);
    }
    catch (err) {
        console.error('Error executing query', err);
        res.status(500).send('Server error');
    }
});

module.exports = router;
