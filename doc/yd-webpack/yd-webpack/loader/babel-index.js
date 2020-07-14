"use strict";
const loaderUtils = require("loader-utils");
const acorn = require("acorn");
const walk = require("acorn-walk");
const MagicString = require("magic-string");
module.exports = function (content) {
    const options = loaderUtils.getOptions(this);
    console.log("前置钩子", this.data.value);
    console.log("🍍配置文件", options);
    const ast = acorn.parse(content);
    const code = new MagicString(content);
    // console.log("AST🌲", ast);
    walk.simple(ast, {
        VariableDeclaration(node) {
            console.log("🚀", node);
            const { start } = node;
            code.overwrite(start,start+5,"var");
        }
    });
    return code.toString();
}
module.exports.pitch = function (r, prerequest, data) {
    data.value = "京程一灯";
}