import { useState, useEffect } from 'react';
import {  } from '../services/analyticsService';

const useProductUsage = () => {
    const [data, setdata] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        
    })

    return { data, loading, error };
}

export default useProductUsage;