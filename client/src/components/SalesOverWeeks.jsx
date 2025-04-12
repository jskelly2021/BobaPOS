// client/src/components/SalesOverWeeksChart.jsx
import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import useSalesOverWeeks from '../hooks/useSalesOverWeeks';

const SalesOverWeeksChart = ({ start, end }) => {
  const { salesData, loading, error } = useSalesOverWeeks(start, end);

  if (loading) return <p>Loading weekly sales data...</p>;
  if (error) return <p>Error fetching weekly sales data: {error.message}</p>;
  if (!salesData || salesData.length === 0) return <p>No weekly sales data available.</p>;

  return (
    <div>
      <h2>Sales Over Weeks</h2>
      <LineChart width={600} height={400} data={salesData}>
        <XAxis
          dataKey="period"
          tickFormatter={(value) => {
            // Convert the ISO string to a Date object.
            const date = new Date(value);
            // Adjust the format as desired. For weeks, you might show the start date of the week.
            // Here we use a simple "MM/DD" format in Texas time:
            return new Intl.DateTimeFormat('en-US', {
              timeZone: 'UTC',
              month: '2-digit',
              day: '2-digit'
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

export default SalesOverWeeksChart;
