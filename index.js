const markdown = require("markdown-it");

// todo 扩展react的
module.exports = function () {
    function parseComponent(source) {
        const reComponent = /import (.+) from (['"]).+(\2)/g;
        const reCodeBlock = /```vue((.|\r|\n)*?)```/g;
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

    function transformMarkdown(source) {
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

            return transformMarkdown(source);
        },
    };
};
