// client/src/hooks/useAnalytics.js
import { useState, useEffect } from 'react';
import { fetchTopSellingProducts } from '../services/analyticsService';

const useAnalytics = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);

      try {
        const result = await fetchTopSellingProducts();
        // Format data for Recharts: Each object needs 'name' and 'value'.
        const formattedData = result.map(item => ({
          name: item.item_name,
          value: Number(item.total_sold)
        }));
        setData(formattedData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return { data, loading, error };
};

export default useAnalytics;
