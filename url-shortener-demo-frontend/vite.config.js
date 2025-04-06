import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@the-node-forge/url-shortener":
        "/Users/drew/Desktop/url-shortener/dist/esm",
    },
  },
});
