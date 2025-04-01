import React from 'react';
import { useNavigate } from 'react-router-dom';

import useOrderItem from '../hooks/useOrderItem';

function OrderReview() {
    const nav = useNavigate();
    const { orderItems, placeOrder } = useOrderItem();

    return (
        <div className='OrderReview'>
            <button className='ContinueOrderBtn' onClick={() => nav('/menu')}>
                Continue Order
            </button>
            <h1>Review Order</h1>
            <ul className='OrderItemList'>
                {orderItems.map((item) => (
                        <li className="OrderItem" key={item.item_id}> 
                            <div>
                                <h3>{item.item_name}</h3>
                                <p>{item.price}</p>
                            </div> 
                            <h4>Toppings:</h4>
                        </li> 
                    ))}
            </ul>
            <button className='PlaceOrderBtn' onClick={() => placeOrder()}>
                Place Order
            </button>
        </div>
    );
}

export default OrderReview;
