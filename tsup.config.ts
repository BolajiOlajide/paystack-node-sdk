import { defineConfig } from "tsup";

export default defineConfig({
  name: "paystack-node-sdk",
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  dts: true,
  outDir: "dist",
  clean: true,
  sourcemap: "inline",
  platform: "node",
  treeshake: true,
  // external: ["node-fetch"],
  minifyWhitespace: false, // TODO? TO make the bundle smaller, this is nice but makes it harder to read
});
