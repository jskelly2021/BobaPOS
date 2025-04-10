import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useOrderItem from '../hooks/useOrderItem';
import TipSelector from '../components/tipSelector';
import './Payment.css'

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

            <div className='PaymentBtn'>
                <TipSelector className='Tip' subtotal = {subtotal} onTipSelect = {setTip}/>

                <div className='cashCard'>
                    <button className='CardBtn' onClick={() => placeOrder(subtotal, "CARD", tip)}>
                        Credit Card
                    </button>

                    <button className='CashBtn' onClick={() => placeOrder(subtotal, "CASH", tip)}>
                        Cash
                    </button>
                </div>
            </div>

        </div>
    );
}

export default Payment;
