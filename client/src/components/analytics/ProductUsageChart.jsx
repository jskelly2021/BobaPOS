
import React from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const ProductUsageChart = ({ loading, error, data }) => {
    if (loading) return <p>Loading data...</p>;
    if (error) return <p>Error fetching ingredient usage data: {error.message}</p>;

    return (
        <div>
            <LineChart width={600} height={300} data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="period" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="total_usage" stroke="#8884d8" />
            </LineChart>
        </div>
    );
}

export default ProductUsageChart;
