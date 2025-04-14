// client/src/hooks/useAnalytics.js
import { useState, useEffect } from 'react';
import { fetchTopSellingProducts, fetchSalesOverDays } from '../services/analyticsService';

const useAnalytics = (start, end) => {
  const [topSellingData, setTopSellingData] = useState([]);
  const [salesOverDaysData, setSalesOverDaysData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Run both data requests concurrently
        const [topSellingResult, salesOverDaysResult] = await Promise.all([
          fetchTopSellingProducts(), // Uses the default limit inside the service
          fetchSalesOverDays(start, end) // Pass the date parameters
        ]);

        // Format top-selling data: each object should have a name and a numerical value.
        const formattedTopSelling = topSellingResult.map(item => ({
          name: item.item_name,
          value: Number(item.total_sold)
        }));

        // Format the sales-over-days data.
        // This assumes each entry has 'period' (a date string) and 'total_sales' (a numeric string or number).
        const formattedSalesOverDays = salesOverDaysResult.map(entry => ({
          period: new Date(entry.period).toLocaleDateString(),
          total_sales: Number(entry.total_sales)
        }));

        setTopSellingData(formattedTopSelling);
        setSalesOverDaysData(formattedSalesOverDays);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [start, end]);

  return { topSellingData, salesOverDaysData, loading, error };
};

export default useAnalytics;
