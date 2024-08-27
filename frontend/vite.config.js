import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/caption": {
        target: "http://127.0.0.1:5000", // Apunta al host donde se ejecuta Flask
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/caption/, ""),
      },
    },
  },
});
