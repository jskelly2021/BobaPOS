import React from 'react';
import { useNavigate } from 'react-router-dom';

import useMenuItems from '../hooks/useMenuItems';
import useOrderItems from '../hooks/useOrderItems';
import OrderMenu from '../components/OrderMenu'
import OrderCart from '../components/OrderCart';

function CashierMenu() {
    const nav = useNavigate();
    const { menuItems, loading, error } = useMenuItems();
    const { orderItems, addToOrder, removeFromOrder } = useOrderItems();

    if (loading) return <div>Loading items...</div>;
    if (error) return <div>Error fetching items: {error.message}</div>;

    return (
        <div className='CashierMenu'>
            <button className='DashboardBtn' onClick={() => nav('/dashboard')}>
                Dashboard
            </button>
            <OrderMenu menuItems={menuItems} onItemButtonClick={addToOrder} />
            <OrderCart orderItems={orderItems} onItemButtonClick={removeFromOrder} />
            <button className='ReviewOrderBtn' onClick={() => nav('/review')}>
                Review Order
            </button>
        </div>
    );
}

export default CashierMenu;
