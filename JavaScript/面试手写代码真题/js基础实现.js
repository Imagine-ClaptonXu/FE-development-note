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

// -------- 解析 URL Params 为对象 --------
function parserUrlParams(url) {
    let paramsStr = url
    // 有问号取问号后面的，没有问号则认为已经是 search 了
    if (paramsStr.includes('?')) {
        paramsStr = /.+\?(.+)$/.exec(url)[1] // 将 ? 后面的字符串取出来
    }
    // console.log("将 ? 后面的字符串取出来", paramsStr)

    // 看有没有 #，去掉 # 和 hash
    if (paramsStr.includes('#')) {
        let p1 = paramsStr.split('#')[0]
        let p2 = paramsStr.split('#')[1]
        if (p1.slice(0, 1) === '/') {
            paramsStr = p2
        }
        if (p2.slice(0, 1) === '/') {
            paramsStr = p1
        }
    }
    // console.log("去掉 # 和 hash", paramsStr)
    
    const paramsArr = paramsStr.split('&') // 将字符串以 & 分割后存到数组中
    console.log('paramsArr', paramsArr)
    let paramsObj = {}
    // 将 params 存到对象中
    paramsArr.forEach(param => {
        // 处理有 key=value，(有 value 的参数)
        if (/=/.test(param)) {
            let [key, value] = param.split('=') // 分割 key 和 value
            value = decodeURIComponent(value) // 解码
            // 不转为数字，否则 000001 会被转成 1
            // value = /^\d+$/.test(value) ? parseFloat(value) : value // 判断是否转为数字
            if (paramsObj.hasOwnProperty(key)) { // 如果对象有 key，则添加一个值
                paramsObj[key] = [].concat(paramsObj[key], value)
            } else { // 如果对象没有这个 key，创建 key 并设置值
                paramsObj[key] = value
            }
        } else { // 处理没有 value 的参数
            paramsObj[param] = true
        }
    })
    // console.info('URL Params', paramsObj)
    return paramsObj
}
// 测试1，有 key 无 value, 有重复的 key, 有 key= 无 value
/* 期望结果
{
    "user": "anonymous",
    "id": ["123", "456"],
    "woi": "",
    "city": "北京",
    "enabled": true,
    "k": ""
}
*/
let url1 = 'http://www.domain.com/?user=anonymous&id=123&woi=&id=456&city=%E5%8C%97%E4%BA%AC&enabled&k=';
let parserUrlParams1 = parserUrlParams(url1)
console.log('parserUrlParams1', parserUrlParams1)
// 测试2，带 hash，hash 位置在前和在后的情况
/* 期望结果
{
    "code": ["000000", "111111"],
    "rand": "30251",
    "Version": "2022072531",
    "pid": "8880",
    "token": "kMB1/3SwCfB2N5Lco7+xlnUs42j3a+RVreL+IwutXTJk=",
    "bata": "0001",
    "fCode": "000309"
}
*/
let url2 = 'http://www.domain.com/?code=000000&rand=30251&code=111111&Version=2022072531&pid=8880&token=kMB1%2f3SwCfB2N5Lco7%2bxlnUs42j3a%2bRVreL%2bIwutXTJk%3d&bata=0001&fCode=000309#/home'
let parserUrlParams2 = parserUrlParams(url2)
console.log('parserUrlParams2', parserUrlParams2)
let url3 = 'http://www.domain.com/#/home?code=000000&rand=30251&code=111111&Version=2022072531&pid=8880&token=kMB1%2f3SwCfB2N5Lco7%2bxlnUs42j3a%2bRVreL%2bIwutXTJk%3d&bata=0001&fCode=000309'
let parserUrlParams3 = parserUrlParams(url3)
console.log('parserUrlParams3', parserUrlParams3)
