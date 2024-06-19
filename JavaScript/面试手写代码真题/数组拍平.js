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

// 把数组 array 拍平，只需要把层级减少一层
const flat = function(array) {
    let res = []
    for (let index = 0; index < array.length; index++) {
        const e = array[index]
        if (isArray(e)) {
            for (let index2 = 0; index2 < e.length; index2++) {
                const e2 = e[index2]
                res.push(e2)
            }
        } else {
            res.push(e)
        }
    }
    // log('res:', res)
    return res
}

// flat 测试用例
const testFlat = function() {
    let test1 = []
    let test2 = [1]
    let test3 = [1, [2]]
    let test4 = [1, [2, [3]]]

    ensure(equals(flat(test1), []), 'flat test1')
    ensure(equals(flat(test2), [1]), 'flat test2')
    ensure(equals(flat(test3), [1, 2]), 'flat test3')
    ensure(equals(flat(test4), [1, 2, [3]]), 'flat test4')
}

// 把数组 array 拍平，返回一维数组
const flatDeep = function(l) {
    let r = []
    for (let index = 0; index < l.length; index++) {
        const e = l[index]
        if (isArray(e)) {
            r = [...r, ...flatDeep(e)]
        } else {
            r.push(e)
        }
    }
    log('r:', r)
    return r
}

// flatDeep 测试用例
const testFlatDeep = function() {
    let test1 = []
    let test2 = [1]
    let test3 = [1, [2]]
    let test4 = [1, [2, [3]]]
    let test5 = [1, [2, [3, [4]]]]

    ensure(equals(flatDeep(test1), []), 'flat test1')
    ensure(equals(flatDeep(test2), [1]), 'flat test2')
    ensure(equals(flatDeep(test3), [1, 2]), 'flat test3')
    ensure(equals(flatDeep(test4), [1, 2, 3]), 'flat test4')
    ensure(equals(flatDeep(test5), [1, 2, 3, 4]), 'flat test5')
}

// 把数组 array 拍平，把层级减少 n 层
const flatDeepN = function(l, n) {
    let r = []
    let fn = 0
    for (let index = 0; index < l.length; index++) {
        const e = l[index]
        if (isArray(e)) {
            if (fn < n) {
                r = [...r, ...flatDeepN(e, n-1)]
                fn += 1
            } else {
                r.push(e)
            }
        } else {
            r.push(e)
        }
    }
    log('r:', r)
    return r
}

// flatDeepN 测试用例
flatDeepN([1, [2, [3, [4, [5, [6]]]]]], 3)

const testFlatDeepN = function() {
    let test1 = []
    let test2 = [1]
    let test3 = [1, [2]]
    let test4 = [1, [2, [3]]]
    let test5 = [1, [2, [3, [4]]]]
    let test6 = [1, [2, [3, [4, [5]]]]]
    let test7 = [1, [2, [3, [4, [5, [6]]]]]]

    ensure(equals(flatDeepN(test1, 1), []), 'flat n test1')
    ensure(equals(flatDeepN(test2, 1), [1]), 'flat n test2')
    ensure(equals(flatDeepN(test3, 1), [1, 2]), 'flat n test3')
    ensure(equals(flatDeepN(test4, 1), [1, 2, [3]]), 'flat n test4')
    ensure(equals(flatDeepN(test5, 2), [1, 2, 3, [4]]), 'flat n test5')
    ensure(equals(flatDeepN(test6, 20), [1, 2, 3, 4, 5]), 'flat n test6')
    ensure(equals(flatDeepN(test7, 3), [1, 2, 3, 4, [5, [6]]]), 'flat n test7')
}

const __main = function() {
    testFlat()
    testFlatDeep()
    testFlatDeepN()
}

__main()
