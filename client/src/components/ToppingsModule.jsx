import React, { useState } from 'react';
import CustomizationGrid from './CustomizationGrid';
import './ToppingsModule.css';

const quantities = ['none', 'light', 'regular', 'heavy'];
const quantityValues = {
    none: 0,
    light: 0.5,
    regular: 1,
    heavy: 1.5
};

const ToppingModal = ({ item, toppings, defaultToppings, onConfirm, onClose, onRemove, mode }) => {
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
                <h2>{item.item_name}</h2>
                <img className='ItemImg'
                    src={item.item_img}
                    alt={item.item_name}
                />
                <div className='ItemIngredients'>
                    Ingredients:
                </div>
                <div className='ItemCalories'>
                    Calories: {item.calories}
                </div>
                <CustomizationGrid
                    toppings={toppings}
                    selectedToppings={selectedToppings}
                    quantities={quantities}
                    onChange={handleQuantityChange}
                />

                {mode === 'ordering' && (<div>
                    <label className='quantityLabel'>Quantity: </label>
                    <input 
                        className='quantityInput'
                        type='number' 
                        min='1'
                        value={quantity}
                        onChange={productQuantityChange}>
                    </input>
                </div>)}

                <div className="ModalActions">
                    {mode === 'editing' && (<button onClick={() => onRemove(item)}>Remove</button>)}
                    <button onClick={() => onConfirm(item, Object.values(selectedToppings), quantity)}>
                        {mode === 'ordering' ? 'Add to Order' : 'Update'}
                    </button>
                    <button onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default ToppingModal;
