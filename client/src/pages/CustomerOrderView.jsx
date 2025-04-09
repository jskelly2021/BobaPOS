import React from 'react';
import { useNavigate } from 'react-router-dom';

import './CustomerOrderView.css'

import useOrderItem from '../hooks/useOrderItem';
import useItem from '../hooks/useItem';
import ItemMenu from '../components/ItemMenu'
import OrderCart from '../components/OrderCart';
import CategorySelector from '../components/CategorySelector';

function OrderView() {
    const nav = useNavigate();
    const { items, loadingItem, errorItem, updateCategory } = useItem("BREWED");
    const { orderItems, addToOrder, removeFromOrder } = useOrderItem();

    if (loadingItem) return <div>Loading items...</div>;
    if (errorItem) return <div>Error fetching items: {errorItem.message}</div>;

    return (
        <div className='OrderView CustomerOrderView'>
            <button className='LogoutBtn' onClick={() => nav('/')}>
                Logout
            </button>

            <div className='content'>
                <CategorySelector changeCategory={updateCategory}/>
                <ItemMenu menuItems={items} onItemButtonClick={addToOrder} />
                <OrderCart orderItems={orderItems} onItemButtonClick={removeFromOrder} />
            </div>

            <button className='ReviewOrderBtn' onClick={() => nav('/review')}>
                Review Order
            </button>
        </div>
    );
}

export default OrderView;
