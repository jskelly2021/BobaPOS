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

//Create a get single topping by id function
export const getTopping = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM topping WHERE topping_id=$1', [id]);
        res.status(200).json(result.rows);
    }
    catch (err) {
        console.error('Error getTopping', err);
        res.status(500).json("Topping not found");
    }
}

