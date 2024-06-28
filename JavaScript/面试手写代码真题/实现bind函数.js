// -------- call, apply, bind --------

/*
• 三者都可以改变函数的 this 指向
• 三者第一个参数都是 this 要指向的对象，如果如果没有这个参数或参数为 undefined 或 null，则默认指向全局 window
• 三者都可以传参，但是区别是 apply 是数组，而 call 是参数列表，apply 和 call 是一次性传⼊参数，而 bind 可以分为多次传入
• bind 是返回绑定 this 之后的函数，apply 和 call 是立即执行
*/


// -------- 实现 bind 函数 --------
Function.prototype.bind2 = function (context) {
    // 判断调⽤对象是否为函数
    if (typeof this !== "function") {
        throw new TypeError("Error");
    }
    // 获取参数
    const args = [...arguments].slice(1)
    const fn = this
    return function Fn() {
        // 根据调⽤⽅式，传⼊不同绑定值
        return fn.apply(this instanceof Fn ? new fn(...arguments) : context, args.concat(...arguments));
    }
}
