-- DEMOED 1. Get ingredients in Coffee Milk Tea 
SELECT item.item_name, ingredient.ingredient_name
FROM item
INNER JOIN item_ingredient ON item.item_id = item_ingredient.item_id
INNER JOIN ingredient ON item_ingredient.ingredient_id = ingredient.ingredient_id
WHERE item.item_name = 'Coffee Milk Tea';

-- 2. Get toppings on Thai Pearl Milk Tea
SELECT t.topping_id, t.topping_name, it.quantity
FROM item_topping it
JOIN topping t ON it.topping_id = t.topping_id
JOIN item i ON it.item_id = i.item_id
WHERE i.item_name = 'Thai Pearl Milk Tea';

-- DEMOED 3. Get items in the Fruit category
SELECT item.item_name 
FROM item 
WHERE category='Fruit Tea';

-- DEMOED 4. Get items in an order with id = 1
SELECT item.item_name, order_item.quantity
FROM item
INNER JOIN order_item
ON item.item_id = order_item.item_id
WHERE order_item.order_id = 1;

-- 5. Get total price of an order
SELECT price FROM orders WHERE order_id=x;

-- 6. Get list of all cashiers
SELECT * FROM employee WHERE position = 'cashier';

-- 7. Get employee ID based on name
SELECT employee_id FROM employee where employee_name = 'Elon Musk';

-- DEMOED 8. Get all orders for a cashier
SELECT employee.employee_name, orders.order_id, orders.order_date
FROM employee
INNER JOIN orders ON employee.employee_id = orders.cashier_id
WHERE employee.employee_name = 'Lebron James';

-- 9. Add quantity to an ingredient
UPDATE ingredient
SET quantity = 10
WHERE ingredient_name = 'Black Tea';

-- 10. Sales per Week
SELECT DATE_TRUNC('week', order_date) AS week_start, SUM(price) AS total_sales
FROM orders
GROUP BY week_start
ORDER BY week_start;

-- 11. Orders per month
SELECT DATE_TRUNC('month', order_date) AS month_start, COUNT(*) AS total_orders
FROM orders
GROUP BY month_start;

-- DEMO 12. Special Query #1: Weekly Sales History
SELECT COUNT(*) AS total_orders
FROM orders
WHERE DATE_TRUNC('week', order_date) = DATE_TRUNC('week', TIMESTAMP '2025-01-19'); 

-- DEMO 13. Special Query #2: Realistic Sales History
SELECT COUNT(*) AS total_orders, SUM(price) AS total_sales
FROM orders
WHERE EXTRACT('hour' FROM order_date) = 12;

-- DEMO 14. Special Query #3: Peak Sales Day
SELECT DATE(order_date) as order_day, COUNT(order_id) as order_count, SUM(price) as total_sales
FROM orders
GROUP BY order_day
ORDER BY total_sales DESC
LIMIT 10;

-- 15. Update items price
UPDATE item
SET price = ?
WHERE item_id = ?;

-- 16. Place an order
INSERT INTO orders (price, order_date, cashier_id, payment_method)
VALUES (80.19, '2025-02-24 00:00:00', 1, 'CARD');

-- 17. Add an item to an order
INSERT INTO order_item (order_id, item_id, quantity)
VALUES (2, 1, 3);

-- 18. Add a topping to an item in an order
INSERT INTO order_item_topping (order_item_id, topping_id)
VALUES (1, 1);

-- 19. Create a new item
INSERT INTO item (item_name, category, price)
VALUES ('Classic Boba Tea', 'BOBA', 11.75);

-- 20. Create a new employee
INSERT INTO employee (employee_name, position)
VALUES ('Throckmorton', 'CASHIER');

-- Get last 10 Orders
SELECT * FROM orders ORDER BY order_date DESC LIMIT 10;

-- Get Items in order
SELECT item.item_name, order_item.quantity
FROM item
INNER JOIN order_item
ON item.item_id = order_item.item_id
WHERE order_item.order_id = 55743;

-- See all items
SELECT * FROM item;

-- See all ingredients
SELECT * FROM ingredient;

-- See all employees
SELECT * FROM employee;

-- Given an item, add ingredient quantity to ingredient usage
UPDATE daily_ingredient_usage diu
SET usage = usage + ii.quantity
FROM item_ingredient ii
WHERE diu.ingredient_id = ii.ingredient_id
AND ii.item_id = ?;

-- Given a topping, add ingredient quantity to ingredient usage
UPDATE daily_ingredient_usage diu
SET usage = usage + ti.quantity
FROM topping_ingredient ti
WHERE diu.ingredient_id = ti.ingredient_id
AND ti.topping_id = ?;

-- Given a start and end date and ingredient, get ingredient usage over that interval for all items
SELECT DATE_TRUNC('month', o.order_date) AS period, SUM(ii.quantity * oi.quantity) AS usage
FROM ingredient i
JOIN item_ingredient ii ON i.ingredient_id = ii.ingredient_id
JOIN item it ON ii.item_id = it.item_id
JOIN order_item oi ON it.item_id = oi.item_id
JOIN order o ON oi.order_id = o.order_id
WHERE i.ingredient_id = ? AND o.order_date BETWEEN ? and ?
GROUP BY period
ORDER BY period;

-- Given a start and end date and ingredient, get ingredient usage over that interval for all toppings
SELECT DATE_TRUNC('month', o.order_date) AS period, SUM(ti.quantity) AS usage
FROM ingredient i
JOIN topping_ingredient ti ON i.ingredient_id = ti.ingredient_id
JOIN topping t ON ti.topping_id = t.topping_id
JOIN order_item_topping oit ON t.topping_id = oit.topping_id
JOIN order_item oi ON oit.order_item_id = oi.order_item_id
JOIN orders o ON oi.order_id = o.order_id
WHERE i.ingredient_id = ? AND o.order_date BETWEEN ? AND ?
GROUP BY period
ORDER BY period;

-- Combined Query
SELECT DATE_TRUNC('month', o.order_date) AS period, SUM(usage) AS total_usage
FROM (
    SELECT o.order_date, ii.quantity * oi.quantity AS usage
    FROM ingredient i
    JOIN item_ingredient ii ON i.ingredient_id = ii.ingredient_id
    JOIN item it ON ii.item_id = it.item_id
    JOIN order_item oi ON it.item_id = oi.item_id
    JOIN orders o ON oi.order_id = o.order_id
    WHERE i.ingredient_id = ? AND o.order_date BETWEEN ? AND ?
    UNION ALL
    SELECT o.order_date, ti.quantity AS usage
    FROM ingredient i
    JOIN topping_ingredient ti ON i.ingredient_id = ti.ingredient_id
    JOIN topping t ON ti.topping_id = t.topping_id
    JOIN order_item_topping oit ON t.topping_id = oit.topping_id
    JOIN order_item oi ON oit.order_item_id = oi.order_item_id
    JOIN orders o ON oi.order_id = o.order_id
    WHERE i.ingredient_id = ? AND o.order_date BETWEEN ? AND ?
) AS combined_usage
GROUP BY period
ORDER BY period;
