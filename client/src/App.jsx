import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import CashierMenu from './pages/CashierMenu'
import EmployeeLogin from './pages/EmployeeLogin'

function App() {
  return (
    <BrowserRouter>
        <div className="App">
            <Routes>
                <Route path="/" element={<EmployeeLogin />} />
                <Route path="/menu" element={<CashierMenu />} />
            </Routes>
        </div>
    </BrowserRouter>
  );
}

export default App;
