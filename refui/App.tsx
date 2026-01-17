
import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { ToastProvider } from './components/ui';
import Dashboard from './pages/Dashboard';
import Practice from './pages/Practice';
import ProblemDetail from './pages/ProblemDetail';
import Contests from './pages/Contests';
import WarRoom from './pages/WarRoom';
import Interview from './pages/Interview';
import Profile from './pages/Profile';
import LandingPage from './pages/LandingPage';

const App: React.FC = () => {
  // Simple state to simulate authentication
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return (
      <ToastProvider>
        <LandingPage onLogin={handleLogin} />
      </ToastProvider>
    );
  }

  return (
    <ToastProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout onLogout={handleLogout} />}>
            <Route index element={<Dashboard />} />
            <Route path="practice" element={<Practice />} />
            <Route path="practice/:id" element={<ProblemDetail />} />
            <Route path="contests" element={<Contests />} />
            <Route path="war-room" element={<WarRoom />} />
            <Route path="interview" element={<Interview />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </Router>
    </ToastProvider>
  );
};

export default App;
