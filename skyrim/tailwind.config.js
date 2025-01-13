/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {

    },
  },
  plugins: [daisyui],
  darkMode: "class", // 使用 class 模式
  daisyui: {
    themes: [
      {
        light: {
          primary: "3E5879",
          secondary: "F5EFE7",
          accent: "#37cdbe",
          neutral: "#3d4451",
          "base-100": "#ffffff", 
          "base-200": "D8C4B6", 
          "base-300": "F5EFE7", // background color light yellow
          "base-content": "#1f2937", // Light 模式文本颜色
          "font-family": "Raleway, serif",
        
        },
        dark: {
          primary: "#D8C4B6", 
          secondary: "#f472b6",
          accent: "#67e8f9",
          neutral: "#1e293b",
          "base-100": "#1a202c", // Dark 模式背景
          "base-200": "#2d3748", // Dark 模式次背景
          "base-300": "213555", // background color dark blue
          "base-content": "#f8fafc", // Dark 模式文本颜色
          
        },
      },
    ],
  },
};
