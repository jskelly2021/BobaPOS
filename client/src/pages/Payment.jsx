import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useOrderItem from '../hooks/useOrderItem';
import TipSelector from '../components/tipSelector';

function Payment() {
    const nav = useNavigate();
    const { placeOrder, orderPrice } = useOrderItem();
    const [ tip, setTip ] = useState(0);
    
    const subtotal = orderPrice() || 0;

    return (
        <div className="Payment">
            <button className='ExitBtn' onClick={() => nav('/menu')}>
                Cancel
            </button>

            <TipSelector subtotal = {subtotal} onTipSelect = {setTip}/>
            <button className='CardBtn' onClick={() => placeOrder(subtotal, "CARD", tip)}>
                Credit Card
            </button>

            <button className='CashBtn' onClick={() => placeOrder(subtotal, "CASH", tip)}>
                Cash
            </button>
        </div>
    );
}

export default Payment;
