import react from "@vitejs/plugin-react-swc";
import { resolve } from "path";
import { defineConfig } from "vite";
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
    rollupOptions: {
      input: {
        background: resolve(__dirname, "src/background"),
        homepage: resolve(__dirname, "src/content/homepage.ts"),
        record: resolve(__dirname, "src/content/record.ts"),
        inject_style: resolve(__dirname, "src/style/inject_style.css"),
        popup: resolve(__dirname, "src/popup.html"),
      },
      output: {
        format: "esm",
        entryFileNames: "src/[name].js",
        assetFileNames: "assets/[name].[ext]",
      },
    },
  },
});
