
import React from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import useProductUsage from '../../hooks/useProductUsage';

const ProductUsage = () => {
    const { usageData, loading, error, getUsageFromLast24Hours } = useProductUsage();

    if (loading) return <p>Loading data...</p>;
    if (error) return <p>Error fetching ingredient usage data: {error.message}</p>;

    return (
        <div>
            <LineChart width={600} height={300} data={usageData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="period" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="total_usage" stroke="#8884d8" />
            </LineChart>
        </div>
    );
}

export default ProductUsage;
