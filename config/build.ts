import { defineConfig } from "rollup"
import { nodeResolve } from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import esbuild from "rollup-plugin-esbuild"
import { eslintBundle } from "rollup-plugin-eslint-bundle"
import dts from "rollup-plugin-dts"

export default defineConfig([
  {
    input: "./src/bratik.ts",
    output: [
      {
        file: "./dist/bratik.es.js",
        format: "es",
      },
      {
        file: "./dist/bratik.iife.js",
        format: "iife",
        name: "bratik"
      }
    ],
    plugins: [
      nodeResolve(),
      commonjs(),
      esbuild(),
      eslintBundle({ eslintOptions: { fix: true }}),
    ],
  },
  {
    input: "./src/bratik.ts",
    output: {
      file: "./dist/index.d.ts"
    },
    plugins: [dts()],
  },
])