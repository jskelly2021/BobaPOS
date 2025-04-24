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

// Fetch usage for a given ingredient between a start and end time in the specified interval
export const fetchProductUsage = async (ingredientId, interval, start, end) => {
    const startTime = start instanceof Date ? start.getTime() : start;
    const endTime = end instanceof Date ? end.getTime() : end;

    const url = `${API_BASE_URL}/analytics/usage/${ingredientId}/${interval}/${startTime}/${endTime}`;
    try {
        const { data } = await axios.get(url, { withCredentials: true });
        return data;
    } catch (error) {
        throw new Error(`Failed to fetch ingredient usage: ${error.message}`);
    }
}


// Fetch sales over days data
export const fetchSalesOverDays = async (start, end) => {
  const url = `${API_BASE_URL}/analytics/sales-over-days`;
  try {
    const { data } = await axios.post(url,
      { start: start, end: end },
      { withCredentials: true },
    );
    return data;
  } catch (error) {
    throw new Error(`Failed to fetch sales data: ${error.message}`);
  }
};

// Fetch sales during a specific day
export const fetchSalesDuringDay = async (start, end) => {
  const url = `${API_BASE_URL}/analytics/sales-during-day`;
  try {
    const { data } = await axios.post(url, { start: start, end: end }, { withCredentials: true });
    //console.log("Sales data during day:", data); // Debugging log
    return data;
  } catch (error) {
    throw new Error(`Failed to fetch sales data for : ${error.message}`);
  }
};

// Get sales over weeks
export const fetchSalesOverWeeks = async (start, end) => {
  const url = `${API_BASE_URL}/analytics/sales-over-weeks`;
  try {
    const { data } = await axios.post(url, { start: start, end: end }, { withCredentials: true });
    return data;
  } catch (error) {
    throw new Error(`Failed to fetch sales data: ${error.message}`);
  }
};

// Fetch sales over months data
export const fetchSalesOverMonths = async (start, end) => {
  const url = `${API_BASE_URL}/analytics/sales-over-months`;
  try {
    const { data } = await axios.post(url, { start: start, end: end }, { withCredentials: true });
    return data;
  } catch (error) {
    throw new Error(`Failed to fetch sales data: ${error.message}`);
  }
};

// Fetch total summary data (revenue, tax, tips, etc.)
export const fetchTotals = async () => {
  const url = `${API_BASE_URL}/analytics/totals`;
  try {
    const { data } = await axios.get(url, { withCredentials: true });
    return data;
  } catch (error) {
    throw new Error(`Failed to fetch totals: ${error.message}`);
  }
};

// Fetch item sales counts for the day
export const fetchItemSales = async () => {
  const url = `${API_BASE_URL}/analytics/item-sales`;
  try {
    const { data } = await axios.post(url, {withCredentials: true});  // This route uses POST!
    return data;
  } catch (error) {
    throw new Error(`Failed to fetch item sales: ${error.message}`);
  }
};

// Fetch ingredient usage
export const fetchIngredientUsage = async () => {
  const url = `${API_BASE_URL}/analytics/ingredient-usage`;
  try {
    const { data } = await axios.get(url, { withCredentials: true });
    return data;
  } catch (error) {
    throw new Error(`Failed to fetch ingredient usage: ${error.message}`);
  }
};

// Fetch full Z-Report data
export const fetchZReportData = async () => {
  const urlBase = process.env.REACT_APP_API_BASE_URL || 'http://localhost:4001/api';

  try {
    const [totalsRes, usageRes, itemSalesRes] = await Promise.all([
      // include credentials per request
      axios.get(
        `${urlBase}/analytics/totals`,
        { withCredentials: true }
      ),

      axios.get(
        `${urlBase}/analytics/ingredient-usage`,
        { withCredentials: true }
      ),

      // switch to POST, with empty body if your server expects it
      axios.get(
        `${urlBase}/analytics/item-sales`,
        { withCredentials: true }
      )
    ]);

    return {
      totals:           totalsRes.data,
      ingredientUsage:  usageRes.data,
      itemSales:        itemSalesRes.data,
    };
  } catch (error) {
    console.error('Z-Report fetch error:', error.response || error);
    throw new Error(`Failed to load Z-Report data: ${error.message}`);
  }
};

