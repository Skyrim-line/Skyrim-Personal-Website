// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Home from "./pages/Home";
import ThemeProvider from "./context/theme"; // 引入正确的 ThemeProvider

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          {/* 全局布局 */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
