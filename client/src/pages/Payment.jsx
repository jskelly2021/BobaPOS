import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useOrderItem from '../hooks/useOrderItem';
import TipSelector from '../components/tipSelector';

function Payment() {
    const nav = useNavigate();
    const { placeOrder, orderPrice } = useOrderItem();
    const [ tip, setTip ] = useState(0);

    const subtotal = orderPrice() || 0;

    const handlePlaceOrder = (subtotal, paymentMethod, tip) => {
        placeOrder(subtotal, paymentMethod, tip);

        const userMode = localStorage.getItem('userMode');

        if (userMode === 'employee') {
            nav('/menu/cashier');
        }
        else if (userMode === 'customer') {
            nav('/welcome');
        }
        else {
            nav('/menu/cashier');
        }
    }

    return (
        <div className="Payment">
            <button className='ExitBtn' onClick={() => nav('/review')}>
                Cancel
            </button>

            <TipSelector subtotal = {subtotal} onTipSelect = {setTip}/>
            <button className='CardBtn' onClick={() => handlePlaceOrder(subtotal, "CASH", tip)}>
                Credit Card
            </button>

            <button className='CashBtn' onClick={() => handlePlaceOrder(subtotal, "CARD", tip)}>
                Cash
            </button>
        </div>
    );
}

export default Payment;
