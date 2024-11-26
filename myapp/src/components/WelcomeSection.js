import React from 'react';
import { useTheme } from '../context/ThemeContext'; // Import theme context

const WelcomeSection = () => {
  const { theme } = useTheme(); // Access the current theme (light/dark)

  // Theme-based styles
  const containerStyles = theme === "light" ? "bg-white text-black" : "bg-gray-800 text-white";
  const buttonStyles = theme === "light" ? "bg-blue-500 hover:bg-blue-600 text-white" : "bg-blue-400 hover:bg-blue-500 text-white";

  return (
    <div className={`welcome-section p-6 shadow-md rounded-lg ${containerStyles}`}>
      <h1 className="text-3xl font-semibold mb-4">Welcome to RBAC Dashboard</h1>
      <p className="text-lg mb-4">
        Manage roles, users, and permissions with ease. Explore the powerful features of our system.
      </p>
      <button onClick={() => alert('Start Exploring!')} className={`px-6 py-3 rounded ${buttonStyles}`}>
        Get Started
      </button>
    </div>
  );
};

export default WelcomeSection;
