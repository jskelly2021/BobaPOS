const pool = require('../config/database');
const express = require('express');
const router = express.Router();

// Gets all items
router.get('/items', async (req, res) => {
    items = []

    try {
        const result = await pool.query('SELECT * FROM item');
        items = result.rows;

        const data = {items: items};
        console.log(items);
        res.render('cashierMenu', data);   
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
        const data = { items: result.rows }
        res.render('cashierMenu', data);
    }
    catch (err) {
        console.error('Error executing query', err);
        res.status(500).send('Server error');
    }
});

module.exports = router;
