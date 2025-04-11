
import pool from "../config/database.js";

// Get Top Selling Products
export const getTopSellingProducts = async (req, res) => {
    const { limit } = req.query;
    try {
        const result = await pool.query(
            "SELECT i.item_name, SUM(oi.quantity) AS total_sold " +
                "FROM order_item oi " +
                "JOIN item i ON oi.item_id = i.item_id " +
                "GROUP BY i.item_name " +
                "ORDER BY total_sold DESC " +
                "LIMIT $1",
            [limit] // Use the limit from the query parameters

            
        );
        res.status(200).json(result.rows);
    } catch (err) {
        console.error("Error getTopSellingProducts", err);
        res.status(500).json("Server Error");
    }
}

// Get Sales Over Days
export const getSalesOverDays = async (req, res) => {
    const { start, end } = req.body;
  
    const sql = `
        SELECT date_trunc('day', order_date) AS period, 
                SUM(price) AS total_sales
        FROM orders
        WHERE order_date BETWEEN $1 AND $2
        GROUP BY period
        ORDER BY period
    `;

    try {
        const result = await pool.query(sql, [start, end]);
        res.status(200).json(result.rows);
    } catch (err) {
        console.error('Error fetching sales over days:', err);
        res.status(500).json("Server Error");
    }
  }

// Get sales during a given day
export const getSalesDuringDay = async (req, res) => {
    const { start, end } = req.body;
    try {
        const result = await pool.query(
            "SELECT date_trunc('hour', order_date) AS period, SUM(price) AS total_sales " +
                    "FROM orders " +
                    "WHERE order_date BETWEEN $1 AND $2 " +
                    "GROUP BY period " +
                    "ORDER BY period"
        , [start, end]);
        res.status(200).json(result.rows[0]);
    } catch (err) {
        console.error('Error fetching sales today:', err);
        res.status(500).json("Server Error");
    }
}

// Get sales over weeks
export const getSalesDuringWeek = async (req, res) => {
    const { start, end } = req.body;
    try {
        const result = await pool.query(
            "SELECT date_trunc('week', order_date) AS period, SUM(price) AS total_sales " +
                    "FROM orders " +
                    "WHERE order_date BETWEEN $1 AND $2 " +
                    "GROUP BY period " +
                    "ORDER BY period"
        , [start, end]);
      res.status(200).json(result.rows[0]);
    } catch (err) {
        console.error('Error fetching sales today:', err);
        res.status(500).json("Server Error");
    }
}

// Get sales over months 
export const getSalesDuringMonth = async (req, res) => {
    const { start, end } = req.body;
    try {
        const result = await pool.query(
            "SELECT date_trunc('month', order_date) AS period, SUM(price) AS total_sales " +
                    "FROM orders " +
                    "WHERE order_date BETWEEN $1 AND $2 " +
                    "GROUP BY period " +
                    "ORDER BY period"
        , [start, end]);
        res.status(200).json(result.rows[0]);
    } catch (err) {
        console.error('Error fetching sales today:', err);
        res.status(500).json("Server Error");
    }
}

/**
 * Retrieves the daily totals from the daily summary.
 * 
 * @return a DailyTotal object populated with the totals from the daily summary
 */
export const getTotals = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM daily_summary");
        if (result.rows.length > 0) {
            res.status(200).json(result.rows[0]);
        }
        else {
            res.status(200).json(null);
        }
    } catch (err) {
        console.error("Error retrieving sales from daily summary:", err);
        res.status(500).json("Server Error");
    }
};

// Get Daily Item Sales
export const getItemSales = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM daily_item_sales");
        const itemSales = {};
        result.rows.forEach(row => {
            itemSales[row.item_id] = row.sales_count;
        });
        res.status(200).json(itemSales);
    } catch (err) {
        console.error("Error retrieving sales from daily item sales:", err);
        res.status(500).json("Server Error");
    }
};

// Get Ingredient Usage
export const getIngredientUsage = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM daily_ingredient_usage");
        const itemSales = {};
        result.rows.forEach(row => {
            itemSales[row.item_id] = row.sales_count;
        });
        res.status(200).json(itemSales);
    } catch (err) {
        console.error("Error retrieving sales from daily ingredient usage:", err);
        res.status(500).json("Server Error");
    }
};

// Helper function to reset daily_summary
const resetDailySummary = async (req, res) => {
    try {
        const sql = `
        UPDATE daily_summary SET 
            total_orders = 0, 
            total_sales = 0.00, 
            total_card_sales = 0.00, 
            total_mobile_sales = 0.00, 
            total_cash_sales = 0.00, 
            total_tips = 0.00, 
            total_tax = 0.00, 
            total_items_sold = 0
        `;
        const result = await pool.query(sql);
        res.status(200).json(result.rows);
        console.log("Daily summary reset successfully");
    } catch (err) {
        console.error("Error resetting daily_summary:", err);
        throw new Error("Failed to reset daily_summary");
    }
};

// Helper function to reset daily_item_sales
const resetDailyItemSales = async (req, res) => {
    try {
        const sql = `UPDATE daily_item_sales SET sales_count = 0;`;
        const result = await pool.query(sql);
        res.status(200).json(result.rows);
        console.log("Daily item sales reset successfully");
    } catch (err) {
        console.error("Error resetting daily_item_sales:", err);
        throw new Error("Failed to reset daily_item_sales");
    }
};

// Helper function to reset daily_ingredient_usage
const resetDailyIngredientUsage = async (req, res) => {
    try {
        const sql = `UPDATE daily_ingredient_usage SET usage = 0;`;
        const result = await pool.query(sql);
        res.status(200).json(result.rows);
        console.log("Daily ingredient usage reset successfully");
    } catch (err) {
        console.error("Error resetting daily_ingredient_usage:", err);
        throw new Error("Failed to reset daily_ingredient_usage");
    }
};

// Main endpoint to reset all totals
export const resetTotals = async (req, res) => {
    try {
        await resetDailySummary(req, res);
        await resetDailyItemSales(req, res);
        await resetDailyIngredientUsage(req, res);

        res.status(200).json("Totals reset successfully");
    } catch (err) {
        console.error("Trouble resetting totals:", err);
        res.status(500).json("Server Error: Trouble resetting totals");
    }
};

// Returns the usage for a given ingredient over a specified start and end time
export const getIngredientUsageOverTime = async (req, res) => {
    const { id, interval, start, end } = req.params;

    const allowedIntervals = ['hour', 'day', 'week', 'month'];
    if (!allowedIntervals.includes(interval)) {
        return res.status(400).json({ error: 'Invalid interval' });
    }

    const sql = `
        SELECT DATE_TRUNC('${interval}', combined_usage.order_date) AS period, SUM(combined_usage.usage) AS total_usage
        FROM (
            SELECT o.order_date, ii.quantity * oi.quantity AS usage
            FROM ingredient i
            JOIN item_ingredient ii ON i.ingredient_id = ii.ingredient_id
            JOIN item it ON ii.item_id = it.item_id
            JOIN order_item oi ON it.item_id = oi.item_id
            JOIN orders o ON oi.order_id = o.order_id
            WHERE i.ingredient_id = $1 AND o.order_date BETWEEN $2 AND $3

            UNION ALL

            SELECT o.order_date, ti.quantity AS usage
            FROM ingredient i
            JOIN topping_ingredient ti ON i.ingredient_id = ti.ingredient_id
            JOIN topping t ON ti.topping_id = t.topping_id
            JOIN order_item_topping oit ON t.topping_id = oit.topping_id
            JOIN order_item oi ON oit.order_item_id = oi.order_item_id
            JOIN orders o ON oi.order_id = o.order_id
            WHERE i.ingredient_id = $1 AND o.order_date BETWEEN $2 AND $3
        ) AS combined_usage
        GROUP BY period
        ORDER BY period;
    `;
    try {
        const result = await pool.query(sql, [id, start, end]);
        console.log({ id, start, end, interval });
        res.status(200).json(result.rows);
    } catch (err) {
        console.error("Error returning ingredient usage over time:", err);
        res.status(500).json("Failed to get ingredient usage over time");
    }
}
