import React, { useState } from 'react';
import useToppings from '../../../hooks/useToppings';
import DefaultToppingRow from './DefaultToppingRow';
import EditToppingRow from './EditToppingRow';


const ToppingList = () => {
    const { toppings, loadingTopping, errorTopping, editTopping, removeTopping, addTopping, nextId } = useToppings();
    const [editingToppingId, setEditingToppingId] = useState(null);
    const [editedTopping, setEditedTopping] = useState({});

    const handleEditClick = (topping) => {
        setEditingToppingId(topping.topping_id);
        setEditedTopping({...topping});
    }

    const handleOnEditChange = (field, value) => { 
        setEditedTopping({
            ...editedTopping,
            [field]: value
        })
    }

    const handleSaveClick = async () => {
        await editTopping(editedTopping);
        setEditingToppingId(null);
    }

    const handleCancelClick = () => {
        setEditingToppingId(null);
        setEditedTopping({});
    }

    const handleAddTopping = async () => {
        const id = await nextId();

        const newTopping = {
            topping_id: id,
            topping_name: '',
            calories: 0,
        };
        await addTopping(newTopping);
        setEditingToppingId(newTopping.topping_id);
        setEditedTopping({...newTopping});
    }

    if (loadingTopping) return <div>Loading toppings...</div>;
    if (errorTopping) return <div>Error fetching toppings: {errorTopping.message}</div>;

    return (
        <div>
            <h2>Toppings</h2>
            <ul className='List ToppingList'>
                <li className='Labels'>
                    <h3>Name</h3>
                    <h3>Calories</h3>
                    <div></div>
                </li>
                {toppings.map((topping) => 
                    <li key={topping.topping_id}>
                        {editingToppingId === topping.topping_id ? (
                            <EditToppingRow 
                                topping={editedTopping}
                                onEdit={handleOnEditChange}
                                onSave={handleSaveClick}
                                onCancel={handleCancelClick}
                                deleteTopping={removeTopping}
                            />
                        )
                        : (
                            <DefaultToppingRow
                                topping={topping}
                                onEdit={handleEditClick}
                            />
                        )}
                    </li>
                )}
                <button className="AddToppingBtn" onClick={() => handleAddTopping()}>Add Topping</button>
            </ul>
        </div>
    );
}

export default ToppingList;
