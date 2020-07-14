const Compiler = require('./compiler');
const options = require('../ydpack.config');
const compiler = new Compiler(options);
const plguins = options.plugins;
for (const plguin of plguins) {
  plguin.apply(compiler);
}
// compiler.hooks.run.call('xxx');
compiler.run();
