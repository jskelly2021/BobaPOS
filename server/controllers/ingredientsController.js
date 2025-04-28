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
            SELECT i.item_name, g.ingredient_id, g.ingredient_name, ig.quantity, g.quantity AS total_quantity, g.threshold
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

export const updateIngredientInItem = async (req, res) => {
    const { id } = req.params;
    const { ingredient_id, quantity } = req.body;
    try {
        const result = await pool.query(`UPDATE item_ingredient SET quantity = $1 WHERE item_id = $2 AND ingredient_id = $3`,
            [quantity, id, ingredient_id]
        );
        res.status(200).json(result.rows);
    } catch (err) {
        console.error("Error updating the ingredients in an item", err);
        res.status(500).json("Server Error");
    }
}

export const insertIngredientInItem = async (req, res) => {
    const { id } = req.params;
    const { ingredient_id, quantity } = req.body;
    try {
        const result = await pool.query(`INSERT INTO item_ingredient (item_id, ingredient_id, quantity) VALUES ($1, $2, $3)`,
            [id, ingredient_id, quantity]
        );
        res.status(200).json(result.rows);
    } catch (err) {
        console.error("Error inserting an ingredient in an item", err);
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

//Delete ingredient
export const deleteIngredient = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM ingredient WHERE ingredient_id=$1 RETURNING *', [id]);
        res.status(200).json(result.rows[0]);
    }
    catch (err) {
        console.error('Error deleteIngredient', err);
        res.status(500).json("Item not found");
    }
}

// Create a new ingredient
export const createIngredient = async (req, res) => {
    try {
        const { ingredient_id, ingredient_name, category, quantity, threshold } = req.body;

        const result = await pool.query(
            "INSERT INTO ingredient (ingredient_id, ingredient_name, category, quantity, threshold) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [ingredient_id, ingredient_name, category, quantity, threshold]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error('Error createIngredient', err);
        res.status(500).json("Server Error");
    }
}

// Get the next available ID from the ingredient_id sequence.
export const getNextIngredientId = async (req, res) => {
    try {
        console.log("Getting next ID!");

        const seqResult = await pool.query("SELECT MAX (ingredient_id) as new_id FROM ingredient");
        const newId = Number(seqResult.rows[0].new_id) + 1;
        console.log("New ID:", newId);

        res.status(200).json(newId);
    } catch (err) {
        console.error("Error retrieving next ingredient ID:", err);
        res.status(500).json("Server Error");
    }
}
