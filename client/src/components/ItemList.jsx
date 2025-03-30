import React from 'react';
import ItemButton from './ItemButton'

function ItemList({ items, onItemButtonClick }) {
    return (
        <div>
            <ul className='ItemList'>
                {items.map((item) => (
                    <li key={item.id}> 
                        <ItemButton item={item} onClick={() => onItemButtonClick(item)}/>
                    </li> 
                ))}
            </ul>
        </div>
    );
}

export default ItemList;
