import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const fetchToppings = async () => {
    const res = await axios.get(`${API_BASE_URL}/toppings`);
    return res.data;
};

export const updateTopping = async (topping) => {
    const res = await axios.put(`${API_BASE_URL}/toppings/${topping.topping_id}`, {
        quantity: topping.quantity
    });
    return res.data;
};
