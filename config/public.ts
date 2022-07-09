import { defineConfig } from "rollup"
import { nodeResolve } from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import esbuild from "rollup-plugin-esbuild"
import { eslintBundle } from "rollup-plugin-eslint-bundle"
import sass from "rollup-plugin-sass"
import { terser } from "rollup-plugin-terser"

export default defineConfig({
  external: (id) => id.includes("src/bratik.ts") || null,
  input: "src/demo/index.ts",
  output: {
    file: "public/demo.js",
    format: "es",
    paths: (id) =>
      id.includes("src/bratik.ts") ? "../dist/bratik.min.js" : "",
  },
  plugins: [
    nodeResolve({ jail: "src" }),
    commonjs(),
    esbuild(),
    eslintBundle({ eslintOptions: { fix: true }}),
    sass({ output: "public/style.css" }),
    terser(),
  ],
})