import { useState } from 'react';

const useOrderItems = () => {
    const [orderItems, setOrderItems] = useState([]);

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

    return { orderItems, addToOrder, removeFromOrder };
}

export default useOrderItems;
