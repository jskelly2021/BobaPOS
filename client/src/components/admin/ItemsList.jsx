import React from 'react';

const ItemsList = () => {
    return (
        <div>
            <ul className='ItemList'>
                {items.map((item) => (
                    <li key={item.id}> 
                        <p>{item.item_name}</p>
                        <p>{item.price}</p>
                    </li> 
                ))}
            </ul>
        </div>
    );
}

export default ItemsList;
