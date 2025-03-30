import React from 'react';
import { Link } from 'react-router-dom';

import useOrderItems from '../hooks/useOrderItems';
import ItemList from '../components/ItemList';

function OrderReview() {
    const { orderItems, removeFromOrder } = useOrderItems();

    return (
        <div className='OrderReview'>
            <button className='ContinueOrderBtn'>
                <Link to="/menu">Continue Order</Link>
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
