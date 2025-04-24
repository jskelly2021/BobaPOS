import pool from '../config/database.js';

// Add to Order Table
export const addOrder = async (req, res) => {
    const { price, order_date, cashier_id, payment_method, tip } = req.body;
    try {
        const result = await pool.query(`INSERT INTO orders (price, order_date, cashier_id, payment_method, tip) 
                                     VALUES ($1, $2, $3, $4, $5) RETURNING order_id`, [price, order_date, cashier_id, payment_method, tip]);

        const order_id = result.rows[0].order_id

        // updating for z-report
        await pool.query(`
            UPDATE daily_summary
            SET 
              total_orders = total_orders + 1,
              total_sales = total_sales + $1,
              total_tips = total_tips + $2,
              total_tax = total_tax + ($1 * 0.0825),
              total_${payment_method.toLowerCase()}_sales = total_${payment_method.toLowerCase()}_sales + $1
          `, [price, tip]);

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

        // updating for z-report, update daily item sales
        await pool.query(`
            UPDATE daily_item_sales 
            SET sales_count = sales_count + $1 
            WHERE item_id = $2
        `, [quantity, item_id]);

        // Update ingredient usage from item_ingredient
        await pool.query(`
            UPDATE daily_ingredient_usage
            SET usage = usage + sub.ingredient_quantity * $1
            FROM (
                SELECT ingredient_id, quantity AS ingredient_quantity
                FROM item_ingredient
                WHERE item_id = $2
            ) AS sub
            WHERE daily_ingredient_usage.ingredient_id = sub.ingredient_id
        `, [quantity, item_id]);

        res.status(201).json({ order_item_id: result.rows[0].order_item_id });
        //console.log(`Inserting Order Items`);
    }

    catch (err) {
        console.error('Error addOrderItem', err); //check
        res.status(500).json("Server Error");
    }

}

// Add to Order Item Table
export const addOrderItemTopping = async (req, res) => {
    const quantityValues = {
        none: 0,
        light: 0.5,
        regular: 1,
        heavy: 1.5
    };

    const { order_item_id, topping_id, topping_quantity } = req.body;

    try {
        const result = await pool.query(
            `INSERT INTO order_item_topping (order_item_id, topping_id , topping_quantity)
             VALUES ($1, $2, $3) RETURNING *`,
            [order_item_id, topping_id, topping_quantity]
        );

        // Update ingredient usage from topping_ingredient
        await pool.query(`
            UPDATE daily_ingredient_usage
            SET usage = usage + sub.ingredient_quantity * $1
            FROM (
              SELECT ingredient_id, quantity AS ingredient_quantity
              FROM topping_ingredient
              WHERE topping_id = $2
            ) AS sub
            WHERE daily_ingredient_usage.ingredient_id = sub.ingredient_id
          `, [quantityValues[topping_quantity], topping_id]);

        res.status(201).json(result.rows);
    } catch (err) {
        console.error('Error addOrderItemTopping:', err);
        res.status(500).json("Server Error");
    }
}

