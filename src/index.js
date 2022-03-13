const markdown = require("markdown-it");
const babel = require("@babel/core");
const jsx = require("@babel/plugin-transform-react-jsx");
const importMeta = require("@babel/plugin-syntax-import-meta");

const defaultOptions = {
    mode: "vue",
    reCodeBlock: /```vue((.|\r|\n)*?)```/g,
};

module.exports = function (opts = {}) {
    opts = {
        ...defaultOptions,
        ...opts,
    };

    const { reCodeBlock, mode } = opts;

    function parseComponent(source) {
        const reComponent = /import (.+) from (['"]).+(\2)/g;
        const imports = new Set();
        const components = new Set();

        source = source.replace(reCodeBlock, (_, code) => {
            return code.replace(reComponent, (match, $1) => {
                imports.add(match);
                components.add($1);
                return `<${$1} />`;
            });
        });

        return {
            imports: Array.from(imports),
            components: Array.from(components),
            source,
        };
    }

    function markdown2react(source) {
        const { source: fSource, imports, components } = parseComponent(source);

        const md = markdown({
            html: true,
        });

        const html = md.render(fSource);

        const template = `
import React from 'react';
${imports.join("\n")}
export default ()=>{
return (<div>${html}</div>)
}
`;

        const plugins = [
            importMeta,
            jsx,
        ];
        // if (id.endsWith(".tsx")) {
        //     plugins.push([
        //         require("@babel/plugin-transform-typescript"),
        //         // @ts-ignore
        //         { isTSX: true, allowExtensions: true },
        //     ]);
        // }

        const result = babel.transformSync(template, {
            babelrc: false,
            ast: true,
            plugins,
            sourceMaps: false,
            sourceFileName: "123",
            configFile: false,
        });

        return {
            code: result.code,
            map: result.map,
        };
    }

    function markdown2vue(source) {
        const { source: fSource, imports, components } = parseComponent(source);

        const md = markdown({
            html: true,
        });

        const html = md.render(fSource);

        const template = `
<template>
${html}
</template>

<script>
${imports.join("\n")}

export default {
components: {
    ${components.join(",")}
}
}
</script>
`;

        return {
            code: template,
        };
    }

    return {
        name: "vite-plugin-markdown-extend",
        enforce: "pre",
        transform(source, id) {
            if (!/\.md$/.test(id)) {
                return;
            }

            return mode === "vue"
                ? markdown2vue(source)
                : markdown2react(source);
        },
    };
};
