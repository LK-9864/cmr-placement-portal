import React, { useState } from 'react';
import './App.css';
import AuthPage from './AuthPage';
import StudentDashboard from './StudentDashboard';
import RecruiterDashboard from './RecruiterDashboard';
import AdminDashboard from './AdminDashboard';

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  const handleLogin = (user) => {
    setLoggedInUser(user);
  };

  const handleLogout = () => {
    setLoggedInUser(null);
  };

  // Not logged in - show auth page
  if (!loggedInUser) {
    return <AuthPage onLogin={handleLogin} />;
  }

  // Route to appropriate dashboard based on user role
  if (loggedInUser.role === 'student') {
    return <StudentDashboard student={loggedInUser} onLogout={handleLogout} />;
  }

  if (loggedInUser.role === 'recruiter') {
    return <RecruiterDashboard recruiter={loggedInUser} onLogout={handleLogout} />;
  }

  if (loggedInUser.role === 'admin') {
    return <AdminDashboard admin={loggedInUser} onLogout={handleLogout} />;
  }

  // Default fallback
  return <AuthPage onLogin={handleLogin} />;
}

export default App;
