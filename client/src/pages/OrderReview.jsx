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
                        <li className="OrderItem" key={item.orderItemId}> 
                            <div className='ItemDetails'>
                                <h3>{item.item_name}</h3>
                                <p>Price: {item.price * item.quantity}</p>
                                <p>Quantity: {item.quantity}</p>

                                <h4>Toppings:</h4>
                                {item.toppings?.length > 0 ? (
                                    item.toppings
                                        .filter(t => t.quantity !== 0 && t.quantity !== 'none')
                                        .map((topping, i) => (
                                            <span key={i}>
                                                {topping.topping_name} ({topping.quantity})
                                            </span>
                                        ))
                                ) : (
                                    <span>None</span>
                                )}
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
