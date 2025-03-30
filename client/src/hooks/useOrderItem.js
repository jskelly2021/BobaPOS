import { useState, useEffect } from 'react';

// Maintains list of items added to the current order. Stores the order items in session storage for persistence.
const useOrderItem = () => {
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

    const clearOrder = () => {
        setOrderItems([]);
        localStorage.removeItem('orderItems');
    }

    return { orderItems, addToOrder, removeFromOrder, clearOrder };
}

export default useOrderItem;
