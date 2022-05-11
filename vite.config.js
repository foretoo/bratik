import { defineConfig } from "vite"
import path from "path"

export default defineConfig({
  server: {
    host: true,
    open: "/src/index.html",
  },
})