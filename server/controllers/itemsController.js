const pool = require('../config/database.js');

// Get all items
export const getAllItems = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM item');
        res.status(200).json(result.rows);
    }
    catch (err) {
        console.error('Error getAllItems', err);
        res.status(500).json("Server Error" );
    }
}

// Get single item by id
export const getItem = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM item WHERE item_id=$1', [id]);
        res.status(200).json(result.rows);
    }
    catch (err) {
        console.error('Error getItem', err);
        res.status(500).json("Item not found");
    }
}
