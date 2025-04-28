import React, { useState, useEffect } from 'react';
import './ToppingsModule.css';


const IngredientModal = ({ item, ingredients, itemIngredients, onConfirm, onClose }) => {

    const [ingredientQuantities, setIngredientQuantities] = useState(() => {
        const initial = {};

        ingredients.forEach(i => {
            initial[i.ingredient_id] = {
                ...i,
                quantity: 0
            };
        });

        (itemIngredients || []).forEach(i => {
            initial[i.ingredient_id] = { ...i };
        });

        return initial;
    });

    const handleQuantityChange = (ingredient, newQuantity) => {
        setIngredientQuantities(prev => ({
            ...prev,
            [ingredient.ingredient_id]: {
                ...ingredient,
                quantity: Number(newQuantity)
            }
        }));
    };

    return (
        <div className="ModalOverlay">
            <div className="ModalContent small">
                <ul className="IngredientGrid">
                    {ingredients.map(ingredient => (
                        <li key={ingredient.ingredient_id} className="ItemIngredient">
                            <div>
                                <h3 className="IngredientName">{ingredient.ingredient_name}</h3>

                                <input
                                    type='number'
                                    value={ingredient.quantity || ''}
                                    onChange={(e) => handleQuantityChange('quantity', e.target.value)}
                                />
                            </div>

                        </li>
                    ))}
                </ul>

                <div className="ModalActions">
                    <button onClick={() => onConfirm(item, Object.value(ingredientQuantities))}>
                        Update
                    </button>
                    <button onClick={() => onClose()}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default IngredientModal;
