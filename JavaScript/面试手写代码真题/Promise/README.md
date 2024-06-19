# Promise

## Promises/A+ 规范 

[Promises/A+](https://promisesaplus.com/)

Promise 表示一个异步操作的最终结果，与之进行交互的方式主要是 then 方法，该方法注册了两个回调函数 resolve 及 reject，用于接收 promise 的最终值或者本 promise 不能执行的原因

### Promise 的状态

一个 Promise 的当前状态必须为以下三种状态中的一种：

#### 等待态（Pending）

处于等待态时，可以迁移至执行态或拒绝态

#### 执行态（Fulfilled）

处于执行态时，promise 不能迁移至其他任何状态，必须拥有一个不可变的终值

#### 拒绝态（Rejected）

处于拒绝态时，不能迁移至其他任何状态，必须拥有一个不可变的据因

> 注意 promsie 的状态，只能由 pending 到 fulfilled/rejected, 状态一旦修改就不能再改变

### 术语名词解析

#### Promise

promise 是一个拥有 then 方法的对象或函数，其行为符合本规范

#### thenable

是一个定义了 then 方法的对象或函数，文中译作“拥有 then 方法”

#### 值（value）

指任何 JavaScript 的合法值（包括 undefined, thenable 和 promise）

#### 异常（exception）

是使用 throw 语句抛出的一个值

#### 据因（reason）

表示一个 promise 的拒绝原因

### promise 对象方法

+ then 方法

```
// onFulfilled 是用来接收promise成功的值
// onRejected 是用来接收promise失败的原因
promise.then(onFulfilled, onRejected)
```
> 注意：then方法是异步执行的

+ resolve(成功) onFulfilled 会被调用

+ reject(失败) onRejected 会被调用

+ promise.catch

+ promise.all
> Promise.all() 方法接受一个可遍历的数据容器（Array，Map，Set），容器中每个元素都应是 Promise 实例。返回一个新 Promise 实例。数组中每个 Promise 实例都成功时（由 pendding 状态转化为 fulfilled 状态），Promise.all 才成功。这些 Promise 实例所有的 resolve 结果会按照原来的顺序集合在一个数组中作为 Promise.all 的 resolve 的结果。数组中只要有一个 Promise 实例失败（由 pendding 状态转化为 rejected 状态），Promise.all 就失败了。Promise.all 的 .catch() 会捕获到这个 reject，只返回这个 rejected 任务的结果。

+ promise.race
> Promise.race() 以状态变化最快的那个 Promise 实例为准，最快的 Promise 成功 Promise.race 就成功，最快的 Promise 失败 Promise.race 就失败。

+ promise.allSettled
> 期望一组 Promise 实例无论成功与否，都等它们异步操作结束了在继续执行下一步操作。Promise.allSettled 给所有收集到的结果打上了标记，不管一组 Promise 实例的各自结果如何，Promise.allSettled 都会转变为 fulfilled 状态。

+ promise.any
> promise.any 与 Promise.all 可以看做是相反的。Promise.any 中只要有一个 Promise 实例成功就成功，只有当所有的 Promise 实例失败时 Promise.any 才失败，此时Promise.any 会把所有的失败/错误集合在一起，返回一个失败的 promise 和 AggregateError 类型的实例。

> promise.catch / promise.all / promise.race 非 promise/A+ 规范要求，通常为各个库函数各自补充添加


## Reference
[Promise.js](https://github.com/dennis-jiang/Front-End-Knowledges/blob/master/Examples/JavaScript/Promise/MyPromise.js)
