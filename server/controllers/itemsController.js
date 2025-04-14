import pool from '../config/database.js';

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

// Get all items in given category
export const getItemsByCategory = async(req, res) => {
    const { category } = req.params;
    try {
        const result = await pool.query('SELECT * FROM item WHERE category = $1', [category]);
        res.status(200).json(result.rows);
    }
    catch (err) {
        console.error('Error getItemsByCategory', err);
        res.status(500).json("Server Error" );
    }
}

//Get Default Toppings For an Item 
export const getDefaultToppings = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT t.topping_id, t.topping_name, it.quantity FROM item_topping it\n' +
                'JOIN topping t ON it.topping_id = t.topping_id JOIN item i ON it.item_id = i.item_id\n' +
                'WHERE i.item_id = $1', [id]);
        
        res.status(200).json(result.rows);
        } 
        catch (err) {
        console.error('Error getDefaultToppings', err);
        res.status(500).json("Item not found");
    }
}

//Delete item
export const deleteItem = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM item WHERE item_id=$1 RETURNING *', [id]);
        res.status(200).json(result.rows[0]);
    }
    catch (err) {
        console.error('Error deleteItem', err);
        res.status(500).json("Item not found");
    }
}

// Create a new item
export const createItem = async (req, res) => {
    try {
        const { item_name, category, price, item_img,active} = req.body;
        // Get the next available ID from the item_id sequence.
        const seqResult = await pool.query("SELECT MAX (item_id) as new_id FROM item");
        const newId = Number(seqResult.rows[0].new_id) + 1;
        console.log("New ID:", newId);

        const result = await pool.query(
            "INSERT INTO item (item_id, item_name, category, price, item_img, active) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
            [newId, item_name, category, price, item_img, active]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error('Error createItem', err);
        res.status(500).json("Server Error");
    }
}

// Update Specific Item
export const updateItem = async (req, res) => {
    const { id } = req.params;
    const { item_name, category, price, item_img, active } = req.body;
    try {
        const result = await pool.query('UPDATE item SET item_name=$1, category=$2, price=$3, item_img=$4, active=$5 WHERE item_id=$6 RETURNING *',
            [item_name, category, price, item_img, active, id]);
        res.status(200).json(result.rows[0]);
    } catch (err) {
        console.error('Error updateItem', err);
        res.status(500).json("Item not found");
    }
}

//Update item quantity
export const updateItemQuantity = async (req, res) => {
    const { id } = req.params;
    const { quantity } = req.body;
    try {
        const result = await pool.query('UPDATE item SET quantity=$1 WHERE item_id=$2 RETURNING *', [quantity, id]);
        res.status(200).json(result.rows);
        console.log(`Updating item ${id}: New Quantity = ${quantity}`);
    } catch (err) {
        console.error('Error updateItemQuantity', err);
        res.status(500).json("Item not found");
    }
}

