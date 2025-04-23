import React, { useState } from 'react';
import './ToppingsModule.css';

const quantities = ['none', 'light', 'regular', 'heavy'];
const quantityValues = {
    none: 0,
    light: 0.5,
    regular: 1,
    heavy: 1.5
};

const ToppingModal = ({ item, toppings, defaultToppings, onConfirm, onClose }) => {
    const [selectedToppings, setSelectedToppings] = useState(() => {
        const initial = {};

        toppings.forEach(t => {
            initial[t.topping_id] = {
                ...t,
                quantity: 'none'
            };
        });

        (defaultToppings || []).forEach(t => {
            initial[t.topping_id] = { ...t };
        });

        return initial;
    });

    const handleQuantityChange = (topping, label) => {
        const value = quantityValues[label];

        setSelectedToppings(prev => ({
            ...prev,
            [topping.topping_id]: {
                ...topping,
                quantity: label
            }
        }));
    };

    const getLabel = (topping, label) => {
        return selectedToppings[topping.topping_id].quantity === label ? 'active' : '';
    };

    const [quantity, setQuantity] = useState(1);
    const productQuantityChange = (e) => {
        const value = parseInt(e.target.value, 10);
        if (!isNaN(value) && value >= 0) {
            setQuantity(value);
        }
    };

    return (
        <div className="ModalOverlay">
            <div className="ModalContent small">
                <h2>Customize: {item.item_name}</h2>
                <ul className="ToppingGrid">
                    {toppings.map((topping) => (
                        <li key={topping.topping_id} className="ToppingItem">
                            <div className="ToppingName">{topping.topping_name}</div>
                            <div className="ButtonGroup">
                                {quantities.map(label => (
                                    <button
                                        key={label}
                                        className={`quantityBtn ${getLabel(topping, label)}`}
                                        onClick={() => handleQuantityChange(topping, label)}
                                    >
                                        {label}
                                    </button>
                                ))}
                            </div>
                        </li>
                    ))}
                </ul>
                <label className='quantityLabel'>Quantity: </label>
                <input 
                    className='quantityInput'
                    type='number' 
                    min='1'
                    value={quantity}
                    onChange={productQuantityChange}>
                </input>
                <div className="ModalActions">
                    <button onClick={() => onConfirm(item, Object.values(selectedToppings), quantity)}>Add to Order</button>
                    <button onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default ToppingModal;
