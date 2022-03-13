import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import md from "../src/index";
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react({
            include: [/\.jsx$/, /\.md$/],
        }),
        md({
            mode: "react",
            reCodeBlock: /```react((.|\r|\n)*?)```/g,
        }),
    ],
});
