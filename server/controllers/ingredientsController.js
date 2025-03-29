import pool from '../config/database.js';

// Get all ingredients
export const getAllIngredients = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM ingredient');
        res.status(200).json(result.rows);
    }
    catch (err) {
        console.error('Error getAllIngredients', err);
        res.status(500).json("Server Error");
    }
}

// Get ingredient based on ID
export const getIngredient = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM ingredient WHERE ingredient_id=$1', [id]);
        res.status(200).json(result.rows);
    }
    catch (err) {
        console.error('Error getIngredient', err);
        res.status(500).json("Server Error");
    }
}

// Update ingredient quantity
export const updateIngredientQuantity = async (req, res) => {
    const { id } = req.params;
    const { quantity } = req.body;
    try {
        const result = await pool.query('UPDATE ingredient SET quantity=$1 WHERE ingredient_id=$2 RETURNING *', [quantity, id]);
        res.status(200).json(result.rows);
    }
    catch (err) {
        console.error('Error updateIngredientQuantity', err);
        res.status(500).json("Server Error");
    }
}
