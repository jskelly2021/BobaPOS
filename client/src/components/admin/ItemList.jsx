import React from 'react';
import useItem from '../../hooks/useItem';

const ItemList = () => {
    const { items, loadingItem, errorItem} = useItem();

    if (loadingItem) return <div>Loading items...</div>;
    if (errorItem) return <div>Error fetching items: {errorItem.message}</div>;

    return (
        <div>
            <h2>Items</h2>

            <ul className='List ItemList'>
                <li className='Labels'>
                    <h3>Name</h3>
                    <h3>Price</h3>
                </li>
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
