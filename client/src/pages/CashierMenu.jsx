import React from 'react';
import { useNavigate } from 'react-router-dom';

import useOrderItem from '../hooks/useOrderItem';
import useItem from '../hooks/useItem';
import Menu from '../components/Menu'
import OrderCart from '../components/OrderCart';
import CategorySelector from '../components/CategorySelector';

function CashierMenu() {
    const nav = useNavigate();
    const { items, loadingItem, errorItem, updateCategory } = useItem();
    const { orderItems, addToOrder, removeFromOrder } = useOrderItem();

    if (loadingItem) return <div>Loading items...</div>;
    if (errorItem) return <div>Error fetching items: {errorItem.message}</div>;
    updateCategory("brewed");

    return (
        <div className='CashierMenu'>
            <button className='DashboardBtn' onClick={() => nav('/dashboard')}>
                Dashboard
            </button>

            <div className='content'>
                <CategorySelector />
                <Menu menuItems={items} onItemButtonClick={addToOrder} />
                <OrderCart orderItems={orderItems} onItemButtonClick={removeFromOrder} />
            </div>

            <button className='ReviewOrderBtn' onClick={() => nav('/review')}>
                Review Order
            </button>
        </div>
    );
}

export default CashierMenu;
