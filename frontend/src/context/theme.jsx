import React, { createContext, useState, useEffect, useContext } from "react";

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

const ThemeProvider = ({ children }) => {
  // 默认是亮色模式
  const [darkMode, setDarkMode] = useState(false);

  // 切换主题
  const toggleTheme = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  // 添加/移除 TailwindCSS 的 dark 类
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
