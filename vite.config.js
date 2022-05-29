import { defineConfig } from "vite"
import path from "path"
import dts from "vite-plugin-dts"

export default defineConfig({
  server: {
    host: true,
    open: "/src/index.html",
  },
  publicDir: false,
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/lib/bratik.ts"),
      name: "bratik",
      formats: [ "es" ]
    },
    target: "esnext",
    emptyOutDir: false,
  },
  // plugins: [dts()],
})