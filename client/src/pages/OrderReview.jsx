import React from 'react';
import { useNavigate } from 'react-router-dom';

import useOrderItem from '../hooks/useOrderItem';
import './OrderReview.css'

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
        else {
            nav('/menu/cashier');
        }
    }

    return (
        <div className='OrderReview'>
            <button className='BackOrderBtn' onClick={() => handleContinueOrder()}>
                Back to Order
            </button>
            <h1 className='reviewOrderText'>Review Order</h1>
            <ul className='OrderItemList'>
                {orderItems.map((item) => (
                        <li className="OrderItem" key={item.item_id}> 
                            <div className='ItemDetails'>
                                <h3>{item.item_name}</h3>
                                <p>Price: {item.price}</p>
                                <p>Quantity: 1</p>
                                <h4>Toppings:</h4>
                            </div> 
                        </li> 
                    ))}
            </ul>
            <div className='continuePayment'>
                <button className='PaymentBtn' onClick={() => nav('/payment')}>
                    Continue to Payment
                </button>
            </div>
        </div>
    );
}

export default OrderReview;
