import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopSellingProducts from '../components/analytics/TopSellingProducts';
import SalesDuringDayChart from '../components/analytics/SalesDuringDay';
import SalesOverDays from '../components/analytics/SalesOverDays';
import SalesOverWeeksChart from '../components/analytics/SalesOverWeeks';
import SalesOverMonthsChart from '../components/analytics/SalesOverMonths';
import ProductUsage from '../components/analytics/ProductUsage';
import ZReport from '../components/analytics/ZReport';
import './Analytics.css';

const Analytics = () => {
    const nav = useNavigate();
    const [activePage, setActivePage] = useState('TopSellingProducts');

    // States for Sales During Day chart date range
    const [salesDayStart, setSalesDayStart] = useState('2024-12-01'); //Set to current Day
    const [salesDayEnd, setSalesDayEnd] = useState('2024-12-01'); //Set to current Day

    // States for Sales Over Days chart date range
    const [salesMultipleDayStart, setSalesMultipleDayStart] = useState('2024-12-01');
    const [salesMultipleDayEnd, setSalesMultipleDayEnd] = useState('2024-12-08');

    // States for Sales Over Weeks chart date range
    const [salesWeekStart, setSalesWeekStart] = useState('2024-12-01');
    const [salesWeekEnd, setSalesWeekEnd] = useState('2024-12-31');

    // States for Sales Over Months chart date range
    const [salesMonthStart, setSalesMonthStart] = useState('2024-08-01');
    const [salesMonthEnd, setSalesMonthEnd] = useState('2025-02-01');

    // Convert the selected dates to ISO strings so chart components can use them.
    //  You may wish to append specific times if required.
    const salesDayStartISO = new Date(salesDayStart).toISOString();
    const salesDayEndISO = new Date(salesDayEnd).toISOString();
    const salesMultipleDayStartISO = new Date(salesMultipleDayStart).toISOString();
    const salesMultipleDayEndISO = new Date(salesMultipleDayEnd).toISOString();
    const salesWeekStartISO = new Date(salesWeekStart).toISOString();
    const salesWeekEndISO = new Date(salesWeekEnd).toISOString();
    const salesMonthStartISO = new Date(salesMonthStart).toISOString();
    const salesMonthEndISO = new Date(salesMonthEnd).toISOString();

    return (
        <div className='Analytics'>
            <div className='AnalyticsPages'>
                <button className='DashboardBtn' onClick={() => nav('/dashboard')}>Dashboard</button>
                <button onClick={() => setActivePage('TopSellingProducts')}>Top Selling Products</button>
                <button onClick={() => setActivePage('SalesDuringDay')}>Sales During Day</button>
                <button onClick={() => setActivePage('SalesOverDays')}>Sales Over Days</button>
                <button onClick={() => setActivePage('SalesOverWeeks')}>Sales Over Weeks</button>
                <button onClick={() => setActivePage('SalesOverMonths')}>Sales Over Months</button>
                <button onClick={() => setActivePage('ProductUsage')}>Product Usage</button>
                <button onClick={() => setActivePage('ZReport')}>Z-Report</button>
            </div>

            <h1>Analytics Dashboard</h1>
             {/* Conditional Date Inputs for Charts that require a date range */}
            {activePage === 'SalesDuringDay' && (
                <div className="date-selectors">
                <label>
                    Sales During Day - Start Date:&nbsp;
                    <input
                    type="date"
                    value={salesDayStart}
                    onChange={(e) => setSalesDayStart(e.target.value)}
                    />
                </label>
                <label>
                    &nbsp;End Date:&nbsp;
                    <input
                    type="date"
                    value={salesDayEnd}
                    onChange={(e) => setSalesDayEnd(e.target.value)}
                    />
                </label>
                </div>
            )}

            {activePage === 'SalesOverDays' && (
                <div className="date-selectors">
                <label>
                    Sales During Days - Start Date:&nbsp;
                    <input
                    type="date"
                    value={salesMultipleDayStart}
                    onChange={(e) => setSalesMultipleDayStart(e.target.value)}
                    />
                </label>
                <label>
                    &nbsp;End Date:&nbsp;
                    <input
                    type="date"
                    value={salesMultipleDayEnd}
                    onChange={(e) => setSalesMultipleDayEnd(e.target.value)}
                    />
                </label>
                </div>
            )}

            {activePage === 'SalesOverWeeks' && (
                <div className="date-selectors">
                <label>
                    Sales Over Weeks - Start Date:&nbsp;
                    <input
                    type="date"
                    value={salesWeekStart}
                    onChange={(e) => setSalesWeekStart(e.target.value)}
                    />
                </label>
                <label>
                    &nbsp;End Date:&nbsp;
                    <input
                    type="date"
                    value={salesWeekEnd}
                    onChange={(e) => setSalesWeekEnd(e.target.value)}
                    />
                </label>
                </div>
            )}

            {activePage === 'SalesOverMonths' && (
                <div className="date-selectors">
                <label>
                    Sales Over Months - Start Date:&nbsp;
                    <input
                    type="date"
                    value={salesMonthStart}
                    onChange={(e) => setSalesMonthStart(e.target.value)}
                    />
                </label>
                <label>
                    &nbsp;End Date:&nbsp;
                    <input
                    type="date"
                    value={salesMonthEnd}
                    onChange={(e) => setSalesMonthEnd(e.target.value)}
                    />
                </label>
                </div>
            )}

            {activePage === 'TopSellingProducts' && <TopSellingProducts />}
            {activePage === 'SalesDuringDay' && <SalesDuringDayChart start={salesDayStartISO} end={salesDayEndISO} />}
            {activePage === 'SalesOverDays' && <SalesOverDays start={salesMultipleDayStartISO} end={salesMultipleDayEndISO} />}
            {activePage === 'SalesOverWeeks' && <SalesOverWeeksChart start={salesWeekStartISO} end={salesWeekEndISO} />}
            {activePage === 'SalesOverMonths' && <SalesOverMonthsChart start={salesMonthStartISO} end={salesMonthEndISO} />}
            {activePage === 'ProductUsage' && <ProductUsage />}
            {activePage === 'ZReport' && <ZReport />}
        </div>
    );
};

export default Analytics;
