import { join } from 'lodash-es';
import { result } from './data';
import './index.css';
const a = require('./cc');
console.log(a);
// class Foo {
//     qq(){
//         console.log("我是一个类-用到的方法");
//     }
//     test(){
//         console.log("我是一个类");
//     }
// }
// const instance = new Foo();
// instance.qq();
// {
//     const xx = "123";
// }
if (false) {
  console.log('我是Tree treeshaking');
}
function init(num) {
  const _sin = Math.sin(num);
  const _sin2 = _sin + 0.004;
  const cos = Math.cos(_sin2);
  const xx = Math.sqrt(cos, 2);
  console.log(xx);
}
init(20);
console.log(result);
console.log(join(['a', 'b'], '🍊'));
