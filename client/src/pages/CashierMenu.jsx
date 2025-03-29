import React from 'react';
import { Link } from 'react-router-dom';

import ItemList from '../components/ItemList'


const onItemButtonClick = (item) => {
  console.log(`Selected Item: ${item.item_name}`);
}

function CashierMenu() {
  return (
    <div>
      <button>
        <Link to="/">Logout</Link>
      </button>
      <h1>CashierMenu</h1>
      <ItemList onItemButtonClick={onItemButtonClick}/>

    </div>
  );
}

export default CashierMenu;
