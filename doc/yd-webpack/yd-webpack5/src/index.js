// import result from "./sync";
// import("./async").then(_ => {
//     console.log(_);
// })
// console.log("我是首页");
// console.log(result);

import("./async").then(_ => {
    console.log(_);
})
import("./sync").then(_ => {
    console.log(_);
})