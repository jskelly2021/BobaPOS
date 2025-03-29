import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import OrderMenu from '../components/OrderMenu'
import OrderCart from '../components/OrderCart';
import { fetchItems } from '../services/itemService';

function CashierMenu() {
    const [menuItems, setMenuItems] = useState([]);
    const [orderItems, setOrderItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadMenuItems = async () => {
            setLoading(true);
            setError(null);

            try {
                const data = await fetchItems();
                setMenuItems(data);
            } catch (e) {
                setError(e);
            } finally {
                setLoading(false);
            }
        };

        loadMenuItems();
    }, []);

    if (loading) return <div>Loading items...</div>;
    if (error) return <div>Error fetching items: {error.message}</div>;

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

    return (
        <div className='CashierMenu'>
            <button className='LogoutButton'>
                <Link to="/">Logout</Link>
            </button>
            <OrderMenu menuItems={menuItems} onItemButtonClick={addToOrder} />
            <OrderCart orderItems={orderItems} onItemButtonClick={removeFromOrder} />
        </div>
    );
}

export default CashierMenu;
