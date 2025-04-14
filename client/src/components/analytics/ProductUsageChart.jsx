
import React from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Label } from 'recharts';

const ProductUsageChart = ({ loading, error, data, dateLabelType }) => {
    if (loading) return <p>Loading data...</p>;
    if (error) return <p>Error fetching ingredient usage data: {error.message}</p>;

    const dateFormatter = (str) => {
        const date = new Date(str);

        switch (dateLabelType) {
            case "hourly":
                return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            case "daily":
                return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
            case "monthly":
                return date.toLocaleDateString(undefined, { month: 'short', year: 'numeric' });
            default:
                return date.toLocaleDateString();
        }
    };

    return (
        <div>
            <LineChart width={600} height={300} data={data} margin={{ top: 10, right: 20, left: 20, bottom: 15 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="period" tickFormatter={dateFormatter}>
                    <Label
                            value='Date Time'
                            dy={20} 
                            position='inside bottom'
                    />
                </XAxis>

                <YAxis>
                    <Label
                        value='Total Usage (kg)' 
                        angle={-90}
                        dx={-40}
                        position='insideleft'
                    />
                </YAxis>

                <Tooltip labelFormatter={dateFormatter}/>
                <Line type="monotone" dataKey="total_usage" stroke="#8884d8" />
            </LineChart>
        </div>
    );
}

export default ProductUsageChart;
