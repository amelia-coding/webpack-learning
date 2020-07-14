const babylon = require('babylon');
const traverse = require('babel-traverse').default;
const { transformFromAst } = require('@babel/core');
const fs = require('fs');

class Parser {
  static ast(path) {
    const content = fs.readFileSync(path, 'utf-8');
    return babylon.parse(content, {
      sourceType: 'module',
    });
  }
  static getDependencis(ast) {
    const dependencis = [];
    traverse(ast, {
      ImportDeclaration: ({ node }) => {
        dependencis.push(node.source.value);
      },
    });
    return dependencis;
  }
  static transform(ast) {
    const { code } = transformFromAst(ast, null, {
      presets: ['@babel/env'],
    });
    return code;
  }
}
module.exports = Parser;
