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
