import { useState, useEffect } from 'react';
import { fetchItems, updateItem, createItem, deleteItem, getNextItemId } from '../services/itemService';
import { fetchWeather, fetchCountryCode, fetchRegionCode, fetchCityName } from '../services/weatherService';


// Returns a list of items
const useItem = (defaultCategory = null) => {
    const [items, setItems] = useState([]);
    const [category, setCategory] = useState(defaultCategory);
    const [displayedCategory, setDisplayedCategory] = useState(defaultCategory);
    const [loadingItem, setLoading] = useState(true);
    const [errorItem, setError] = useState(null);

    useEffect(() => {
        const loadItems = async () => {
            setLoading(true);
            setError(null);

            try {
                let actualCategory = category;

                if (category === "RECOMMENDED") {
                    const country = await fetchCountryCode();
                    const region = await fetchRegionCode();
                    const city = await fetchCityName();
                    const res = await fetchWeather(city, region, country);
                    actualCategory = res.main.temp > 70 ? "FRUIT" : "BREWED";

                    setDisplayedCategory("RECOMMENDED")
                }
                else {
                    setDisplayedCategory(category);
                }

                let data;
                if (actualCategory === "ALL") {
                    data = await fetchItems(); // no category = fetch all drinks
                } else {
                    data = await fetchItems(actualCategory);
                }

                setItems(data);

            } catch (e) {
                setError(e);
            } finally {
                setLoading(false);
            }
        };

        loadItems();
    }, [category]);

    const updateCategory = (newCategory) => {
        setCategory(newCategory);
    }

    const editItem = async (item) => {
        try {
            await updateItem(item);

            setItems(prevItems =>
                prevItems.map(i =>
                    i.item_id === item.item_id ? {
                        ...i,
                        item_name: item.item_name,
                        category: item.category,
                        price: item.price,
                        calories: item.calories,
                        item_img: item.item_img,
                        active: item.active
                    } : i
                )
            );
            console.log(`Updated item ${item.item_id}`);
        } catch (e) {
            console.error('Error updating item: ', e);
        }
    };

    const removeItem = async (item) => {
        try {
            await deleteItem(item);
            setItems(prevItems => prevItems.filter(i => i.item_id !== item.item_id));
            console.log(`Deleted item ${item.item_name}`);
        } catch (e) {
            console.error('Error deleting item: ', e);
        }
    }

    const addItem = async (item) => {
        try {
            const newItem = await createItem(item);
            setItems(prevItems => [...prevItems, newItem]);
            console.log(`Created item ${newItem.item_id}`);
        } catch (e) {
            console.error('Error creating item: ', e);
        }
    }

    const getCategory = () => {
        switch (displayedCategory) {
            case "RECOMMENDED":
                return "Recommended Drinks for Today";
            case "BREWED":
                return "Brewed Tea";
            case "MILK":
                return "Milk Tea";
            case "FRUIT":
                return "Fruit Tea";
            case "CREAMA":
                return "Creama";
            case "ALL":
                return "All Drinks";
            default:
                break;
        }
    }

    const nextId = async () => {
        try {
            const nextId = await getNextItemId();
            return nextId
        } catch (e) {
            console.error('Error retrieving next Item id: ', e);
        }
    }

    return { items, loadingItem, errorItem, updateCategory, editItem, removeItem, addItem, getCategory, nextId };
}

export default useItem;
