import React from 'react';
import { Link } from 'react-router-dom';

import ItemList from '../components/ItemList'


function CashierMenu() {
  return (
    <div>
      <h1>CashierMenu</h1>
      <ItemList />
      <button>
        <Link to="/">Logout</Link>
      </button>

    </div>
  );
}

export default CashierMenu;
