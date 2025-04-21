CREATE TABLE employee (
    employee_id SERIAL PRIMARY KEY,
    employee_name VARCHAR(255) NOT NULL,
    position VARCHAR(255) NOT NULL,
    passwords VARCHAR(255) NOT NULL
);

CREATE TABLE orders (
    order_id SERIAL PRIMARY KEY,
    price DECIMAL(10, 2) NOT NULL,
    order_date TIMESTAMP NOT NULL,
    cashier_id INT NOT NULL,
    payment_method VARCHAR(255) NOT NULL,
    tip DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (cashier_id) REFERENCES employee(employee_id)
);

CREATE TABLE item (
    item_id SERIAL PRIMARY KEY,
    item_name VARCHAR(255) NOT NULL,
    category VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    calories INT NOT NULL,
    item_img VARCHAR(255) NOT NULL,
    active INT NOT NULL
);

CREATE TABLE topping (
    topping_id SERIAL PRIMARY KEY,
    topping_name VARCHAR(255) NOT NULL,
    calories INT NOT NULL
);

CREATE TABLE ingredient (
    ingredient_id SERIAL PRIMARY KEY,
    ingredient_name VARCHAR(255) NOT NULL,
    category VARCHAR(255) NOT NULL,
    quantity DECIMAL(10, 2) NOT NULL
);

CREATE TABLE order_item (
    order_item_id SERIAL PRIMARY KEY,
    order_id INT NOT NULL,
    item_id INT NOT NULL,
    quantity INT NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(order_id),
    FOREIGN KEY (item_id) REFERENCES item(item_id)
);

CREATE TABLE order_item_topping (
    order_item_id INT NOT NULL,
    topping_id INT NOT NULL,
    topping_quantity VARCHAR(255) NOT NULL,
    FOREIGN KEY (order_item_id) REFERENCES order_item(order_item_id),
    FOREIGN KEY (topping_id) REFERENCES topping(topping_id)
);

CREATE TABLE item_ingredient (
    item_id INT NOT NULL,
    ingredient_id INT NOT NULL,
    quantity DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (item_id) REFERENCES item(item_id),
    FOREIGN KEY (ingredient_id) REFERENCES ingredient(ingredient_id)
);

CREATE TABLE topping_ingredient (
    topping_id INT NOT NULL,
    ingredient_id INT NOT NULL,
    quantity DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (topping_id) REFERENCES topping(topping_id),
    FOREIGN KEY (ingredient_id) REFERENCES ingredient(ingredient_id)
);

CREATE TABLE item_topping (
    item_id INT NOT NULL,
    topping_id INT NOT NULL,
    quantity VARCHAR(255) NOT NULL,
    FOREIGN KEY (item_id) REFERENCES item(item_id),
    FOREIGN KEY (topping_id) REFERENCES topping(topping_id)
);

CREATE TABLE daily_summary (
    total_orders INT NOT NULL DEFAULT 0,
    total_sales DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    total_card_sales DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    total_mobile_sales DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    total_cash_sales DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    total_tips DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    total_tax DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    total_items_sold INT NOT NULL DEFAULT 0
);

CREATE TABLE daily_item_sales (
    item_id INT NOT NULL,
    sales_count INT NOT NULL DEFAULT 0
);

CREATE TABLE daily_ingredient_usage (
    ingredient_id INT NOT NULL,
    usage DECIMAL(10, 2) NOT NULL DEFAULT 0
);
