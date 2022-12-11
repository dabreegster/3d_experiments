import { defineConfig } from 'vite';
import plainText from 'vite-plugin-plain-text';
import wasm from "vite-plugin-wasm";
import topLevelAwait from "vite-plugin-top-level-await";

export default defineConfig({
  plugins: [
    plainText.default("data"),
    wasm(),
    topLevelAwait(),
  ],
});
