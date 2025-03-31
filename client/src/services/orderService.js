import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

// Inserts into the orders table
export const insertOrders = async (price, order_date, cashier_id, payment_method, tip) => {
    const updateURL = `${API_BASE_URL}/orders/`;

    try {
        const { data } = await axios.post(updateURL, {price: price, order_date: order_date, cashier_id: cashier_id, 
                                        payment_method: payment_method, tip: tip});
        return data;
    } catch (e) {
        throw new Error(`Failed to insert order ${e.message}`);
    }
}

// Inserts into the orders items table
export const insertOrdersItems = async (order_id, item_id, quantity) => {
    const updateURL = `${API_BASE_URL}/orders/item`;

    try {
        const { data } = await axios.post(updateURL, {order_id: order_id, item_id: item_id, quantity: quantity});
        return data;
    } catch (e) {
        throw new Error(`Failed to insert order item ${e.message}`);
    }
}

// Inserts into the orders table
export const insertOrdersItemTopping = async (order_item_id, topping_id , topping_quantity) => {
    const updateURL = `${API_BASE_URL}/orders/itemtopping`;

    try {
        const { data } = await axios.post(updateURL, {order_item_id: order_item_id, topping_id: topping_id, 
                                        topping_quantity: topping_quantity});
        return data;
    } catch (e) {
        throw new Error(`Failed to insert order item topping ${e.message}`);
    }
}
