import React from 'react';
import { useNavigate } from 'react-router-dom';

import useOrderItem from '../hooks/useOrderItem';
import './OrderReview.css'
import AccessibilityBar from '../components/accessibility/AccessiblityBar';

function OrderReview() {
    const nav = useNavigate();
    const { orderItems, orderPrice } = useOrderItem();

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

            <AccessibilityBar />

            <h1 className='reviewOrderText'>Order Review</h1>

            <ul className='OrderItemList'>
                {orderItems.map((item) => (
                    <li className="OrderItem" key={item.orderItemId}> 
                        <div className='ItemDetails'>
                            <div className='Details'>
                                <h2>{item.item_name}</h2>
                                <p> Total Price: ${item.priceWithToppings ? item.priceWithToppings : item.price} </p>
                                <p>Quantity: {item.quantity}</p>
                            </div>
                        </div>

                        <div className='PriceBreakdown'>
                            <div className='ItemToppings'>
                                <h3>Price Breakdown</h3>
                                <p>${item.price} Base Price</p>
                                    {item.toppings?.filter(t => t.quantity !== 0 && t.quantity !== 'none').length > 0 ? (
                                        item.toppings
                                            .filter(t => t.quantity !== 0 && t.quantity !== 'none')
                                            .map((topping, i, arr) => (
                                                <span key={i}>
                                                    +${topping.price} {topping.topping_name} ({topping.quantity})
                                                </span>
                                            ))
                                    ) : (
                                        <span>None</span>
                                    )}
                            </div>
                        </div>

                        <div className='ItemImg'>
                            <img
                                src={item.item_img}
                                alt={item.item_name}
                            />
                        </div>
                    </li> 
                ))}
            </ul>

            <div className='UtilBar'>
                <button className='BackBtn' onClick={() => handleContinueOrder()}>
                    Back to Order
                </button>

                <button className="OrderPriceLabel">
                    {'$' + orderPrice()}
                </button>

                <button className='PaymentBtn' onClick={() => nav('/payment')}>
                    Continue to Payment
                </button>
            </div>
        </div>
    );
}

export default OrderReview;
