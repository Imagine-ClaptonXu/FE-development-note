// -------- 实现一个 new 方法 --------

function new2(Func, ...args) {
    // 1.创建⼀个新对象
    const obj = {}
    // 2.新对象原型指向构造函数原型对象
    obj.__proto__ = Func.prototype
    // 3.将构建函数的this指向新对象
    let result = Func.apply(obj, args)
    // 4.根据返回值判断
    return result instanceof Object ? result : obj
}

function Person(name, age) {
    this.name = name;
    this.age = age;
}

Person.prototype.say = function () {
    console.log(this.name)
}

var p = new2(Person, "a", 123)
console.log(p) // Person {name: "a", age: 123}
p.say() // a


// -------- call, apply, bind --------

/*
• 三者都可以改变函数的 this 指向
• 三者第一个参数都是 this 要指向的对象，如果如果没有这个参数或参数为 undefined 或 null，则默认指向全局 window
• 三者都可以传参，但是区别是 apply 是数组，而 call 是参数列表，apply 和 call 是一次性传⼊参数，而 bind 可以分为多次传入
• bind 是返回绑定 this 之后的函数，apply 和 call 是立即执行
*/

// 实现 bind 函数
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


// -------- 防抖(debounce)、节流(throttle) --------

/*
防抖是一定时间连续触发的事件，只在最后执行一次
节流是⼀段时间内只执行一次

区别：
都设置时间频率为 500ms，在 2 秒时间内，频繁触发函数：
    节流，每隔 500ms 就执行一次
    防抖，则不管调用多少次方法，在 2s后，只会执行一次

应用场景：
防抖：
    • 搜索框搜索输⼊。只需⽤⼾最后一次输⼊完，再发送请求
    • ⼿机号、邮箱验证输⼊检测
    • 窗口大小 resize。窗⼝调整完成后，计算窗口大小。防止重复渲染。
节流：
    • 滚动加载，加载更多或滚到底部监听
    • 搜索框，搜索联想功能
*/

// 实现：
// 防抖简单版
function debounce1(func, wait) {
    let timeout;
    return function () {
        let context = this; // 保存this指向
        let args = arguments; // 拿到event对象
        clearTimeout(timeout)
        timeout = setTimeout(function(){
            func.apply(context, args)
        }, wait);
    }
}

// 防抖立即执行，加入第三个参数用于判断
function debounce(func, wait, immediate=true) {
    let timeout;
    return function () {
        let context = this;
        let args = arguments;
        if (timeout) clearTimeout(timeout); // timeout 不为 null
        if (immediate) {
            let callNow = !timeout; // 第一次会立即执行，以后只有事件执行后才会再次触发
            timeout = setTimeout(function () {
                timeout = null;
            }, wait)
            if (callNow) {
                func.apply(context, args)
            }
        } else {
            timeout = setTimeout(function () {
                func.apply(context, args)
            }, wait);
        }
    }
}

// 节流
// 1，时间戳
// 立即执行，停止触发后没有办法再次执行
function throttle1(fn, delay = 500) {
    let oldtime = Date.now()
    return function (...args) {
        let newtime = Date.now()
        if (newtime - oldtime >= delay) {
            fn.apply(null, args)
            oldtime = Date.now()
        }
    }
}

// 2，定时器
// delay 毫秒后第一次执行，第二次事件停止触发后依然会再一次执行
function throttle2(fn, delay = 500) {
    let timer = null
    return function (...args) {
        if (!timer) {
            timer = setTimeout(() => {
            fn.apply(this, args)
                timer = null
            }, delay);
        }
    }
}

// 3，时间戳 + 定时器
function throttle(fn, delay) {
    let timer = null
    let starttime = Date.now()
        return function () {
        let curTime = Date.now() // 当前时间
        let remaining = delay - (curTime - starttime) // 从上一次到现在，还剩下多少多余时间
        let context = this
        let args = arguments
        clearTimeout(timer)
        if (remaining <= 0) {
            fn.apply(context, args)
                starttime = Date.now()
            } else {
                timer = setTimeout(fn, remaining);
        }
    }
}
