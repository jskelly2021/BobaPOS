import csv
import random
import datetime
import pandas as pd

# === PARAMETERS ===
NUM_DAYS                        = 294  # 40 weeks
SALES_TARGET                    = 750000
AVERAGE_ORDER_AMOUNT            = 9
PEAK_DAYS                       = ["2024-08-26", "2024-10-26"]
EMPLOYEES                       = [9,10,11,12,13,14,15,16,17,18,19,20]
PAYMENT_METHODS                 = ["CASH", "CARD", "MOBILE"]
TOPPING_QUANTITIES              = ["light", "regular", "heavy"]
TIP_PERCENTAGES                 = [0.00, 0.10, 0.13, 0.15, 0.18]
STORE_OPEN                      = 9
STORE_CLOSE                     = 22


# === FILE PATHS ===
ITEMS_PATH                      = "db/csv/items.csv"
TOPPINGS_PATH                   = "db/csv/toppings.csv"
INGREDIENT_PATH                 = "db/csv/ingredients.csv"
ITEM_TOPPINGS_PATH              = "db/csv/item_toppings.csv"
ORDERS_PATH                     = "db/csv/orders.csv"
ORDER_ITEMS_PATH                = "db/csv/order_items.csv"
ORDER_ITEM_TOPPINGS_PATH        = "db/csv/order_item_toppings.csv"
DAILY_INGREDIENT_USAGE_PATH     = "db/csv/daily_ingredient_usage.csv"
DAILY_ITEM_SALES_PATH           = "db/csv/daily_item_sales.csv"
WEATHER_LOCATION_PATH           = "db/csv/weather_location.csv"


# === LOAD DATA ===
items_df = pd.read_csv(ITEMS_PATH)
ingredients_df = pd.read_csv(INGREDIENT_PATH)
toppings_df = pd.read_csv(TOPPINGS_PATH)
item_toppings_df = pd.read_csv(ITEM_TOPPINGS_PATH)

items = list(zip(items_df['item_id'], items_df['item_name'], items_df['category'], items_df['price']))
ingredients = list(ingredients_df['ingredient_id'])
topping_prices = dict(zip(toppings_df['topping_id'], toppings_df['price']))

# Default Topping Map
default_toppings = {}
for _, row in item_toppings_df.iterrows():
    default_toppings.setdefault(row['item_id'], []).append(row['topping_id'])



# === DATA GENERATION ===
start_date = datetime.date.today() - datetime.timedelta(days=NUM_DAYS)
now = datetime.datetime.now()

order_id = 1
order_item_id = 1

with open(ORDERS_PATH, mode="w", newline="") as orders_file, \
     open(ORDER_ITEMS_PATH, mode="w", newline="") as order_items_file, \
     open(ORDER_ITEM_TOPPINGS_PATH, mode="w", newline="") as order_item_toppings_file, \
     open(DAILY_INGREDIENT_USAGE_PATH, mode="w", newline="") as daily_ingredient_usage_file, \
     open(DAILY_ITEM_SALES_PATH, mode="w", newline="") as daily_item_sales_file, \
     open(WEATHER_LOCATION_PATH, mode="w", newline="") as weather_location_file:


    orders_writer = csv.writer(orders_file)
    order_items_writer = csv.writer(order_items_file)
    order_item_toppings_writer = csv.writer(order_item_toppings_file)
    ingredient_usage_writer = csv.writer(daily_ingredient_usage_file)
    item_sales_writer = csv.writer(daily_item_sales_file)
    weather_location_writer = csv.writer(weather_location_file)

    # Write csv Headers
    orders_writer.writerow(["order_id", "price", "order_date", "cashier", "payment_method", "tip"])
    order_items_writer.writerow(["order_item_id", "order_id", "item_id", "quantity"])
    order_item_toppings_writer.writerow(["order_item_id", "topping_id", "topping_quantity"])
    ingredient_usage_writer.writerow(["ingredient_id", "usage"])
    item_sales_writer.writerow(["item_id", "sales_count"])
    weather_location_writer.writerow(["country_name", "country_code", "region_name", "region_code", "city_name"])

    # Init Daily Tables
    for ingredient in ingredients:
        ingredient_usage_writer.writerow([ingredient, 0.00])

    for item in items:
        item_sales_writer.writerow([item[0], 0])

    # Main Loop
    for day_offset in range(NUM_DAYS + 1):
        current_date = start_date + datetime.timedelta(days=day_offset)
        is_today = current_date == datetime.date.today()

        if current_date > datetime.date.today():
            break

        num_orders = random.randint(300, 600) if current_date.strftime("%Y-%m-%d %H:%M:%S") in PEAK_DAYS else random.randint(100, 300)

        for _ in range(num_orders):
            # Generate a random time for the order between the store hours
            hour = random.randint(STORE_OPEN, now.hour if is_today else STORE_CLOSE)
            if is_today and hour == now.hour:
                minute = random.randint(0, now.minute)
                second = random.randint(0, now.second)
            else:
                minute = random.randint(0, 59)
                second = random.randint(0, 59)

            order_time = datetime.datetime.combine(current_date, datetime.time(hour, minute, second))
            if order_time > now:
                continue

            date_str = date_str = order_time.strftime("%Y-%m-%d %H:%M:%S")
            total_price = 0.0
            cashier = random.choice(EMPLOYEES)
            payment_method = random.choice(PAYMENT_METHODS)

            # Select Items
            num_items = random.randint(1, 3)
            items_selected = random.sample(items, num_items)

            for item in items_selected:
                item_id, _, _, item_price = item
                quantity = random.randint(1, 3)
                item_total = item_price * quantity

                for topping_id in default_toppings.get(item_id, []):
                    topping_price = topping_prices.get(topping_id, 0.0)
                    item_total += topping_price * quantity
                    order_item_toppings_writer.writerow([order_item_id, topping_id, random.choice(TOPPING_QUANTITIES)])

                total_price += round(item_total, 2)
                order_items_writer.writerow([order_item_id, order_id, item_id, quantity])
                order_item_id += 1

            orders_writer.writerow([order_id, round(total_price, 2), date_str, cashier, payment_method, round(total_price * random.choice(TIP_PERCENTAGES), 2)])
            order_id += 1

print("CSV generation complete")
