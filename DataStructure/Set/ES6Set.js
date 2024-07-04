// -------- ES6(ECMAScript 2015) —— Set --------


// -------- ES6 Set --------
var log = console.log.bind(console)
const set = new Set()
set.add(1)
log(set.values()) // 输出@SetIterator
log(set.has(1)) // 输出 true
log(set.size) // 输出 1
set.delete(1)
// clear 方法会重置 set 数据结构
log(set.has(1)) // 输出 false
set.add(1)
set.delete(1)
set.clear()
log(set.size) // 输出 0


// -------- ES6 Set 运算 --------
const setA = new Set()
setA.add(1)
setA.add(2)
setA.add(3)
const setB = new Set()
setB.add(2)
setB.add(3)
setB.add(4)

// 模拟并集运算
const union = (setA, setB) => {
    const unionAb = new Set()
    setA.forEach(value => unionAb.add(value))
    setB.forEach(value => unionAb.add(value))
    return unionAb
}
log('并集', union(setA, setB)) // 输出 [1, 2, 3, 4]

// 使用扩展运算符
log('并集, 使用扩展运算符', new Set([...setA, ...setB]))

// 模拟交集运算
const intersection = (setA, setB) => {
    const intersectionSet = new Set()
    setA.forEach(value => {
        if (setB.has(value)) {
            intersectionSet.add(value)
        }
    })
    return intersectionSet
}
log('交集', intersection(setA, setB)) // 输出 [2, 3]

// 使用扩展运算符
log('交集, 使用扩展运算符', new Set([...setA].filter(x => setB.has(x))))

// 模拟差集运算
const difference = (setA, setB) => {
    const differenceSet = new Set()
    setA.forEach(value => {
        if (!setB.has(value)) {
            differenceSet.add(value)
        }
    })
    return differenceSet
}
log('差集', difference(setA, setB)) // 输出 [1]

// 使用扩展运算符
log('差集, 使用扩展运算符', new Set([...setA].filter(x => !setB.has(x))))
