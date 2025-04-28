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

// Retrieves the ingredients in a given item
export const getIngredientsInItem = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query(`
            SELECT i.item_name, g.ingredient_name, ig.quantity, g.quantity AS total_quantity, g.threshold
            FROM item i
            INNER JOIN item_ingredient ig ON i.item_id = ig.item_id
            INNER JOIN ingredient g ON ig.ingredient_id = g.ingredient_id
            WHERE i.item_id = $1`,
            [id]);
        res.status(200).json(result.rows);
    } catch (err) {
        console.error('Error getting ingredients in item', err);
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
export const updateIngredient = async (req, res) => {
    const { id } = req.params;
    const { ingredient_name, quantity, threshold } = req.body;
    try {
        const result = await pool.query('UPDATE ingredient SET ingredient_name=$1, quantity=$2, threshold=$3 WHERE ingredient_id=$4 RETURNING *',
            [ingredient_name, quantity, threshold, id]);
        res.status(200).json(result.rows);
        console.log(`Updating ingredient ${id}: New Quantity = ${quantity}`);
    }
    catch (err) {
        console.error('Backend Error updating ingredient quantity', err);
        res.status(500).json("Server Error");
    }
}
