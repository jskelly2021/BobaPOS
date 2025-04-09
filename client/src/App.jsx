import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Menu from './pages/CashierOrderView'
import EmployeeLogin from './pages/EmployeeLogin'
import Welcome from './pages/Welcome'
import OrderReview from './pages/OrderReview'
import Dashboard from './pages/Dashboard'
import Admin from './pages/Admin'
import Payment from './pages/Payment'

function App() {
  return (
    <BrowserRouter>
        <div className="App">
            <Routes>
                <Route path="/" element={<EmployeeLogin />} />
                <Route path="/welcome" element={<Welcome />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/review" element={<OrderReview />} />
                <Route path="/payment" element={<Payment />} />
            </Routes>
        </div>
    </BrowserRouter>
  );
}

export default App;
