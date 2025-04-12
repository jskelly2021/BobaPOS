import { useState, useEffect } from 'react';
import { fetchSalesDuringDay } from '../services/analyticsService';

const useSalesDuringDay = (start, end) => {
    const [salesData, setSalesData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const loadSalesData = async () => {
        setLoading(true);
        setError(null);
        try {
          // Pass the computed startTime and endTime to your fetch function
          const data = await fetchSalesDuringDay(start, end);
          // Format the data: Convert each period to an ISO string to ensure a valid date for your graph,
          // and convert the sales to a number.
          const formattedData = data.map(entry => {
            const date = new Date(entry.hour);
            if (isNaN(date)) {
              console.error("Invalid date for entry:", entry);
              return { period: null, total_sales: Number(entry.total_sales) };
            }
            return {
              period: date.toISOString(),
              total_sales: Number(entry.total_sales)
            };
          });
          setSalesData(formattedData);
        } catch (err) {
          setError(err);
        } finally {
          setLoading(false);
        }
      };
  
      loadSalesData();
    }, [start, end]);
  
    return { salesData, loading, error };
};

export default useSalesDuringDay;
