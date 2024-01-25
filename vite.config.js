import { defineConfig } from "vite";
import ViteSvgPlugin from "vite-plugin-svg";

export default defineConfig({
  build: {
    assetsInlineLimit: 0,
  },

  base: "./",

  plugins: [ViteSvgPlugin()],
});
