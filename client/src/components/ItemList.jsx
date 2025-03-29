import React, { useState, useEffect } from 'react';
import { fetchItems } from '../services/itemService';
import ItemButton from './ItemButton'

function ItemList({ onItemButtonClick }) {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadItems = async () => {
            setLoading(true);
            setError(null);

            try {
                const data = await fetchItems();
                setItems(data);
            } catch (e) {
                setError(e);
            } finally {
                setLoading(false);
            }
        };

        loadItems();
    }, []);

    if (loading) return <div>Loading items...</div>;
    if (error) return <div>Error fetching items: {error.message}</div>;

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
