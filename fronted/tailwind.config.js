// tailwind.config.js (ES 模块格式)
import tailwindcssAnimate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx,js,jsx}", // 覆盖所有源码文件
  ],
  theme: {
    extend: {},
  },
  plugins: [
    tailwindcssAnimate, // 替换 require 为 import
  ],
};