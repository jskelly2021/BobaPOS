
import React from 'react'
import { LineChart } from 'recharts';
import useAnalytics from '../../hooks/useProductUsage';
import useProductUsage from '../../hooks/useProductUsage';

const ProductUsage = () => {
    const { usageData, loading, error, getUsageFromLast24Hours } = useProductUsage();

    if (loading) return <p>Loading data...</p>;
    if (error) return <p>Error fetching ingredient usage data: {error.message}</p>;

    return (
        <div>
            {usageData}
        </div>
    );
}

export default ProductUsage;
