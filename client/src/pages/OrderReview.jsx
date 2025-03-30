import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import useOrderItems from '../hooks/useOrderItems';
import ItemList from '../components/ItemList';

function OrderReview() {
    const nav = useNavigate();
    const { orderItems, removeFromOrder } = useOrderItems();

    return (
        <div className='OrderReview'>
            <button className='ContinueOrderBtn' onClick={() => nav('/menu')}>
                Continue Order
            </button>
            <h1>Review Order</h1>
            <button className='PlaceOrderBtn'>
                Place Order
            </button>
            <ItemList items={orderItems} onItemButtonClick={removeFromOrder} />
        </div>
    );
}

export default OrderReview;
