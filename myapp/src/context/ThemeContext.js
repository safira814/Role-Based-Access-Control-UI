import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const useTheme = () => {
  return useContext(ThemeContext);
};

export const ThemeProvider = ({ children }) => {
  // Get the theme from localStorage or default to 'light'
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // Effect to update the body class and localStorage whenever the theme changes
  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem("theme", theme); // Save theme in localStorage
  }, [theme]);

  // Toggle theme between 'light' and 'dark'
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
