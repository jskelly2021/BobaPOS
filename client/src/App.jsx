import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import EmployeeLogin from './components/EmployeeLogin'

function App() {
  return (
    <BrowserRouter>
        <div className="App">
            <switch>
                <Route exact path="/" component={EmployeeLogin} />
                <Route exact path="/menu" component={ItemList} />
            </switch>
        </div>
    </BrowserRouter>
  );
}

export default App;
