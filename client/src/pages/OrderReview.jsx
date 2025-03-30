import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import useOrderItems from '../hooks/useOrderItems';

function OrderReview() {
    const nav = useNavigate();
    const { orderItems, clearOrder } = useOrderItems();

    return (
        <div className='OrderReview'>
            <button className='ContinueOrderBtn' onClick={() => nav('/menu')}>
                Continue Order
            </button>
            <h1>Review Order</h1>
            <button className='PlaceOrderBtn' onClick={() => clearOrder()}>
                Place Order
            </button>
            <ul className='orderOverView'>
                {orderItems.map((item, index) => (
                        <li key={index}> 
                            <p>{item.item_name}</p>
                            <p>{item.price}</p>
                        </li> 
                    ))}
            </ul>
        </div>
    );
}

export default OrderReview;
