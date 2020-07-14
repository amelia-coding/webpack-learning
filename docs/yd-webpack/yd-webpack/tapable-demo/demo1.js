/*
 * @Author: your name
 * @Date: 2020-06-29 14:11:27
 * @LastEditTime: 2020-06-29 17:45:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \webpack-learning\yd-webpack\yd-webpack\tapable-demo\demo1.js
 */

/**
 * 1.SyncHook 同步串行 不关心监听返回值
 * 2.SyncBailHook 同步串行 只要监听函数有一个返回不为null 跳过剩下的所有逻辑
 * 3.SyncWaterfallHook 同步串行 上一个监听函数可以返回给下一个
 * 4.SyncLoopHook 同步循环 如果有一个函数返回true 反复执行
 * 5.AsyncParallelHook 异步并发 不关心监听函数的返回值
 * 6.AsyncParallelBailHook 异步并发 监听函数返回不为null 忽略后面的监听函数
 * 7.AsyncSeriesHook 异步串行 不关心callback返回值
 * 8.AsyncSeriesBailHook异步串行
 * 9.AsyncSeriesWaterfallHook 异步串行 上一个可以作为下一个的返回值
 */
const {
  SyncHook,
  SyncBailHook,
  SyncWaterfallHook,
  SyncLoopHook,
  AsyncParallelHook,
  AsyncParallelBailHook,
  AsyncSeriesHook,
  AsyncSeriesBailHook,
  AsyncSeriesWaterfallHook,
} = require('tapable');

//订阅者的参数-> name
let queue = new SyncWaterfallHook(['name']);

queue.tap('1', function () {
  console.log('☝️', '第一个订阅-->', arguments);
  return 1;
});

queue.tap('2', function (name) {
  console.log('☝️', '第二个订阅', arguments);
  return 2;
});

queue.tap('3', function (name) {
  console.log('☝️', '第三个订阅', arguments);
});

queue.call('webpack', 'done');
