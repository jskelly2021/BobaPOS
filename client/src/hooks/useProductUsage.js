import { useState, useEffect } from 'react';
import { subHours, subDays, subWeeks, subMonths } from 'date-fns';
import { fetchProductUsage } from '../services/analyticsService';

const useProductUsage = () => {
    const [usageData, setUsageData]       = useState([]);
    const [ingredientId, setIngredientId] = useState(1);
    const [interval, setInterval]         = useState('day');
    const [start, setStart]               = useState(subDays(Date.now(), 14));
    const [end, setEnd]                   = useState(Date.now());
    const [loading, setLoading]           = useState(true);
    const [error, setError]               = useState(null);

    useEffect(() => {
        const loadUsageData = async () => {
            setLoading(true);
            setError(null);

            try {
                const data = await fetchProductUsage(ingredientId, interval, start, end);
                setUsageData(data);
            } catch (e) {
                setError(e);
            } finally {
                setLoading(false);
            }
        };

        loadUsageData();
    }, [ingredientId, interval, start, end]);

    const getUsage = (id, interval, start, end) => {
        setIngredientId(id);
        setInterval(interval);
        setStart(start);
        setEnd(end);
    }

    const getUsageFromLast24Hours = (id) => { getUsage(id, 'hour', subHours(Date.now(), 24), Date.now()); }
    const getUsageFromLast14Days = (id) =>  { getUsage(id, 'day', subDays(Date.now(), 14), Date.now()); }
    const getUsageFromLast3Months = (id) => { getUsage(id, 'week', subWeeks(Date.now(), 12), Date.now()); }
    const getUsageFromLastYear = (id) =>    { getUsage(id, 'month', subMonths(Date.now(), 12), Date.now()); }

    return {
        usageData,
        loading,
        error,
        getUsageFromLast24Hours,
        getUsageFromLast14Days,
        getUsageFromLast3Months,
        getUsageFromLastYear
    };
}

export default useProductUsage;
