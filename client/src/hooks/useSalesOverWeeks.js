// client/src/hooks/useSalesOverWeeks.js
import { useState, useEffect } from 'react';
import { fetchSalesOverWeeks } from '../services/analyticsService';

const useSalesOverWeeks = (start, end) => {
  const [salesData, setSalesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const loadSalesData = async () => {
      setLoading(true);
      setError(null);
      try {
        // The API is assumed to return an array where each entry has a 'period' (week start) property.
        const data = await fetchSalesOverWeeks(start, end);
        const formattedData = data.map(entry => ({
          // Preserve as ISO string—later formatted in the tickFormatter.
          period: new Date(entry.period).toISOString(), // TRY MONTH FORMATTER 
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

export default useSalesOverWeeks;
