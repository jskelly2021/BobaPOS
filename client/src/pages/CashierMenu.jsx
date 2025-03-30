import React from 'react';
import { useNavigate } from 'react-router-dom';

import useOrderItem from '../hooks/useOrderItem';
import useItem from '../hooks/useItem';
import MenuItemList from '../components/MenuItemList'
import OrderCart from '../components/OrderCart';

function CashierMenu() {
    const nav = useNavigate();
    const { items, loadingItem, errorItem } = useItem();
    const { orderItems, addToOrder, removeFromOrder } = useOrderItem();

    if (loadingItem) return <div>Loading items...</div>;
    if (errorItem) return <div>Error fetching items: {errorItem.message}</div>;

    return (
        <div className='CashierMenu'>
            <button className='DashboardBtn' onClick={() => nav('/dashboard')}>
                Dashboard
            </button>

            <MenuItemList menuItems={items} onItemButtonClick={addToOrder} />
            <OrderCart orderItems={orderItems} onItemButtonClick={removeFromOrder} />

            <button className='ReviewOrderBtn' onClick={() => nav('/review')}>
                Review Order
            </button>
        </div>
    );
}

export default CashierMenu;
