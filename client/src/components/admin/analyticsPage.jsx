// Example: client/src/pages/AnalyticsPage.jsx
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';
import SalesDuringDayChart from '../SalesDuringDay';
import SalesOverWeeksChart from '../SalesOverWeeks';
import SalesOverMonthsChart from '../SalesOverMonths';
import useAnalytics from '../../hooks/useAnalytics';

const AnalyticsPage = () => {
  // Optionally pass date parameters, or leave blank to use defaults.
  const { topSellingData, salesOverDaysData, loading, error } = useAnalytics();

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AA336A'];
  // start and end times for the SalesDuringDayChart by hour
  const startTimeDay = new Date('2024-12-01T08:00:00Z').toISOString();
  const endTimeDay = new Date('2024-12-01T22:00:00Z').toISOString();

  const startTimeWeek = new Date('2024-12-01T00:00:00Z').toISOString();
  const endTimeWeek = new Date('2024-12-31T23:59:59Z').toISOString();

  const startTimeMonth = new Date('2024-08-01T00:00:00Z').toISOString();
  const endTimeMonth = new Date('2025-02-01T23:59:59Z').toISOString();


  if (loading) return <p>Loading analytics data...</p>;
  if (error) return <p>Error fetching analytics data: {error.message}</p>;

  return (
    <div>
      <h1>Analytics Dashboard</h1>
      <h2>Top Selling Products</h2>
      <PieChart width={500} height={400}>
        <Pie
          data={topSellingData}
          cx={250}
          cy={200}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
        >
          {topSellingData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend verticalAlign="bottom" height={36} />
      </PieChart>

      <h2>Sales Over Days</h2>
      <LineChart width={600} height={400} data={salesOverDaysData}>
        <XAxis dataKey="period" />
        <YAxis />
        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="total_sales" stroke="#8884d8" />
      </LineChart>

      <SalesDuringDayChart start={startTimeDay} end={endTimeDay} />

      {/* Add additional chart components here in the same pattern */}
      <SalesOverWeeksChart start={startTimeWeek} end={endTimeWeek} />
      <SalesOverMonthsChart start={startTimeMonth} end={endTimeMonth} />

    </div>
  );
};

export default AnalyticsPage;
