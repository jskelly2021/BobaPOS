import React from 'react';
import { Link } from 'react-router-dom';

function OrderReview() {
    return (
        <div>
            <button className='ContinueOrderBtn'>
                <Link to="/menu">Continue Order</Link>
            </button>
            <button className='PlaceOrderBtn'>
                Place Order
            </button>
        </div>
    );
}

export default OrderReview;
