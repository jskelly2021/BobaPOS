import { useState, useEffect, useContext } from 'react';
import { insertOrders, insertOrdersItems, insertOrdersItemTopping } from '../services/orderService';
import { AuthContext } from '../context/AuthContext';

// Maintains list of items added to the current order. Stores the order items in session storage for persistence.
const useOrderItem = () => {
    const [orderItems, setOrderItems] = useState(() => {
        const storedOrder = sessionStorage.getItem('orderItems');
        return storedOrder ? JSON.parse(storedOrder) : [];
    });
    const [nextOrderItemId, setNextOrderItemId] = useState(1);
    const [orderItemPrice, setOrderItemPrice] = useState();
    const {user} = useContext(AuthContext);
    const userID = user ? user.employee_id : 1;

    useEffect(() => {
        sessionStorage.setItem('orderItems', JSON.stringify(orderItems));
    }, [orderItems]);

    const addToOrder = (item) => {
        const uniqueItem = {
            ...item,
            orderItemPrice: orderItemPrice,
            orderItemId: nextOrderItemId
        }
        setNextOrderItemId(prev => prev + 1);
        setOrderItems((prevOrder) => [...prevOrder, uniqueItem]);
    }

    const removeFromOrder = (item) => {
        setOrderItems((prevOrder) => prevOrder.filter(i => i.orderItemId !== item.orderItemId))
    }

    const updateItemInOrder = (item) => {
        setOrderItems((prevOrder) =>
            prevOrder.map(i =>
                i.orderItemId === item.orderItemId ? item : i
            )
        );
    }

    const orderPrice = () => {
        const total = orderItems.reduce((subtotal, item) => subtotal + parseFloat(item.priceWithToppings * item.quantity), 0);
        return parseFloat(total).toFixed(2);
    }

    const placeOrder = async (price, paymentMethod, tip) => {
        const order_id = await insertOrders(price, new Date().toISOString(), userID, paymentMethod, tip);

        for (const item of orderItems) {
            const orderItemId = await insertOrdersItems(order_id, item.item_id, item.quantity);

            if (item.toppings && item.toppings.length > 0) {
                for (const topping of item.toppings) {
                    await insertOrdersItemTopping(orderItemId, topping);
                }
            }
        }

        cancelOrder();
    }

    const cancelOrder = () => {
        setOrderItems([]);
        sessionStorage.setItem('orderItems', JSON.stringify([]));
    } 

    return { orderItems, addToOrder, removeFromOrder, updateItemInOrder, orderPrice, placeOrder, cancelOrder };
}

export default useOrderItem;
