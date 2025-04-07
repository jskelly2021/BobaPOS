import React, { useState } from 'react';

const TipSelector = ({ subtotal, onTipSelect }) => {
    const [customTip, setCustomTip] = useState('');
    const [selectedTip, setSelectedTip] = useState(null);

    const tapTip = (percentage) => {
        const tipAmount = (subtotal * percentage) / 100;
        setSelectedTip(tipAmount);
        onTipSelect(tipAmount);
    };

    return (
        <div className='tipSelection'>
            <h2>
                Select Tip:
            </h2>

            <div className='tipButtons'>
                <button className='tipBtn' onClick={() => tapTip(15)}>
                    15%
                </button>

                <button className='tipBtn' onClick={() => tapTip(18)}>
                    18%
                </button>

                <button className='tipBtn' onClick={() => tapTip(20)}>
                    20%
                </button>

                <input 
                    type='number' 
                    min='0.01'
                    value={customTip}
                    onChange={(e) => setCustomTip(e.target.value)}
                    placeholder='Custom'
                    onBlur={(e) => {
                        const tipAmount = parseFloat(e.target.value || 0);
                        setSelectedTip(tipAmount);
                        onTipSelect(tipAmount);
                    } }>
                </input>
            </div>

            <div className='tipSummary'>
                <p>Subtotal: ${subtotal}</p>
                <p>Tip: ${selectedTip !== null ? selectedTip.toFixed(2) : '0.00'}</p>
                <p>Total: ${((subtotal * 1.0825) + (selectedTip || 0)).toFixed(2)}</p>
            </div>

        </div>
    );
}

export default TipSelector;
