import React, {useState} from 'react';
import useToppings from '../../../hooks/useToppings';
import DefaultToppingRow from './DefaultToppingRow';

const ToppingList = () => {
    const { toppings } = useToppings();

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
                        <DefaultToppingRow topping={topping} />
                    </li>
                )}
            </ul>
        </div>
    );
}

export default ToppingList;
