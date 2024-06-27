// -------- js 常用方法集合 --------

const log = console.log.bind(console)

// 测试函数
const ensure = function(condition, message) {
    if (condition) {
        log('### 测试成功')
    } else {
        log('### 测试失败', message)
    }
}

// 判断数组类型
const isArray = function(s) {
    return Object.prototype.toString.call(s) === '[object Array]'
}

// 判断字典类型
const isObject = function(s) {
    return Object.prototype.toString.call(s) === '[object Object]'
}

// 比较两个变量是否相同
const equals = function(a, b) {
    const arrayEquals = function(a, b) {
        if (isArray(a) && isArray(b)) {
            // 长度相等
            if (a.length === b.length) {
                for (let i = 0; i < a.length; i++) {
                    let e = a[i]
                    let e2 = b[i]
                    if (isArray(e) && isArray(e2)) {
                        let res = arrayEquals(e, e2)
                        if (!res) {
                            return false
                        }
                    } else if (isObject(e) && isObject(e2)) {
                        let res = objectEquals(e, e2)
                        if (!res) {
                            return false
                        }
                    } else if (e != e2) {
                        return false
                    }
                }
                return true
            }
        }
        return false
    }
    
    const objectEquals = function(a, b) {
        let aKeyList = Object.keys(a)
        let bKeyList = Object.keys(b)
        if (isObject(a) && isObject(b)) {
            if (aKeyList.length === bKeyList.length) {
                for (let i = 0; i < aKeyList.length; i+=1) {
                    let keyA = aKeyList[i]
                    let valueA = a[keyA]
                    let valueB = b[keyA]
                    if (isObject(valueA) && isObject(valueB)) {
                        let res = objectEquals(valueA, valueB)
                        if (!res) {
                            return false
                        }
                    } else if (isArray(valueA) && isArray(valueB)) {
                        let res = arrayEquals(valueA, valueB)
                        if (!res) {
                            return false
                        }
                    } else if (valueA != valueB) {
                        return false
                    }
                }
                return true
            }
        }
        return false
    }

    if (isArray(a) && isArray(b)) {
        return arrayEquals(a, b)
    } else if (isObject(a) && isObject(b)) {
        return objectEquals(a, b)
    } else {
        return a === b
    }
}

// 深拷贝
const deepClone = function(value) {
    let res = null
    if (isObject(value)) {
        res = {}
        let keys = Object.keys(value)
        for (let index = 0; index < keys.length; index++) {
            const k = keys[index]
            let v = value[k]
            res[k] = deepClone(v)
        }
    } else if (isArray(value)) {
        res = []
        for (let index = 0; index < value.length; index++) {
            const e = value[index]
            res.push(deepClone(e))
        }
    } else {
        res = value
    }
    return res
}

// 数字处理，每三位增加 mark, 1234567 => 1,234,567
const numberAddMark = function (number, mark=',') {
    let res = []
    let arr = String(number).split('').reverse()
    for (let index = 0; index < arr.length; index++) {
        const e = arr[index]
        if (index > 0 && index % 3 === 0) {
            res.push(mark)
        }
        res.push(e)
    }
    // log('输出：', res)
    let r = res.reverse().join('')
    // log('输出2：', r)
    return r
}

// 防抖，会立即执行一次
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

// 获取当前日期
const getNowDate = function (time=null, mark='.') {
    let t = time ? new Date(time) : new Date()
    let y = t.getFullYear()
    let m = t.getMonth() + 1
    if (m < 10) {
        m = `0${m}`
    }
    let d = t.getDate()
    if (d < 10) {
        d = `0${d}`
    }
    let newT = `${y}${mark}${m}${mark}${d}`
    return newT
}

// 延迟函数
const delay2 = (ms, data='') => {
    /*
        使用
        (async() => {
            const result = await delay2(1000, { key: 'value' })
            console.log('result:', result)
        })();
    */
    return new Promise((resolve, reject) => {
        let t = setTimeout(() => {
            clearTimeout(t)
            resolve(data)
        }, ms)
    })
}

/**
 * 数字格式化，自动把大数转换成 "元", "万", "亿", "万亿", "兆"
 * @param {number} num 数字
 * @param {number} fix 数字格式化成 xx元 xx万... 之后保留的小数位，四舍五入
 * @param {string | number} suf 在末尾补充的内容
 * @returns formatLargeNum(100003, 2, '!!') => '10.00万!!'
 */
const formatLargeNum = function (num, fix, suf) {
    var moneyUnits = ["元", "万", "亿", "万亿", "兆"];
    var dividend = 10000;
    var curentNum = num || 0; //转换数字
    var curentUnit = moneyUnits[0]; //转换单位
    var aFix = fix || 0;
    var aSuf = suf || "";
    var strNumSize = tempNum => {
        var stringNum = tempNum.toString();
        var index = stringNum.indexOf(".");
        var newNum = stringNum;
        if (index != -1) {
            newNum = stringNum.substring(0, index);
        }
        newNum = newNum.replace(/[\-\+]/igm, '');
        return newNum.length;
    };

    for (var i = 0; i < 5; i++) {
        curentUnit = moneyUnits[i] + aSuf;
        if (strNumSize(curentNum) < 5) {
            break;
        }
        curentNum = curentNum / dividend;
    }
    var m = {
        num: 0,
        unit: ""
    };
    m.num = curentNum.toFixed(aFix);
    m.unit = curentUnit;
    return m.num + m.unit;
}

// 获取一个 a b 之间的随机数, [a, b)
const randomBetween = function(a, b) {
    return Math.floor((b - a) * Math.random() + a)
}

// 生成 GUID '177078ca-5a2a-a448-abcb-8cfc542968cb'
const genGUID = function () {
    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
    }
    return (S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4())
}

/**
 * 判断某个原生DOM元素是否不在屏幕可见区内
 * @param {HTMLElement} el 原生 DOM 元素
 */
const isElementNotInViewport = (el, bottom=0) => {
    let rect = el.getBoundingClientRect()
    return (
        rect.top >= (window.innerHeight || document.documentElement.clientHeight) || rect.bottom <= bottom
    )
}

// 创建唯一的字符串，长度12
const createUniqueString = function () {
    const timestamp = +new Date() + ''
    const randomNum = parseInt((1 + Math.random()) * 65536) + ''
    const retstr = (+(randomNum + timestamp)).toString(32).toUpperCase()
    return retstr
}

/**
 * 数字格式化成字符串
 * @param {number} data 数据
 * @param {string} type 处理成数字（原样返回）还是格式化成字符串
 * @param {string} unit 单位
 * @param {number} n 几位小数
 * @param {string} before 前面的 + - 号，负数不处理
 * @param {number} rate 数据 * 多少倍，比如正常 0.25 转换成 25%, 就需要 0.25×100
 */
const formatterNumberToString = (data, type, unit='', n=2, before='', rate=100) => {
    let res = '--'
    if (data > 0 || data < 0) {
        if (type === 'number') {
            res = data
        } else {
            res = `${Number(data*rate).toFixed(n)}${unit}`
            if (data > 0 && before === '+') {
                res = `+${res}`
            }
        }
    } else if (data === 0) {
        if (type === 'number') {
            res = 0
        } else {
            res = `${(0).toFixed(n)}${unit}`
        }
    } else if (data === null) {
        if (type === 'number') {
            res = 0
        } else {
            res = '--'
        }
    } else {
        console.warn('formatter', data, type, unit, n, before)
    }
    return res
}

// 解析 URL Params 为对象
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
    console.info('URL Params', paramsObj)
    return paramsObj
}

export {
    log,
    ensure,
    isArray,
    isObject,
    equals,
    deepClone,
    numberAddMark,
    debounce,
    throttle,
    getNowDate,
    delay2,
    formatLargeNum,
    randomBetween,
    genGUID,
    isElementNotInViewport,
    createUniqueString,
    formatterNumberToString,
    parserUrlParams,
}
