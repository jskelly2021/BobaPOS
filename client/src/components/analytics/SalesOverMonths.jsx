import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import useSalesOverMonths from '../../hooks/useSalesOverMonths';

const SalesOverMonthsChart = ({ start, end }) => {
  const { salesData, loading, error } = useSalesOverMonths(start, end);

  if (loading) return <p>Loading monthly sales data...</p>;
  if (error) return <p>Error fetching monthly sales data: {error.message}</p>;
  if (!salesData || salesData.length === 0) return <p>No monthly sales data available.</p>;

  return (
    <div>
      <h2>Sales Over Months</h2>
      <LineChart width={600} height={400} data={salesData}>
        <XAxis
          dataKey="period"
          tickFormatter={(value) => {
            const date = new Date(value);
            // Here we format the date to show something like "Jan 2024"
            return new Intl.DateTimeFormat('en-US', {
              timeZone: 'UTC',
              month: 'short',
              year: 'numeric'
            }).format(date);
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

export default SalesOverMonthsChart;
