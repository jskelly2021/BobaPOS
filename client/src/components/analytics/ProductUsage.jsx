
import React from 'react'
import { LineChart } from 'recharts';
import useAnalytics from '../../hooks/useProductUsage';

const ProductUsage = () => {
    const { data, loading, error } = useSalesDuringDay(start, end);

    if (loading) return <p>Loading data...</p>;
    if (error) return <p>Error fetching ingredient usage data: {error.message}</p>;

    return (
        <div>
            Product Usage
        </div>
    );
}

export default ProductUsage;
