import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import ItemList from '../components/ItemList'
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
        console.log(`Adding Item: ${item.item_name}`);
        setOrderItems((prevOrder) => [...prevOrder, item]);
    }

    const removeFromOrder = (item) => {
        console.log(`Removing Item: ${item.item_name}`);
    }

    return (
        <div className='cashierMenu'>
            <button>
                <Link to="/">Logout</Link>
            </button>
            <h1>Cashier Menu</h1>
            <ItemList items={menuItems} onItemButtonClick={addToOrder} />
            <OrderCart orderItems={orderItems} onItemButtonClick={removeFromOrder} />
        </div>
    );
}

export default CashierMenu;
