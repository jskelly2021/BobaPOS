import pool from '../config/database.js';

// Add to Order Table
export const addOrder = async (req, res) => {
    const { price, order_date, cashier_id, payment_method, tip } = req.body;
    try {
        const result = await pool.query(`INSERT INTO orders (price, order_date, cashier_id, payment_method, tip) 
                                     VALUES ($1, $2, $3, $4, $5) RETURNING order_id`, [price, order_date, cashier_id, payment_method, tip]);

        const order_id = result.rows[0].order_id
        res.status(201).json({ order_id });
        console.log(`Inserting New Order`);
    }
    catch (err) {
        console.error('Error addOrder', err);
        res.status(500).json("Server Error");
    }
}

// Add to Order Item Table
export const addOrderItem = async (req, res) => {
    const { order_id, item_id, quantity } = req.body;
    try {
        const result = await pool.query(`INSERT INTO order_item (order_id, item_id, quantity)
                                        VALUES ($1, $2, $3) RETURNING *`, [order_id, item_id, quantity]);
        res.status(201).json({ order_item_id: result.rows[0].order_item_id });
        console.log(`Inserting Order Items`);
    }
    catch (err) {
        console.error('Error addOrderItem', err);
        res.status(500).json("Server Error");
    }
}

// Add to Order Item Table
export const addOrderItemTopping = async (req, res) => {
    const { order_item_id, topping_id, topping_quantity } = req.body;

    console.log("addOrderItemTopping received:", req.body);

    try {
        const result = await pool.query(
            `INSERT INTO order_item_topping (order_item_id, topping_id , topping_quantity)
             VALUES ($1, $2, $3) RETURNING *`,
            [order_item_id, topping_id, topping_quantity]
        );
        res.status(201).json(result.rows);
        console.log(`Inserting Order Item Topping:`, result.rows[0]);
    } catch (err) {
        console.error('Error addOrderItemTopping:', err);
        res.status(500).json("Server Error");
    }
}

