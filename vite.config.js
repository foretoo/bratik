import { defineConfig } from "vite"
import path from "path"

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
})