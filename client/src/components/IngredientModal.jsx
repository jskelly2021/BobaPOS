import React, { useState, useEffect } from 'react';
import './ToppingsModule.css';


const IngredientModal = ({ item, ingredients, itemIngredients, onConfirm, onClose }) => {
    const [ingredientQuantities, setIngredientQuantities] = useState(() => {
        const initial = {};

        ingredients.forEach(i => {
            initial[i.ingredient_id] = {
                ...i,
                quantity: 0.00
            };
        });

        (itemIngredients || []).forEach(i => {
            initial[i.ingredient_id] = { ...i };
        });

        return initial;
    });

    const handleQuantityChange = (id, newQuantity) => {
        if (newQuantity < 0) {
            newQuantity = 0;
        }

        setIngredientQuantities(prev => ({
            ...prev,
            [id]: {
                ...prev[id],
                quantity: Number(newQuantity)
            }
        }));
    };

    return (
        <div className="ModalOverlay">
            <div className="ModalContent small">
                <ul className="ToppingGrid">
                    {Object.values(ingredientQuantities).map(ingredient => (
                        <li key={ingredient.ingredient_id} className="ItemIngredient">
                            <div>
                                <h3 className="IngredientName">{ingredient.ingredient_name}</h3>
                                <input
                                    type='number'
                                    value={ingredient.quantity || 0.00}
                                    min={0}
                                    onChange={(e) => handleQuantityChange(ingredient.ingredient_id, e.target.value)}
                                />
                            </div>
                        </li>
                    ))}
                </ul>

                <div className="ModalActions">
                    <button onClick={() => onConfirm(item, Object.values(ingredientQuantities))}>
                        Update
                    </button>
                    <button onClick={() => onClose()}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default IngredientModal;
