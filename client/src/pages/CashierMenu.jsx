import React from 'react';
import { Link } from 'react-router-dom';

import ItemList from '../components/ItemList'
import OrderCart from '../components/OrderCart';

const addToOrder = (item) => {
    console.log(`Adding Item: ${item.item_name}`);
}

const removeFromOrder = (item) => {
    console.log(`Removing Item: ${item.item_name}`);
}

function CashierMenu() {
    return (
        <div>
            <button>
                <Link to="/">Logout</Link>
            </button>
            <h1>CashierMenu</h1>
            <ItemList onItemButtonClick={addToOrder}/>
            <OrderCart onItemButtonClick={removeFromOrder}/>
        </div>
    );
}

export default CashierMenu;
