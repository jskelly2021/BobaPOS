import React, { useState, useEffect } from 'react';
import CustomizationGrid from './CustomizationGrid';
import ItemDetails from './ItemDetails';
import './ToppingsModule.css';

const quantities = ['none', 'light', 'regular', 'heavy'];

const ToppingModal = ({ item, ingredients, toppings, defaultToppings, onConfirm, onClose, onRemove, mode }) => {
    const [totalCalories, setTotalCalories] = useState();
    const [totalPrice, setTotalPrice] = useState();
    const [quantity, setQuantity] = useState(1);

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

    useEffect(() => {
        let calories = item.calories || 0;
        let price = parseFloat(item.price) || 0;

        Object.values(selectedToppings).forEach(topping => {
            if (topping.quantity !== 'none') {
                calories += (topping.calories || 0);
                price += (parseFloat(topping.price) || 0);
            }
        });
        setTotalCalories(calories);
        setTotalPrice(price);
    }, [item.calories, selectedToppings]);

    const handleQuantityChange = (topping, label) => {
        setSelectedToppings(prev => ({
            ...prev,
            [topping.topping_id]: {
                ...topping,
                quantity: label
            }
        }));
    };

    const productQuantityChange = (e) => {
        const value = parseInt(e.target.value, 10);
        if (!isNaN(value) && value >= 0) {
            setQuantity(value);
        }
    };

    return (
        <div className="ModalOverlay">
            <div className="ModalContent small">
                <ItemDetails item={item} ingredients={ingredients} totalCalories={totalCalories} totalPrice={totalPrice} />

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
                    <button onClick={() => onConfirm(item, Object.values(selectedToppings), quantity, totalPrice)}>
                        {mode === 'ordering' ? 'Add to Order' : 'Update'}
                    </button>
                    <button onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default ToppingModal;
