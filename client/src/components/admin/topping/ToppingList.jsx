import React, {useState} from 'react';

const ToppingList = () => {
    return (
        <div>
            <h2>Toppings</h2>
            <ul className='List ToppingList'>
                <li className='Labels'>
                    <h3>Name</h3>
                    <h3>Calories</h3>
                    <div></div>
                </li>
            </ul>
        </div>
    );
}

export default ToppingList;
