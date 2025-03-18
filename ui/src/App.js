import './App.css';
import React, { useEffect, useState } from 'react';

function App() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetch('http://localhost:4001/api/items')
            .then((response) => response.json())
            .then((data) => setItems(data))
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    return (
        <div className="App">
            <h1>Items</h1>
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

export default App;
