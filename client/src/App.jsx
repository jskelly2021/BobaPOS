import './App.css';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import React, { useState, useEffect } from 'react';
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

if (typeof window !== 'undefined') {
  window.addEventListener('error', (event) => {
    if (event.message === 'Script error.') {
      event.stopImmediatePropagation();
    }
  }, true);
}

// Toggle button only on Welcome and Dashboard
function ContrastToggle({ highContrast, setHighContrast }) {
  const { pathname } = useLocation();
  const showOn = ['/welcome', '/dashboard'];
  if (!showOn.includes(pathname)) return null;

  return (
    <button
      onClick={() => setHighContrast(!highContrast)}
      aria-pressed={highContrast}
      aria-label="Toggle high contrast mode"
      style={{
        position: 'fixed',
        top: '1rem',
        right: '1rem',
        zIndex: 1000,
      }}
    >
      {highContrast ? 'Normal Contrast' : 'High Contrast'}
    </button>
  );
}

function FontSizeToggle({ fontSize, setFontSize }) {
  const { pathname } = useLocation();
  const showOn = ['/welcome', '/dashboard'];
  if (!showOn.includes(pathname)) return null;

  const toggleFontSize = () => {
    setFontSize(prev => (prev === 100 ? 140 : 100));
  };

  return (
    <button
      onClick={toggleFontSize}
      style={{
        position: 'fixed',
        top: '1rem',
        right: '10rem',
        zIndex: 1000,
      }}
      aria-label="Toggle font size"
    >
      {fontSize === 100 ? 'Zoom In' : 'Reset Zoom'}
    </button>
  );
}

function App() {
  // load saved preference
  const [highContrast, setHighContrast] = useState(
    () => localStorage.getItem('highContrast') === 'on'
  );

  // saved font size preference
  const [fontSize, setFontSize] = useState(() => {
    const stored = localStorage.getItem('fontSize');
    return stored ? parseInt(stored) : 100;
  });

  // Apply or remove class on <html> and persist choice
  useEffect(() => {
    const root = document.documentElement;
    if (highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }
    localStorage.setItem('highContrast', highContrast ? 'on' : 'off');
  }, [highContrast]);

  // Apply font size to <html> and persist choice
  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}%`;
    localStorage.setItem('fontSize', fontSize);
  }, [fontSize]);


  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="App">
          {/* high-contrast toggle */}

          <ContrastToggle
            highContrast={highContrast}
            setHighContrast={setHighContrast}
          />

          <FontSizeToggle
            fontSize={fontSize}
            setFontSize={setFontSize}
          />



          <Routes>
            <Route path="/" element={<Redirect />} />
            <Route path="/login" element={<EmployeeLogin />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="/welcome" element={<Welcome />} />
            <Route path="/menu/customer" element={<CustomerOrderView />} />

            {/* routes for both cashiers & managers */}
            <Route element={<RequireAuth allowedRoles={['CASHIER', 'MANAGER']} />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/menu/cashier" element={<CashierOrderView />} />

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
