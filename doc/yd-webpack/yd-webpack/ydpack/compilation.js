const { Tapable, AsyncSeriesHook } = require('tapable');
const Parser = require('./parser');
const fs = require('fs');
const path = require('path');
// 每一次在编译的阶段 都会执行newCompilation
class Compilation extends Tapable {
  constructor(context) {
    super();
    // this.emitFiles();
    const { modules, options } = context;
    this.modules = modules;
    this.entry = options.entry;
    this.output = options.output;
    //依旧可以照常的去用你最初传递的参数
    // console.log('获取的配置', context);
  }
  buildModule(filename, isEntry) {
    let ast = '';
    let absoutPath = '';
    if (!isEntry) {
      absoutPath = path.join(process.cwd(), './src', filename);
      ast = Parser.ast(absoutPath);
    } else {
      ast = Parser.ast(filename);
    }

    const dependencis = Parser.getDependencis(ast);
    const transformCode = Parser.transform(ast);
    // console.log('🍌', transformCode);
    return {
      filename,
      dependencis,
      transformCode,
    };
  }
  emitAsset() {}
  emitFiles() {
    //先准备Template
    // console.log('入口', this.output);
    //每一次进行编译的过程中所带的文件
    const outputPath = path.join(this.output.path, this.output.filename);
    //   // Modules模块做的任务
    let _modules = '';
    this.modules.map((_module) => {
      _modules += `'${_module.filename}':(function (module, exports, require) {  
                        ${_module.transformCode}
                    }),`;
    });
    // Template模块做的任务
    const template = `(function (modules) {
           // 模块的缓存
           var installedModules = {};
           function __webpack_require__(moduleId) {
               // 对缓存进行检查
               if (installedModules[moduleId]) {
                   return installedModules[moduleId].exports;
               }
               // 创建一个空模块 并将moduleId模块放入缓存
               // installedModules["./src/index.js"] = module
               // module.exports = {}
               var module = installedModules[moduleId] = {
                   exports: {}
               };
               modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
               // 如果代码内部含有exports 一定要记得return
               return module.exports;
           }
           return __webpack_require__("${this.entry}");
       })({
         ${_modules}
       })
       `;
    // console.log('核心生成的代码', template);
    fs.writeFileSync(outputPath, template, 'utf-8');
  }
}
module.exports = Compilation;
