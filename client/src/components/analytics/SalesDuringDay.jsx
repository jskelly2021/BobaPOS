import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import useSalesDuringDay from '../../hooks/useSalesDuringDay';

const SalesDuringDayChart = ({ start, end }) => {
  const { salesData, loading, error } = useSalesDuringDay(start, end);

  if (loading) return <p>Loading sales data...</p>;
  if (error) return <p>Error fetching sales data: {error.message}</p>;
  if (!salesData || salesData.length === 0) return <p>No sales data available.</p>;

  return (
    <div>
        <h2>Sales During Day</h2>
        <LineChart width={600} height={400} data={salesData}>
            <XAxis
            dataKey="period"
            tickFormatter={(value) => {
                // Create a Date object from the value (which is in ISO format, in UTC)
                const date = new Date(value);
                // Format the hour in the 'America/Chicago' time zone (Central Time)
                const formattedHour = new Intl.DateTimeFormat('en-US', {
                timeZone: 'UTC',
                hour: '2-digit',
                hour12: false}).
                format(date);
                // Append ":00" if you like, or simply return the formatted hour.
                return `${formattedHour}:00`;
            }}
            />
            <YAxis />
            <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="total_sales" stroke="#8884d8" />
        </LineChart>
    </div>
  );
};

export default SalesDuringDayChart;
