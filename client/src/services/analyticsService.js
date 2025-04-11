// server/services/analyticsService.js
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

// Fetch top selling products (with an optional limit parameter)
export const fetchTopSellingProducts = async (limit = 5) => {
  // Construct the URL – adjust the endpoint path if needed.
  const url = `${API_BASE_URL}/analytics/top-selling-products?limit=${limit}`;
  try {
    const { data } = await axios.get(url, { withCredentials: true });
    return data;
  } catch (error) {
    throw new Error(`Failed to fetch top selling products: ${error.message}`);
  }
};

// Fetches the usage by an ingredient in the given interval between the start and endTime
export const fetchProductUsage = async (ingredientId, interval, startTime, endTime) => {
    const url = `${API_BASE_URL}/analytics/usage/${ingredientId}/${interval}/${startTime}/${endTime}`;

    try {
        const { data } = await axios.get(url);
        return data;
    } catch (error) {
        throw new Error(`Failed ot fetch ingredient usage for: ${ingredientId}`);
    }
}
