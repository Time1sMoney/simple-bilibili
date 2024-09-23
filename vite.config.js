import react from "@vitejs/plugin-react-swc";
import { resolve } from "path";
import { defineConfig } from "vite";
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: "@",
        replacement: resolve(__dirname, "src"),
      },
    ],
  },
  build: {
    outDir: "dist",
    assetsDir: "src/assets",
    rollupOptions: {
      input: {
        background: resolve(__dirname, "src/background"),
        homepage: resolve(__dirname, "src/content/homepage.ts"),
        recorder: resolve(__dirname, "src/content/recorder.ts"),
        inject_style: resolve(__dirname, "src/style/inject_style.css"),

        popupPage: resolve(__dirname, "src/popup.html"),
        recordPage: resolve(__dirname, "src/record.html"),
      },
      output: {
        format: "esm",
        entryFileNames: "src/js/[name].js",
        assetFileNames: (chunkInfo) => {
          if (chunkInfo.name.endsWith(".css")) {
            return "src/css/[name].css";
          }
          return "src/assets/[name].[ext]";
        },
      },
    },
  },
});
