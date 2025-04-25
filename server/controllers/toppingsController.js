import pool from '../config/database.js';

//Create a get all toppings function
export const getAllToppings = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM topping');
        res.status(200).json(result.rows);
    }
    catch (err) {
        console.error('Error getAllToppings', err);
        res.status(500).json("Server Error");
    }
}

//get topping based on ID
export const getTopping = async (req, res) => 
{
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM topping WHERE topping_id=$1', [id]);
        res.status(200).json(result.rows);
    }
    catch (err) 
    {
        console.error('Error getTopping', err);
        res.status(500).json("Server Error");
    }
}

//update topping quantity
export const updateTopping = async (req, res) => {
    const { id } = req.params;
    const { topping_name, price, calories } = req.body;
    try {
        const result = await pool.query('UPDATE topping SET topping_name=$1, price=$2, calories=$3 WHERE topping_id=$4 RETURNING *',
            [topping_name, price, calories, id]);
        res.status(200).json(result.rows);
    }
    catch (err) {
        console.error('Error updateTopping', err);
        res.status(500).json("Server Error");
    }
}

// Create a new topping
export const createTopping = async (req, res) => {
    try {
        const { topping_id, topping_name, price, calories } = req.body;

        const result = await pool.query(
            "INSERT INTO topping (topping_id, topping_name, price, calories) VALUES ($1, $2, $3, $4) RETURNING *",
            [topping_id, topping_name, price, calories]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error('Error createTopping', err);
        res.status(500).json("Server Error");
    }
}

//Delete topping
export const deleteTopping = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM topping WHERE topping_id=$1 RETURNING *', [id]);
        res.status(200).json(result.rows[0]);
    }
    catch (err) {
        console.error('Error deleteTopping', err);
        res.status(500).json("Topping not found");
    }
}

// Get the next available ID from the topping_id sequence.
export const getNextToppingId = async (req, res) => {
    try {
        const seqResult = await pool.query("SELECT MAX (topping_id) as new_id FROM topping");
        const newId = Number(seqResult.rows[0].new_id) + 1;
        console.log("New ID:", newId);

        res.status(200).json(newId);
    } catch (err) {
        console.error("Error retrieving next topping ID:", err);
        res.status(500).json("Server Error");
    }
}

// Returns the default toppings assocaited to a given item Id
export const getDefaultToppingOnItem = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query(`
            SELECT t.topping_id, t.topping_name, t.price, t.calories, it.quantity
            FROM item_topping it
            JOIN topping t ON it.topping_id = t.topping_id
            JOIN item i ON it.item_id = i.item_id
            WHERE i.item_id = $1`,
            [id]
        );
        res.status(200).json(result.rows);
    } catch (err) {
        console.error("Error retrieving the default toppings", err);
        res.status(500).json("Server Error");
    }
}

// Updates a the quantity of a default toppings assocaited to a given item Id
export const updateDefaultToppingOnItem = async (req, res) => {
    const { id } = req.params;
    const { topping_id, quantity } = req.body;
    try {
        const result = await pool.query(`UPDATE item_topping SET quantity = $1 WHERE item_id = $2 AND topping_id = $3`,
            [quantity, id, topping_id]
        );
        res.status(200).json(result.rows);
    } catch (err) {
        console.error("Error updating the default topping", err);
        res.status(500).json("Server Error");
    }
}

// Inserts a default topping assocaited to a given item Id
export const insertDefaultToppingOnItem = async (req, res) => {
    const { id } = req.params;
    const { topping_id, quantity } = req.body;
    try {
        const result = await pool.query(`INSERT INTO item_topping (item_id, topping_id, quantity) VALUES ($1, $2, $3)`,
            [id, topping_id, quantity]
        );
        res.status(200).json(result.rows);
    } catch (err) {
        console.error("Error inserting a default topping", err);
        res.status(500).json("Server Error");
    }
}

