1.webpack 包文件找到 webpack.js
ConsoleLogOnBuildWebpackPlugin -> {
plugins:[]
}
--> 通过传递给他的参数 遍历 `plugins` -> plugin.call(compiler, compiler);

2.核心引入了 Compiler -> Compilation

3.Compiler 源码
compiler(类).hooks.run(Tapable 的一个 Hook).tap

```JavaScript
const {
	Tapable,
	SyncHook,
	SyncBailHook,
	AsyncParallelHook,
	AsyncSeriesHook
} = require("tapable");
// 每一次在编译的阶段 都会执行newCompilation
class Compilation extends Tapable {
    constructor(context) {
        //依旧可以照常的去用你最初传递的参数
    }
    emitAsset(){
        //每一次进行编译的过程中所带的文件
    }
    emitFiles(){}
    buildModule(){

    }
}
class Compiler extends Tapable{
    	constructor(context) {
            super();
            this.hooks = {
                run:new AsyncSeriesHook(["compiler"])
            }
        }
        run(callback) {
            // this.hooks.run.apply();
            const onCompiled = ()=>{

            }
            this.compile(onCompiled);
        }
        createCompilation() {
            return new Compilation(this);
        }
        compile(callback){
            //最终执行了构建过程 + Compilation
            const compilation = this.newCompilation(params);
            // compilation.hooks.buildModule.call();
            compilation.buildModule();
        }
        newCompilation(params) {
            const compilation = this.createCompilation();
        }
}
//插件的原理
// compiler.hooks.run.tap(pluginName, (compilation) => {
//     console.log(compilation);
// });
```
