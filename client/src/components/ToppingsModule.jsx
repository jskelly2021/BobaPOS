import React, { useState, useEffect } from 'react';
import CustomizationGrid from './CustomizationGrid';
import ItemDetails from './ItemDetails';
import './ToppingsModule.css';

const quantities = ['none', 'light', 'regular', 'heavy'];

const ToppingModal = ({ item, itemIngredients, toppings, defaultToppings, onConfirm, onClose, onRemove, mode }) => {
    const [totalCalories, setTotalCalories] = useState();
    const [totalPrice, setTotalPrice] = useState();
    const [quantity, setQuantity] = useState(() => {
        return item.quantity || 1;
    });
    const [inStock] = useState (() => {
        for (const ingredient of itemIngredients) {
            if (Number(ingredient.total_quantity) < Number(ingredient.threshold)) {
                console.log(`Threshold met for ${ingredient.ingredient_name} in ${item.item_name}`);
                return false;
            }
        }
        return true;
    })

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
    }, [item.calories, item.price, selectedToppings]);

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
                <div class='Details-Grid'>

                    <ItemDetails
                        item={item}
                        ingredients={itemIngredients}
                        totalCalories={totalCalories}
                        totalPrice={totalPrice}
                        mode={mode}
                        quantity={quantity}
                        onQuantityChange={productQuantityChange}
                    />

                    <CustomizationGrid
                        toppings={toppings}
                        selectedToppings={selectedToppings}
                        quantities={quantities}
                        onChange={handleQuantityChange}
                    />
                </div>

                <div className="ModalActions">
                    {mode === 'editing' && (<button onClick={() => onRemove(item)}>Remove</button>)}
                    {inStock === true ? (
                        <button onClick={() => onConfirm(item, Object.values(selectedToppings), quantity, totalPrice)}>
                            {mode === 'ordering' ? 'Add to Order' : 'Update'}
                        </button>
                    ) : (
                        <button className='OutOfStockBtn'>
                            Out of Stock
                        </button>
                    )}
                    <button onClick={() => onClose()}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default ToppingModal;
