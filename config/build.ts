import { defineConfig } from "rollup"
import esbuild from "rollup-plugin-esbuild"
import iife from "rollup-plugin-iife"
import { eslintBundle } from "rollup-plugin-eslint-bundle"
import dts from "rollup-plugin-dts"

export default defineConfig([
  {
    input: "./src/bratik.ts",
    output: {
      file: "./dist/index.js",
      format: "es",
    },
    plugins: [
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



  {
    input: "./src/animate.ts",
    output: {
      file: "./dist/animate/index.js",
      format: "es",
    },
    plugins: [
      esbuild(),
      eslintBundle({ eslintOptions: { fix: true }}),
    ],
  },
  {
    input: "./src/animate.ts",
    output: {
      file: "./dist/animate/index.d.ts"
    },
    plugins: [dts()],
  },



  {
    input: [
      "./src/bratik.ts",
      "./src/animate.ts",
    ],
    output: {
      dir: "./dist/iife",
      format: "es",
    },
    plugins: [
      esbuild(),
      iife(),
      eslintBundle({ eslintOptions: { fix: true }}),
    ],
  },
])