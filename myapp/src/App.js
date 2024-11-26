import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import ErrorBoundary from './components/ErrorBoundary';
import UserManagement from './pages/UserManagement';
import RoleManagement from './pages/RoleManagement';
import PermissionManagement from './pages/PermissionManagement';
import WelcomeSection from './components/WelcomeSection'; // Import the new component
import { useTheme } from './context/ThemeContext'; // Import the theme hook
import { FaMoon, FaSun } from 'react-icons/fa'; // Import icons for toggle

const App = () => {
  const { theme, toggleTheme } = useTheme(); // Access theme context and toggle function

  return (
    <ErrorBoundary>
      <Router>
        {/* Optionally, include the theme toggle here or inside Navbar
        <header className="App-header">
          <h1></h1>
          <button onClick={toggleTheme} className="theme-toggle-btn">
            {theme === 'light' ? <FaMoon /> : <FaSun />}
          </button>
        </header> */}

        {/* Main Application Routing */}
        <Navbar />
        <div className="container mx-auto mt-8">
          <Routes>
            <Route path="/" element={<WelcomeSection />} />
            <Route path="/users" element={<UserManagement />} />
            <Route path="/roles" element={<RoleManagement />} />
            <Route path="/permissions" element={<PermissionManagement />} />
          </Routes>
        </div>
      </Router>
    </ErrorBoundary>
  );
};

export default App;
