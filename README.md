vite-plugin-markdown-extend
===


直接在markdown的技术文档中展示代码组件


配置插件
```js
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
```

将md文件作为vue文件使用
```js
import { createApp } from 'vue'

// import App from './App.vue'
import readme from './readme.md'
createApp(readme).mount('#app')


```