// components/ToppingModal.jsx
import React, { useState } from 'react';

const ToppingModal = ({ item, toppings, onConfirm, onClose }) => {
    console.log("Toppings passed to modal:", toppings);
    const [selectedToppings, setSelectedToppings] = useState([]);

    const toggleTopping = (topping) => {
        setSelectedToppings((prev) =>
            prev.includes(topping)
                ? prev.filter((t) => t !== topping)
                : [...prev, topping]
        );
    };

    return (
        <div className="ModalOverlay">
            <div className="ModalContent">
                <h2>Customize: {item.item_name}</h2>

                <ul>
                    {toppings.map((topping) => (
                        <li key={topping.topping_id}>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={selectedToppings.includes(topping)}
                                    onChange={() => toggleTopping(topping)}
                                />
                                {topping.topping_name}
                            </label>
                        </li>
                    ))}
                </ul>

                <div style={{ marginTop: '1rem' }}>
                    <button onClick={() => onConfirm(item, selectedToppings)}>Add to Order</button>
                    <button onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default ToppingModal;
