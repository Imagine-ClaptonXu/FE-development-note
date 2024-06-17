// -------- 深拷贝 --------

const log = console.log.bind(console)

// 测试函数
const ensure = function(condition, message) {
    if (condition) {
        log('### 测试成功', message)
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

// clone 一个数组并且返回
// 实现浅拷贝
const arrayClone = function(array) {
    let res = []
    for (let index = 0; index < array.length; index++) {
        const element = array[index]
        res.push(element)
    }
    return res
}

// 数组浅拷贝测试用例
const testArrayClone = function() {
    let a1 = [1]
    let b1 = arrayClone(a1)
    ensure(equals(a1, b1), 'test array clone 1')

    let a2 = [[1]]
    let b2 = arrayClone(a2)
    ensure(equals(a2, b2), 'test array clone 2')
    a2[0].push(200)
    ensure(equals(b2[0], [1, 200]), 'test array clone 3')


    let a3 = [1, [2]]
    let b3 = arrayClone(a3)
    ensure(equals(a3, b3), 'test array clone 4')
    a3[1].push(300)
    ensure(b3[1][1] == 300, 'test array clone 5')
}

// clone 一个数组并且返回
// 实现深拷贝
const arrayDeepClone = function(array) {
    let res = []
    for (let index = 0; index < array.length; index++) {
        const e = array[index]
        if (isArray(e)) {
            res.push(arrayDeepClone(e))
        } else if (isObject(e)) {
            res.push(objectDeepClone(e))
        } else {
            res.push(e)
        }
    }
    return res
}

// 深拷贝测试用例
const testArrayDeepClone = function() {
    let a1 = [1]
    let b1 = arrayDeepClone(a1)
    ensure(equals(a1, b1), 'test array deep clone 1')

    let a2 = [[1]]
    let b2 = arrayDeepClone(a2)
    ensure(equals(a2, b2), 'test array deep clone 2')
    a2[0].push(200)
    ensure(equals(b2[0], [1]) && equals(a2[0], [1, 200]), 'test array deep clone 3')

    let a3 = [1, [2]]
    let b3 = arrayDeepClone(a3)
    ensure(equals(a3, b3), 'test array deep clone 4')
    a3[1].push(300)
    ensure(equals(b3[1], [2]) && equals(a3[1], [2, 300]), 'test array deep clone 5')
}

// clone 一个字典并且返回
// 实现浅拷贝
const objectClone = function(object) {
    let res = {}
    let keyList = Object.keys(object)
    for (let index = 0; index < keyList.length; index++) {
        const k = keyList[index]
        res[k] = object[k]
    }
    return res
}

// 字典浅拷贝测试用例
const testObjectClone = function() {
    let a1 = {
        x: 1,
    }
    let b1 = objectClone(a1)
    ensure(equals(a1, b1), 'test object clone 1')
    a1.y = 100
    ensure(!Object.keys(b1).includes('y'), 'test object clone 2')

    let a2 = {
        x: 1,
        y: {},
    }
    let b2 = objectClone(a2)
    ensure(equals(a2, b2), 'test object clone 3')
    b2.y.z = 200
    ensure(a2.y.z == 200, 'test object clone 4')
}

// clone 一个字典并且返回
// 实现深拷贝
const objectDeepClone = function(object) {
    let res = {}
    let keyList = Object.keys(object)
    for (let index = 0; index < keyList.length; index++) {
        const k = keyList[index]
        let v = object[k]
        if (isObject(v)) {
            res[k] = objectDeepClone(v)
        } else if (isArray(v)) {
            res[k] = arrayDeepClone(v)
        } else {
            res[k] = v
        }
    }
    return res
}

// 字典深拷贝测试用例
const testObjectDeepClone = function() {
    let a1 = {
        x: 1,
        y: 2,
    }
    let b1 = objectDeepClone(a1)
    ensure(equals(a1, b1), 'test object deep clone 1')
    a1.y = 100
    ensure(b1.y == 2 && a1.y == 100, 'test object deep clone 2')

    let a2 = {
        x: 1,
        y: {},
    }
    let b2 = objectDeepClone(a2)
    ensure(equals(a2, b2), 'test object deep clone 3')
    b2.y.z = 200
    ensure(equals(a2.y, {}) && b2.y.z == 200, 'test object deep clone 4')
}

// 实现深拷贝
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
            const e = deepClone(value[index])
            res.push(e)
        }
    } else {
        res = value
    }
    return res
}

// 实现深拷贝测试用例
const testDeepClone = function() {
    let a1 = [[1]]
    let b1 = deepClone(a1)
    a1[0].push(200)
    ensure(equals(a1, [[1, 200]]) && equals(b1, [[1]]), 'test deep clone 1')

    let a2 = {
        x: 1,
        y: {},
    }
    let b2 = deepClone(a2)
    b2.y.z = 200
    ensure(equals(a2.y, {}) && b2.y.z == 200, 'test deep clone 2')

    let a3 = [
        {
            x: 1,
            y: 2,
        },
    ]
    let b3 = deepClone(a3)
    a3[0].y = [2]
    ensure(equals(a3[0].y, [2]) && equals(b3[0].y, 2), 'test deep clone 3')

    let a4 = {
        x: 1,
        y: [2],
    }
    let b4 = deepClone(a4)
    b4.y.push(200)
    ensure(equals(a4.y, [2]) && equals(b4.y, [2, 200]), 'test deep clone 4')

    let a5 = 100
    let b5 = deepClone(a5)
    ensure(b5 == 100, 'test deep clone 5')
}

const __main = function() {
    testArrayClone()
    testArrayDeepClone()
    testObjectClone()
    testObjectDeepClone()
    testDeepClone()
}

__main()
