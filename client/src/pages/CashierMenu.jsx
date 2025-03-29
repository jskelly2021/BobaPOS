import React from 'react';
import { Link } from 'react-router-dom';

import useMenuItems from '../hooks/useMenuItems';
import useOrderItems from '../hooks/useOrderItems';
import OrderMenu from '../components/OrderMenu'
import OrderCart from '../components/OrderCart';

function CashierMenu() {
    const { menuItems, loading, error } = useMenuItems();
    const { orderItems, addToOrder, removeFromOrder } = useOrderItems();

    if (loading) return <div>Loading items...</div>;
    if (error) return <div>Error fetching items: {error.message}</div>;

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
