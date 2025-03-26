const pool = require('../config/database');
const express = require('express');
const router = express.Router();

// Gets all items
router.get('/', async (req, res) => {
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

module.exports = router;
