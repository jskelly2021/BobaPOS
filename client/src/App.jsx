import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import CashierMenu from './pages/CashierMenu'
import EmployeeLogin from './pages/EmployeeLogin'
import OrderReview from './pages/OrderReview'
import Dashboard from './pages/Dashboard'
import Admin from './pages/Admin'

function App() {
  return (
    <BrowserRouter>
        <div className="App">
            <Routes>
                <Route path="/" element={<EmployeeLogin />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/menu" element={<CashierMenu />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/review" element={<OrderReview />} />
            </Routes>
        </div>
    </BrowserRouter>
  );
}

export default App;
