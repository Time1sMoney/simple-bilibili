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
    assetsDir: "assets",
    rollupOptions: {
      input: {
        background: resolve(__dirname, "src/background"),
        homepage: resolve(__dirname, "src/content/homepage.ts"),
        recorder: resolve(__dirname, "src/content/recorder.ts"),
        homepage_inject: resolve(__dirname, "src/style/homepage_inject.css"),

        popupPage: resolve(__dirname, "html/popup.html"),
        recordPage: resolve(__dirname, "html/record.html"),
      },
      output: {
        entryFileNames: "js/[name].js",
        assetFileNames: (chunkInfo) => {
          if (chunkInfo.name.endsWith(".css")) {
            return "css/[name][extname]";
          }
          return "[ext]/[name][extname]";
        },
        manualChunks: {
          react: ["react", "react-dom"],
          recharts: ["recharts"],
          iconify: ["@iconify/react"],
        },
        chunkFileNames: "js/lib/[name]-[hash].js",
      },
    },
  },
});
