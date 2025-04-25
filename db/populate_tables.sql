\copy employee from 'db/csv/employees.csv' CSV HEADER
\copy orders from 'db/csv/orders.csv' CSV HEADER
\copy ingredient from 'db/csv/ingredients.csv' CSV HEADER
\copy item from 'db/csv/items.csv' CSV HEADER
\copy topping from 'db/csv/toppings.csv' CSV HEADER
\copy item_ingredient from 'db/csv/item_ingredients.csv' CSV HEADER
\copy item_topping from 'db/csv/item_toppings.csv' CSV HEADER
\copy topping_ingredient from 'db/csv/topping_ingredients.csv' CSV HEADER
\copy order_item from 'db/csv/order_items.csv' CSV HEADER
\copy order_item_topping from 'db/csv/order_item_toppings.csv' CSV HEADER
\copy daily_summary from 'db/csv/daily_summary.csv' CSV HEADER
\copy daily_item_sales from 'db/csv/daily_item_sales.csv' CSV HEADER
\copy daily_ingredient_usage from 'db/csv/daily_ingredient_usage.csv' CSV HEADER
\copy weather_location from 'db/csv/weather_location.csv' CSV HEADER

SELECT setval('orders_order_id_seq', COALESCE((SELECT MAX(order_id) FROM orders), 1), true);
SELECT setval('order_item_order_item_id_seq', COALESCE((SELECT MAX(order_item_id) FROM order_item), 1), true);
