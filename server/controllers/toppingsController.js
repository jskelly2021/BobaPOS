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
 main
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
export const updateToppingQuantity = async (req, res) => {
    const { id } = req.params;
    const { quantity } = req.body;
    try {
        const result = await pool.query('UPDATE topping SET quantity=$1 WHERE topping_id=$2 RETURNING *', [quantity, id]);
        res.status(200).json(result.rows);
        console.log(`Updating topping ${id}: New Quantity = ${quantity}`);
    }
    catch (err) {
        console.error('Error updateToppingQuantity', err);
        res.status(500).json("Server Error");
    }
}

