import React from 'react';
import { useNavigate } from 'react-router-dom';

import useOrderItem from '../hooks/useOrderItem';

function OrderReview() {
    const nav = useNavigate();
    const { orderItems } = useOrderItem();

    const handleContinueOrder = () => {
        const userMode = localStorage.getItem('userMode');

        if (userMode === 'employee') {
            nav('/menu/cashier');
        }
        else if (userMode === 'customer') {
            nav('/menu/customer');
        }
    }

    return (
        <div className='OrderReview'>
            <button className='ContinueOrderBtn' onClick={() => handleContinueOrder()}>
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
            <button className='PaymentBtn' onClick={() => nav('/payment')}>
                Payment
            </button>
        </div>
    );
}

export default OrderReview;
