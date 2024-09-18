import { resolve } from "path";
import { defineConfig } from "vite";
export default defineConfig({
  build: {
    outDir: "dist",
    rollupOptions: {
      input: {
        background: resolve(__dirname, "src/background.ts"),
        content: resolve(__dirname, "src/content.ts"),
        popup: resolve(__dirname, "src/popup.html"),
        inject_style: resolve(__dirname, "src/inject_style.css"),
      },
      output: {
        format: "esm",
        entryFileNames: "src/[name].js",
        assetFileNames: "assets/[name].[ext]",
      },
    },
  },
});
