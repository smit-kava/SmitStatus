import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Target modern browsers — removes legacy polyfills
    target: "esnext",
    // Disable source maps in production (saves ~30% bundle size)
    sourcemap: false,
    // CSS code splitting — loads only the CSS needed per chunk
    cssCodeSplit: true,
    // Chunk splitting: separate vendor libs from app code
    // So when your code changes, users still get cached vendor chunks
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules/react/") || id.includes("node_modules/react-dom/") || id.includes("node_modules/react-router-dom/")) {
            return "react-vendor";
          }
          if (id.includes("node_modules/framer-motion/")) {
            return "motion";
          }
          if (id.includes("node_modules/@mui/") || id.includes("node_modules/@emotion/")) {
            return "mui";
          }
          if (id.includes("node_modules/@radix-ui/")) {
            return "radix";
          }
        },
      },
    },
  },
});
