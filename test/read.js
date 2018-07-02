
// const fs = require('fs');
//
// const timeoutScheduled = Date.now();
//
// // 异步任务一：100ms 后执行的定时器
// setTimeout(() => {
//   const delay = Date.now() - timeoutScheduled;
//   console.log(`${delay}ms`);
// }, 100);
//
// // 异步任务二：文件读取后，有一个 200ms 的回调函数
// fs.readFile('../package.json', () => {
//   const startCallback = Date.now();
//   while (Date.now() - startCallback < 200) {
//     // 什么也不做
//   }
// });

// setTimeout(() => {
//   console.log('timeout');
// }, 0);
//
// setImmediate(() => {
//   console.log('immediate');
// });

// var time
// setTimeout(() => {
//   process.nextTick(() => {
//     time = 123
//   })
//   console.log(time);
// })

setTimeout(function() {
    console.log('setTimeout')
}, 0);
//! wait timer to be expired
var now = Date.now();
while (Date.now() - now < 2) {
    //...
}
setImmediate(function() {
    console.log('setImmediate')
});
