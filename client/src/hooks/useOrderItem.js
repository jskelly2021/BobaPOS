import { useState, useEffect } from 'react';
import { insertOrders, insertOrdersItems, insertOrdersItemTopping } from '../services/orderService';

// Maintains list of items added to the current order. Stores the order items in session storage for persistence.
const useOrderItem = (nav) => {
    const [orderItems, setOrderItems] = useState(() => {
        const storedOrder = sessionStorage.getItem('orderItems');
        console.log("Stored order data:", storedOrder);
        return storedOrder ? JSON.parse(storedOrder) : [];
    });

    useEffect(() => {
        sessionStorage.setItem('orderItems', JSON.stringify(orderItems));
    }, [orderItems]);

    const addToOrder = (item) => {
        const uniqueItem = {
            ...item,
            orderItemId: Date.now()
        }

        console.log(`Adding Item: ${uniqueItem.orderItemId} - ${uniqueItem.item_name} `);
        setOrderItems((prevOrder) => [...prevOrder, uniqueItem]);
    }

    const removeFromOrder = (item) => {
        console.log(`Removing Item: ${item.orderItemId} - ${item.item_name}`);
        setOrderItems((prevOrder) => prevOrder.filter(i => i.orderItemId !== item.orderItemId))
    }

    const orderPrice = () => {
        const total = orderItems.reduce((subtotal, item) => subtotal + parseFloat(item.price), 0);
        return parseFloat(total).toFixed(2);
    }

    const placeOrder = async (price, paymentMethod, tip) => {
        const order_id = await insertOrders(price, new Date().toISOString(), 1, paymentMethod, tip);

        for (const item of orderItems) {
            const orderItemId = await insertOrdersItems(order_id, item.item_id, 100);

            if (item.toppings && item.toppings.length > 0) {
                for (const topping of item.toppings) {
                    await insertOrdersItemTopping(orderItemId, topping.topping_id, "1");
                    console.log(`Saved topping ${topping.topping_name} for item ${item.item_name}`);
                }
            }
        }

        setOrderItems([]);
        sessionStorage.removeItem('orderItems'); // this should be sessionStorage, not localStorage
    }

    return { orderItems, addToOrder, removeFromOrder, orderPrice, placeOrder };
}

export default useOrderItem;
