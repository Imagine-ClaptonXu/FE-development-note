// -------- 内插搜索 --------

/*
内插搜索是改良版的二分搜索。
二分搜索总是检查 mid 位置上的值，而内插搜索可能会根据要搜索的值检查数组中的不同地方。
这个算法要求被搜索的数据结构已排序。

以下是该算法遵循的步骤：
(1) 使用 position 公式选中一个值；
(2) 如果这个值是待搜索值，那么算法执行完毕（值找到了）；
(3) 如果待搜索值比选中值要小，则返回步骤 1 并在选中值左边的子数组中寻找（较小）；
(4) 如果待搜索值比选中值要大，则返回步骤 1 并在选种值右边的子数组中寻找（较大）；
*/
var log = console.log.bind(console)

const DOES_NOT_EXIST = -1;

// 内插搜索
function interpolationSearch(array, value, compareFn=defaultCompare, equalsFn=equals, diffFn=defaultDiff) {
    const { length } = array
    let low = 0
    let high = length - 1
    let position = -1
    let delta = -1
    while (low <= high && biggerOrEquals(value, array[low], compareFn) && lesserOrEquals(value, array[high], compareFn)) {
        // 公式的做法是，如果查找的值更接近 array[high] 则查找 position 位置旁更大的值，
        // 如果查找的值更接近 array[low] 则查找 position 位置旁更小的值。
        // 这个算法在数组中的值都是均匀分布时性能最好（delta 会非常小）。
        delta = diffFn(value, array[low]) / diffFn(array[high], array[low])
        // 首先要计算要比较值的位置 position。
        position = low + Math.floor((high - low) * delta)
        // 如果待搜索值找到了，则返回它的索引值。
        if (equalsFn(array[position], value)) {
            return position
        }
        // 如果待搜索值小于当前位置的值，使用左边或右边的子数组重复这段逻辑。
        if (compareFn(array[position], value) === Compare.LESS_THAN) {
            low = position + 1
        } else {
            high = position - 1
        }
    }
    return DOES_NOT_EXIST
}

// fix: book P260, 补充 书中没有提供的 defaultDiff 方法
function defaultDiff(a, b) {
    return a - b
}

function lesserOrEquals(a, b, compareFn) {
    const comp = compareFn(a, b)
    return comp === Compare.LESS_THAN || comp === Compare.EQUALS
}

function biggerOrEquals(a, b, compareFn) {
    const comp = compareFn(a, b)
    return comp === Compare.BIGGER_THAN || comp === Compare.EQUALS
}

const Compare = {
    LESS_THAN: -1,
    BIGGER_THAN: 1,
    EQUALS: 0,
}

// 用来比较元素
const defaultCompare = function (a, b) {
    if (a === b) {
        return 0
    }
    return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN
}

const equals = function(a, b) {
    const isArray = function(s) {
        return Object.prototype.toString.call(s) === '[object Array]'
    }

    const isObject = function(s) {
        return Object.prototype.toString.call(s) === '[object Object]'
    }

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

// test
interpolationSearch([1,2,3,6], 6)
