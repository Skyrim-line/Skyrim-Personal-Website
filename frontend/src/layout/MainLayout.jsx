import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark">
      {/* 顶部导航栏 */}
      <Navbar />

      {/* 主内容区域 */}
      <main className="flex-grow pt-[100px]">
        <Outlet />
      </main>

      {/* 底部页脚 */}
      <Footer />
    </div>
  );
};

export default MainLayout;
