import './App.css';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import AuthForm from './AuthForm';
import IncomePage from './IncomePage';
import ExpensePage from './ExpensePage';
import Dashboard from './Dashboard';
import LandingPage from './LandingPage';

function App () {
  return (
    <BrowserRouter>
      <div className="app-nav">
        <nav style={{ display: 'flex', gap: 12, padding: 12, alignItems: 'center' }}>
          <NavLink to="/dashboard" style={({isActive}) => ({ color: isActive ? '#00b37e' : undefined })}>Dashboard</NavLink>
          <NavLink to="/Landing" style={({isActive}) => ({ color: isActive ? '#00b37e' : undefined })}>Landing Page</NavLink>
          <NavLink to="/income" style={({isActive}) => ({ color: isActive ? '#00b37e' : undefined })}>Income</NavLink>
          <NavLink to="/expense" style={({isActive}) => ({ color: isActive ? '#00b37e' : undefined })}>Expense</NavLink>
          <NavLink to="/auth" style={({isActive}) => ({ color: isActive ? '#00b37e' : undefined })}>Auth</NavLink>
        </nav>
      </div>

      <Routes>
        <Route path="/Landing" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/income" element={<IncomePage />} />
        <Route path="/expense" element={<ExpensePage />} />
        <Route path="/auth" element={<AuthForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
