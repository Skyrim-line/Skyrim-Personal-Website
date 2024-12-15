/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"], // 监控 src 文件夹下的所有相关文件
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#3b82f6", // 亮色主题主要颜色
          dark: "#1e3a8a", // 暗色主题主要颜色
        },
        background: {
          light: "#ffffff",
          dark: "#1f1f1f", // 更偏灰色的暗色背景
        },
        text: {
          light: "#000000",
          dark: "#f5f5f5", // 浅灰色文本，避免纯白太刺眼
        },
      },
    },
  },
  darkMode: "class", // 启用 class 模式切换
  plugins: [require("tailwindcss"), require("autoprefixer")],
};
