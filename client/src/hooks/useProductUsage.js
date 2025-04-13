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

    const getUsage = (interval, start, end) => {
        setInterval(interval);
        setStart(start);
        setEnd(end);
    }

    const getUsageFromLast24Hours = () => { getUsage( 'hour', subHours(Date.now(), 96), Date.now()); }
    const getUsageFromLast14Days = () =>  { getUsage( 'day', subDays(Date.now(), 14), Date.now()); }
    const getUsageFromLast3Months = () => { getUsage( 'week', subWeeks(Date.now(), 12), Date.now()); }
    const getUsageFromLastYear = () =>    { getUsage( 'month', subMonths(Date.now(), 12), Date.now()); }

    const setIngredient = (id) => { setIngredientId(id); }

    return {
        usageData,
        loading,
        error,
        getUsageFromLast24Hours,
        getUsageFromLast14Days,
        getUsageFromLast3Months,
        getUsageFromLastYear,
        setIngredient
    };
}

export default useProductUsage;
