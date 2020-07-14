const { Tapable, SyncHook } = require('tapable');
const Compilation = require('./compilation');
class Compiler extends Tapable {
  constructor(options) {
    super();
    this.hooks = {
      run: new SyncHook(['compilation']),
    };
    this.modules = [];
    this.options = options;
  }
  run(callback) {
    //触发插件
    const onCompiled = () => {};
    this.compile(onCompiled);
  }
  createCompilation() {
    return new Compilation(this);
  }
  compile(callback) {
    //最终执行了构建过程 + Compilation
    const compilation = this.newCompilation();
    this.hooks.run.call(compilation);
    // compilation.hooks.buildModule.call();
    const entryModule = compilation.buildModule(this.options.entry, true);
    this.modules.push(entryModule);
    this.modules.map((_module) => {
      _module.dependencis.map((dependcy) => {
        this.modules.push(compilation.buildModule(dependcy, false));
      });
    });
    compilation.emitFiles();
  }
  newCompilation(params) {
    const compilation = this.createCompilation();
    return compilation;
  }
}
module.exports = Compiler;
