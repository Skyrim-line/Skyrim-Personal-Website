// src/layouts/MainLayout.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const MainLayout = () => {
  const navbarHeight = 100; // 与 Navbar 的高度保持一致
  return (
    <div className="flex flex-col min-h-screen">
      {/* 顶部导航栏 */}
      <Navbar />

      {/* 主内容区域 */}
      <main className="flex-grow" style={{ paddingTop: navbarHeight }}>
        <Outlet />
      </main>

      {/* 底部页脚 */}
      <Footer />
    </div>
  );
};

export default MainLayout;
