// -------- 集合运算 --------
// 集合是数学中基础的概念，在计算机领域也非常重要，它在计算机科学中的主要应用之一是数据库，而数据库是大多数应用程序的根基。

// 集合被用于查询的设计和处理，当我们创建一条从关系型数据库中获取一个数据集合的查询语句时，使用的就是集合运算，并且数据库也会返回一个数据集合。
// 当我们创建一条SQL语句查询命令时，可以指定是从表中获取全部数据还是获取其中的子集；也可以获取两张表共有的数据，只存在于一张表中的数据，或是存在于两张表内的数据，这些SQL领域的运算叫做联接，而SQL链接的基础就是集合运算。

/* 可以对集合进行如下运算
 *  并集：对于给定的两个集合，返回一个包含两个集合中所有元素的新集合。
 *  交集：对于给定的两个集合，返回一个包含两个集合中共有元素的新集合。
 *  差集：对于给定的两个集合，返回一个包含所有存在于第一个集合且不存在于第二个集合的元素的新集合。
 *  子集：验证一个给定集合是否是另一集合的子集。
*/

class Set {
    constructor () {
        // 此处用对象来实现，JavaScript 的对象不允许一个键指向两个不同的属性，也保证了集合里的元素都是唯一的。
        this.items = {}
    }
    // 并集
    // A∪B，x（元素）存在于 A 中，或 x 存在于 B 中。
    union(otherSet) {
        const unionSet = new Set()
        this.values().forEach(value => unionSet.add(value))
        otherSet.values().forEach(value => unionSet.add(value))
        return unionSet
    }
    // 交集
    // A∩B，x（元素）存在于 A 中，且 x 存在于 B 中。
    intersection(otherSet) {
        // const intersectionSet = new Set()
        // const values = this.values()
        // for (let i = 0; i < values.length; i++) {
        //     if (otherSet.has(values[i])) {
        //         intersectionSet.add(values[i])
        //     }
        // }
        // return intersectionSet

        
        // 假设我们有下面两个集合：
        // setA 的值为[1, 2, 3, 4, 5, 6, 7]
        // setB 的值为[4, 6]
        // 按上面的方法，需要迭代七次 setA 的值，然后还要将这七个值和 setB 中的两个值进行比较。
        // 如果我们只需要迭代两次 setB 就好了，更少的迭代次数意味着更少的过程消耗。
        // 优化代码
        const intersectionSet = new Set()
        const values = this.values()
        const otherValues = otherSet.values()
        let biggerSet = values
        let smallerSet = otherValues
        if (otherValues.length - values.length > 0) {
            biggerSet = otherValues
            smallerSet = values
        }
        smallerSet.forEach(value => {
            if (biggerSet.includes(value)) {
                intersectionSet.add(value)
            }
        })
        return intersectionSet
    }
    // 差集
    // A-B，x（元素）存在于 A 中，且 x 不存在于 B 中。
    difference(otherSet) {
        const differenceSet = new Set()
        this.values().forEach(value => {
            if (!otherSet.has(value)) {
                differenceSet.add(value)
            }
        })
        return differenceSet
    }
    // 子集
    // A⊆B，集合 A 中的每一个 x（元素），也需要存在于集合 B 中。
    isSubsetOf(otherSet) {
        // 子集的元素个数需要小于或等于要比较的集合。
        if (this.size() > otherSet.size()) {
            return false
        }
        let isSubset = true
        this.values().every(value => {
            if (!otherSet.has(value)) {
                // 如果回调函数返回 false，循环会停止，这就是为什么改变 isSubset 标识的值。
                isSubset = false
                return false
            }
            // 只要回调函数返回 true，every 方法就会被调用。
            return true
        })
        return isSubset
    }


    // 下面是 Set 的方法，没有变化
    // 判断元素是否在集合中，在集合中返回 true，否则返回 false。
    has(element) {
        // 下面两种实现的问题在于：
        // 不是所有的对象都继承了 Object.prototype，甚至继承了 Object.prototype 的对象上的 hasOwnProperty 方法也有可能被覆盖，导致代码不能正常工作。
        // return element in items
        // return this.items.hasOwnProperty(element)

        // 使用 Object.prototype.hasOwnProperty.call 是更安全的做法。
        return Object.prototype.hasOwnProperty.call(this.items, element)
    }
    // 向集合添加一个新元素。
    add(element) {
        if (!this.has(element)) {
            this.items[element] = element
            return true
        }
        return false
    }
    // 从集合移除一个元素。
    delete(element) {
        if (this.has(element)) {
            delete this.items[element]
            return true
        }
        return false
    }
    // 移除集合中的所有元素。
    clear() {
        this.items = {}
    }
    // 返回集合所包含元素的数量。
    size() {
        // 第一种方式是使用一个 length 变量，每当使用 add 或 delete 方法时就更新 length 变量

        // 第二种方式是使用 JavaScript 中 Object 类的一个内置方法 Object.keys
        // return Object.keys(this.items).length

        // 第三种方式是手动提取 items 对象的每一个属性，记录属性的个数并返回这个数。
        let count = 0
        for (let key in this.items) {
            // 要使用 has 验证 items 对象具有该属性，因为对象的原型包含了额外的属性（有继承自 JavaScript Object 类的，也有属于对象自身、未用于数据结构的）
            if (this.items.hasOwnProperty(key)) {
                count++
            }
        }
        return count
    }
    // 返回一个包含集合中所有值（元素）的数组。
    values() {
        // 和 size 同理
        // 1，使用 JavaScript 中 Object 类的一个内置方法 Object.values
        // return Object.values(this.items)

        // 2，手动提取
        let values = []
        for (let key in this.items) {
            if (this.items.hasOwnProperty(key)) {
                values.push(key)
            }
        }
        return values
    }
}


// -------- test --------
var log = console.log.bind(console)
const setA = new Set()
setA.add(1)
setA.add(2)
setA.add(3)
const setB = new Set()
setB.add(3)
setB.add(4)
setB.add(5)
setB.add(6)
const result = setA.union(setB)
log(result.values())            // [1, 2, 3, 4, 5, 6]
const intersectionAB = setA.intersection(setB)
log(intersectionAB.values())    // [3]
const differenceAB = setA.difference(setB)
log(differenceAB.values())      // ['1', '2']
const setC = new Set()
setC.add(1)
setC.add(2)
setC.add(3)
setC.add(4)
console.log(setA.isSubsetOf(setB)) // false
console.log(setA.isSubsetOf(setC)) // true
