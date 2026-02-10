import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import tailwindcss from "@tailwindcss/vite";
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // 路径解析配置
  resolve: {
    alias: {
      // 配置 @ 别名指向 src 目录
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      // 将 /api 开头的请求代理到后端
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },
});
