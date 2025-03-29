import React from 'react';
import { Link } from 'react-router-dom';

import useMenuItems from '../hooks/useMenuItems';
import OrderMenu from '../components/OrderMenu'
import OrderCart from '../components/OrderCart';

function CashierMenu() {
    const [menuItems, loading, error] = useMenuItems();
    const [orderItems, setOrderItems] = useState([]);

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
