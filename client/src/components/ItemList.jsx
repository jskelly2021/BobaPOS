import React from 'react';
import ItemButton from './ItemButton'

function ItemList({ items, onItemButtonClick }) {
    return (
        <div>
            <h2>Items</h2>
            <ul className='ItemList'>
                {items.map((item, index) => (
                    <li key={index}> 
                        <ItemButton item={item} onClick={() => onItemButtonClick(item)}/>
                    </li> 
                ))}
            </ul>
        </div>
    );
}

export default ItemList;
