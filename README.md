vite-plugin-markdown-extend
===


直接在markdown文档中引用组件模块并渲染展示
## vue


配置插件
```js
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import md from "../index";

export default defineConfig({
    plugins: [
        vue({
            include: [/\.vue$/, /\.md$/],
        }),
        md({ mode: "vue" }),
    ],
});
```

将md文件作为vue文件使用
```js
import { createApp } from 'vue'

import ReadMe from './readme.md'
createApp(ReadMe).mount('#app')
```

## react

配置
```js
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
            reCodeBlock: /```react((.|\r|\n)*?)```/g, // 可以修改对应的代码块匹配规则
        }),
    ],
});
```

将md文件作为react文件使用
```jsx
import React from "react";
import ReactDOM from "react-dom";
import ReadMe from "./readme.md";

ReactDOM.render(<ReadMe />, document.getElementById("root"));
```