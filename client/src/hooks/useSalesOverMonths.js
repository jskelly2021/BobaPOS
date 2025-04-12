// client/src/hooks/useSalesOverMonths.js
import { useState, useEffect } from 'react';
import { fetchSalesOverMonths } from '../services/analyticsService';

const useSalesOverMonths = (start, end) => {
  const [salesData, setSalesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadSalesData = async () => {
      setLoading(true);
      setError(null);
      try {
        // The API should return data with a 'period' property indicating the start of the month.
        const data = await fetchSalesOverMonths(start, end);
        const formattedData = data.map(entry => ({
          period: new Date(entry.period).toISOString(),
            // period: new Date(entry.period).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
          total_sales: Number(entry.total_sales)
        }));
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

export default useSalesOverMonths;
