import React from "react";
import { Link } from "react-router-dom"; // Importing Link for routing
import { useTheme } from "../context/ThemeContext"; // Import the theme context
import { FaMoon, FaSun } from "react-icons/fa"; // Icons for light/dark theme

const Navbar = () => {
  const { theme, toggleTheme } = useTheme(); // Get theme and toggle function from context

  return (
    <nav className="bg-blue-600 p-4 shadow-lg">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold mb-4 flex items-center">Dashboard</h1>
        <div className="flex items-center space-x-4">
          {/* Navigation Links */}
          <Link
            to="/"
            className="text-white hover:text-blue-200 transition-colors duration-300"
          >
            Home
          </Link>
          <Link
            to="/roles"
            className="text-white hover:text-blue-200 transition-colors duration-300"
          >
            Roles
          </Link>
          <Link
            to="/permissions"
            className="text-white hover:text-blue-200 transition-colors duration-300"
          >
            Permissions
          </Link>
          <Link
            to="/users"
            className="text-white hover:text-blue-200 transition-colors duration-300"
          >
            Users
          </Link>
          
          {/* Theme Toggle Button */}
          <button
            className="theme-toggle-btn bg-transparent border-2 border-white p-2 rounded-full flex justify-center items-center ml-4"
            onClick={toggleTheme}
          >
            {theme === "light" ? <FaMoon className="text-white" /> : <FaSun className="text-white" />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
