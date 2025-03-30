import React from 'react';
import useItem from '../../hooks/useItem';

const ItemList = () => {
    const { items, loadingItem, errorItem} = useItem();

    if (loadingItem) return <div>Loading items...</div>;
    if (errorItem) return <div>Error fetching items: {error.message}</div>;

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

export default ItemList;
