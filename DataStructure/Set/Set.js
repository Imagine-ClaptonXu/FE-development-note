// -------- 集合 --------
// 集合是由一组无序且唯一（即不能重复）的项组成的。也可以把集合想象成一个既没有重复元素，也没有顺序概念的数组。
/* 集合的方法
 *  add(element)：向集合添加一个新元素。
 *  delete(element)：从集合移除一个元素。
 *  has(element)：如果元素在集合中，返回 true，否则返回 false。
 *  clear()：移除集合中的所有元素。
 *  size()：返回集合所包含元素的数量。它与数组的 length 属性类似。
 *  values()：返回一个包含集合中所有值（元素）的数组。
*/

class Set {
    constructor () {
        // 此处用对象来实现，JavaScript 的对象不允许一个键指向两个不同的属性，也保证了集合里的元素都是唯一的。
        this.items = {}
    }
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
const set = new Set()
set.add(1)
log(set.values()) // [1]
log(set.has(1))   // true
log(set.size())   // 1
set.add(2)
set.add(3)
set.add(2)
log(set.values()) // [1, 2, 3]
log(set.has(2))   // true
log(set.size())   // 3
set.delete(1)
log(set.values()) // [2, 3]
set.delete(3)
log(set.values()) // [2]
