import { defineConfig } from "vite"
import path from "path"
import dts from "vite-plugin-dts"

export default defineConfig({
  server: {
    host: true,
    open: "/src/demo/index.html",
  },
  publicDir: false,
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/bratik.ts"),
      name: "bratik",
      formats: [ "es", "cjs", "iife" ]
    },
    outDir: "lib",
    target: "esnext",
    emptyOutDir: false,
  },
  // plugins: [dts()],
})