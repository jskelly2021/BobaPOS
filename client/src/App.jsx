import './App.css';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

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
import Unauthorized from './pages/Unauthorized'; // simple 403 page
import { RequireAuth } from './components/RequireAuth';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="App">
            <Routes>
                <Route path="/" element={<Redirect />} />
                <Route path="/login" element={<EmployeeLogin />} />
                <Route path="/unauthorized" element={<Unauthorized />} />
                
                {/* routes for both cashiers & managers */}
                <Route element={<RequireAuth allowedRoles={['CASHIER','MANAGER']} />}>
                  <Route path="/welcome" element={<Welcome />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/menu/cashier" element={<CashierOrderView />} />
                  <Route path="/menu/customer" element={<CustomerOrderView />} />
                  <Route path="/review" element={<OrderReview />} />
                  <Route path="/payment" element={<Payment />} />
                </Route>

                {/* routes for managers only */}
                <Route element={<RequireAuth allowedRoles={['MANAGER']} />}>
                  <Route path="/admin" element={<Admin />} />
                  <Route path="/analytics" element={<Analytics />} />
                </Route>

            </Routes>
          </div>
      </BrowserRouter>
  </AuthProvider>
  );
}

export default App;
