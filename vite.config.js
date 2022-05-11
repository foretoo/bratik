import { defineConfig } from "vite"
import path from "path"
import dts from "vite-plugin-dts"

export default defineConfig({
  server: {
    host: true,
    open: "/src/index.html",
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/lib/bratik.ts"),
      name: "bratik",
      fileName: (format) => `bratik.${format}.js`,
    },
  },
  plugins: [dts()],
})