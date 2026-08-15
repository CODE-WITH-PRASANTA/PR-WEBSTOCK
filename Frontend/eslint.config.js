import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import { visualizer } from "rollup-plugin-visualizer";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";

export default defineConfig({
  plugins: [
    react(),
    cssInjectedByJsPlugin({
      relativeCSSInjection: true,
    }),
    ViteImageOptimizer({
      webp: {
        quality: 75,
        lossless: false,
      },
      png: {
        quality: 80,
      },
      jpeg: {
        quality: 80,
      },
    }),
    visualizer({
      filename: "stats.html",
      open: false,
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  build: {
    target: "esnext",
    minify: "esbuild",
    cssCodeSplit: false,
    sourcemap: false,
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      onwarn(warning, warn) {
        if (warning.code === "MODULE_LEVEL_DIRECTIVE") return;
        warn(warning);
      },
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (
              id.includes("react/") ||
              id.includes("react-dom/") ||
              id.includes("scheduler")
            ) {
              return "react-core";
            }
            if (id.includes("react-router")) {
              return "react-router";
            }
            if (
              id.includes("framer-motion") ||
              id.includes("gsap") ||
              id.includes("motion-")
            ) {
              return "vendor-animations";
            }
            if (id.includes("react-icons")) {
              return "vendor-icons";
            }
            if (
              id.includes("axios") ||
              id.includes("sweetalert2") ||
              id.includes("react-spinners") ||
              id.includes("react-helmet-async")
            ) {
              return "vendor-utilities";
            }
            return "vendor-misc";
          }
        },
      },
    },
  },
});