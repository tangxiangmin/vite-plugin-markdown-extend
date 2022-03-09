import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import md from "../index";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue({
            include: [/\.vue$/, /\.md$/],
        }),
        md(),
    ],
});