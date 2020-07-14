"use strict";
// laoder不干活 具体的工具marked -》 Ast -》遍历整颗树
const marked = require("marked");
// webpack单独的工具包 加载插件的参数
const loaderUtils = require("loader-utils");

module.exports = function (markdown) {
    // merge params and default config
    const options = loaderUtils.getOptions(this);
    // 开启缓存
    this.cacheable();

    marked.setOptions(options);

    return marked(markdown);
};