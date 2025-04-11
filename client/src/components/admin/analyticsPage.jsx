// client/src/pages/AnalyticsPage.jsx
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import useAnalytics from '../../hooks/useAnalytics';

const AnalyticsPage = () => {
  const { data, loading, error } = useAnalytics();

  // Define a color palette for the pie slices.
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AA336A'];

  if (loading) return <p>Loading analytics data...</p>;
  if (error) return <p>Error fetching analytics data: {error.message}</p>;
  if (!data || data.length === 0) return <p>No analytics data available.</p>;

  return (
    <div>
      <h2>Analytics</h2>
      <PieChart width={500} height={400}>
        <Pie
          data={data}
          cx={250}
          cy={200}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) =>
            `${name} (${(percent * 100).toFixed(0)}%)`
          }
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend verticalAlign="bottom" height={36} />
      </PieChart>
    </div>
  );
};

export default AnalyticsPage;
