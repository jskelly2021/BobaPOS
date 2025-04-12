import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Redirect from './Redirect'
import CashierOrderView from './pages/CashierOrderView'
import CustomerOrderView from './pages/CustomerOrderView'
import EmployeeLogin from './pages/EmployeeLogin'
import Welcome from './pages/Welcome'
import OrderReview from './pages/OrderReview'
import Dashboard from './pages/Dashboard'
import Admin from './pages/Admin'
import Analytics from './pages/Analytics'
import Payment from './pages/Payment'

function App() {
  return (
    <BrowserRouter>
        <div className="App">
            <Routes>
                <Route path="/" element={<Redirect />} />
                <Route path="/login" element={<EmployeeLogin />} />
                <Route path="/welcome" element={<Welcome />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/menu/cashier" element={<CashierOrderView />} />
                <Route path="/menu/customer" element={<CustomerOrderView />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/review" element={<OrderReview />} />
                <Route path="/payment" element={<Payment />} />
            </Routes>
        </div>
    </BrowserRouter>
  );
}

export default App;
