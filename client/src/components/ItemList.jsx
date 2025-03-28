import React, { useState, useEffect } from 'react';

function ItemList() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    const itemURL = `${API_BASE_URL}/items`;

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(itemURL);
                if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setItems(data);
            }
            catch (e) {
                setError(e);
            }
            finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [itemURL]);

    if (loading) {
        return <div>Loading items...</div>;
    }

    if (error) {
        return <div>Error fetching items: {error.message}</div>;
    }

    return (
        <div>
        <h2>Items</h2>
        <ul>
            {items.map((item, index) => (
                <li key={index}>
                    {item.item_name} - {item.price}
                </li> 
            ))}
        </ul>
        </div>
    );
}

export default ItemList;
