import { defineConfig } from "rollup"
import esbuild from "rollup-plugin-esbuild"
import dts from "rollup-plugin-dts"
import { terser } from "rollup-plugin-terser"

export default defineConfig([
  {
    input: "./src/bratik.ts",
    output: [
      {
        file: "./dist/bratik.min.js",
        format: "es",
        plugins: [terser()],
      },
      {
        file: "./dist/iife/bratik.min.js",
        format: "iife",
        name: "bratik",
      },
    ],
    plugins: [esbuild(),terser()],
  },
  {
    input: "./src/bratik.ts",
    output: {
      file: "./dist/index.d.ts"
    },
    plugins: [dts()],
  }
])