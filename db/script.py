import csv
import random
import datetime
import pandas as pd

# PARAMETERS
num_days = 294  # 40 weeks
total_sales_target = 750000  # Total revenue target
average_order_amount = 9  # Average order price
num_transactions = int(total_sales_target / average_order_amount)  # Approx. orders
peak_days = ["2024-08-26","2024-10-26"]  # Example semester start date -- PEAK DATE

# FILE PATHS for loading
items_csv_path = "db/csv/items.csv"
toppings_csv_path = "db/csv/toppings.csv"
ingredients_csv_path = "db/csv/ingredients.csv"
item_toppings_csv_path = "db/csv/item_toppings.csv"
weather_location_csv_path = "db/csv/weather_location.csv"

# FILE PATHS for CSV output
orders_csv_path = "db/csv/orders.csv"
order_items_csv_path = "db/csv/order_items.csv"
order_item_toppings_csv_path = "db/csv/order_item_toppings.csv"
daily_ingredient_usage_csv_path = "db/csv/daily_ingredient_usage.csv"
daily_item_sales_csv_path = "db/csv/daily_item_sales.csv"

# EMPLOYEES (Cashiers)
employees = [9,10,11,12,13,14,15,16,17,18,19,20]

# PAYMENT METHODS
payment_methods = ["CASH", "CARD", "MOBILE"]

# TOPPING QUANTITIES
topping_quantities = ["light", "regular", "heavy"]

# TIP PERCENTAGES
tip_percentages = [0.00, 0.10, 0.13, 0.15, 0.18]

# LOAD CSVs
items_df = pd.read_csv(items_csv_path)
ingredients_df = pd.read_csv(ingredients_csv_path)
toppings_df = pd.read_csv(toppings_csv_path)
item_toppings_df = pd.read_csv(item_toppings_csv_path)

items = list(zip(items_df['item_id'], items_df['item_name'], items_df['category'], items_df['price']))
ingredients = list(ingredients_df['ingredient_id'])
toppings = list(zip(toppings_df['topping_id'], toppings_df['topping_name']))

# DEFAULT TOPPINGS
default_toppings = {}
for index, row in item_toppings_df.iterrows():
    item_id = row['item_id']
    topping_id = row['topping_id']

    if item_id not in default_toppings:
        default_toppings[item_id] = []

    default_toppings[item_id].append(topping_id)

# Create CSV files and write headers
with open(orders_csv_path, mode="w", newline="") as orders_file, \
     open(order_items_csv_path, mode="w", newline="") as order_items_file, \
     open(order_item_toppings_csv_path, mode="w", newline="") as order_item_toppings_file, \
     open(daily_ingredient_usage_csv_path, mode="w", newline="") as daily_ingredient_usage_file, \
     open(daily_item_sales_csv_path, mode="w", newline="") as daily_item_sales_file, \
     open(weather_location_csv_path, mode="w", newline="") as weather_location_file:

    orders_writer = csv.writer(orders_file)
    orders_writer.writerow(["order_id", "price", "order_date", "cashier_id", "payment_method", "tip"])

    order_items_writer = csv.writer(order_items_file)
    order_items_writer.writerow(["order_item_id", "order_id", "item_id", "quantity"])

    order_item_toppings_writer = csv.writer(order_item_toppings_file)
    order_item_toppings_writer.writerow(["order_item_id", "topping_id", "topping_quantity"])

    ingredient_usage_writer = csv.writer(daily_ingredient_usage_file)
    ingredient_usage_writer.writerow(["ingredient_id", "usage"])

    item_sales_writer = csv.writer(daily_item_sales_file)
    item_sales_writer.writerow(["item_id", "sales_count"])

    weather_location_writer = csv.writer(weather_location_file)
    weather_location_writer.writerow(["country_name", "country_code", "region_name", "region_code", "city_name"])

    start_date = datetime.date.today() - datetime.timedelta(days=num_days)
    order_id = 1
    order_item_id = 1

    # POPULATE ingredient_usage
    for ingredient in ingredients:
        ingredient_usage_writer.writerow([ingredient, 0.00])

    # POPULATE item_sales
    for item in items:
        item_sales_writer.writerow([item[0], 0])

    for day_offset in range(num_days + 1):
        current_date = start_date + datetime.timedelta(days=day_offset)

        #date_str = current_date.strftime("%Y-%m-%d %H:%M:%S")  # Format date as string
        num_orders = random.randint(300, 600) if current_date.strftime("%Y-%m-%d %H:%M:%S") in peak_days else random.randint(100, 300)

        for _ in range(num_orders):
            total_price = 0  # Total price for the order
            cashier_id = random.choice(employees)
            payment_method = random.choice(payment_methods)

            # Generate a random time for the order between 9:00 AM - 10:00 PM
            hour = random.randint(9, 22)  # 9 AM to 10 PM
            minute = random.randint(0, 59)
            second = random.randint(0, 59)

            # Combine date and time into a single datetime string
            date_str = current_date.strftime(f"%Y-%m-%d {hour:02d}:{minute:02d}:{second:02d}")

            num_items = random.randint(1, 3)
            items_selected = random.sample(items, num_items)

            for item in items_selected:
                item_id, item_name, item_category, item_price = item
                quantity = random.randint(1, 3)  # Each item appears 1-3 times in an order
                total_price += round(item_price * quantity, 2)

                if item_id in default_toppings:
                    for topping_id in default_toppings[item_id]:
                        topping_quantity = random.choice(topping_quantities)
                        order_item_toppings_writer.writerow([order_item_id, topping_id, topping_quantity])

                order_items_writer.writerow([order_item_id, order_id, item_id, quantity])
                order_item_id += 1

            orders_writer.writerow([order_id, round(total_price, 2), date_str, cashier_id, payment_method, round(total_price * random.choice(tip_percentages), 2)])
            order_id += 1

print(f"CSV files '{orders_csv_path}', '{order_items_csv_path}', '{order_item_toppings_csv_path}', "
        f"'{daily_ingredient_usage_csv_path}', '{daily_item_sales_csv_path}', and '{weather_location_csv_path}' generated successfully.")
