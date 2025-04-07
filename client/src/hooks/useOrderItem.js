import { useState, useEffect } from 'react';
import { insertOrders, insertOrdersItems, insertOrdersItemTopping } from '../services/orderService';
import { useNavigate } from 'react-router-dom';

// Maintains list of items added to the current order. Stores the order items in session storage for persistence.
const useOrderItem = () => {
    const nav = useNavigate();

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

    const placeOrder = (price, paymentMethod, tip) => {
        
        insertOrders(price, new Date().toISOString(), 1, paymentMethod, tip);
        
        setOrderItems([]);
        localStorage.removeItem('orderItems');

        nav('/menu');
    }

    return { orderItems, addToOrder, removeFromOrder, orderPrice, placeOrder };
}

export default useOrderItem;
