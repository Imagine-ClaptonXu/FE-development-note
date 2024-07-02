// -------- 链表 --------

/** 链表
-------- 为什么需要链表 --------
要存储多个元素，数组（或列表）可能是最常用的数据结构。每种语言都实现了数组。这种数据结构非常方便，提供了一个便利的[]语法来访问其元素。
然而，这种数据结构有一个缺点：（在大多数语言中）数组的大小是固定的，从数组的起点或中间插入或移除项的成本很高，因为需要移动元素。
（JavaScript 有来自 Array 类的方法可以帮我们做这些事，但背后的情况同样如此。）
-------- 链表是什么 --------
链表存储有序的元素集合，但不同于数组，链表中的元素在内存中并不是连续放置的。每个元素由一个存储元素本身的节点和一个指向下一个元素的引用（也称指针或链接）组成。
相对于传统的数组，链表的一个好处在于，添加或移除元素的时候不需要移动其他元素。然而，链表需要使用指针，因此实现链表时需要额外注意。
在数组中，我们可以直接访问任何位置的任何元素，而要想访问链表中间的一个元素，则需要从起点（表头）开始迭代链表直到找到所需的元素。
*/

/** 常见的操作(方法)
 push(element)：向链表尾部添加一个新元素。
 insert(element, position)：向链表的特定位置插入一个新元素。
 getElementAt(index)：返回链表中特定位置的元素。如果链表中不存在这样的元素，则返回 undefined。
 remove(element)：从链表中移除一个元素。
 indexOf(element)：返回元素在链表中的索引。如果链表中没有该元素则返回-1。
 removeAt(position)：从链表的特定位置移除一个元素。
 isEmpty()：如果链表中不包含任何元素，返回 true，如果链表长度大于 0则返回 false。
 size()：返回链表包含的元素个数，与数组的 length 属性类似。
 toString()：返回表示整个链表的字符串。由于列表项使用了 Node 类，就需要重写继承自 JavaScript 对象默认的 toString 方法，让其只输出元素的值。
getHead()：返回链表的第一个元素。
clear(): 清空链表
updateNodeAt(element, index): 修改某个位置的元素并返回 true, 如果链表中没有元素就返回 false
*/

// util
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

// 链表节点
// 表示我们想要添加到链表中的项
class Node {
    constructor(element) {
        // 表示要加入链表元素的值
        this.element = element
        // 指向链表下一个元素的指针
        this.next = null
    }
}

// 链表
class LinkedList {
    constructor (equalsFn=equals) {
        // 我们使用count来记录链表中的总数。
        this.count = 0
        // 由于链表数据结构是动态的，因此我们需要将第一个元素的引用保存下来。
        this.head = null
        // 如果我们要在链表中遍历，判断当前节点是否是我们需要的节点，而链表中的节点不仅仅是值类型还可能是引用类型，
        // 因此需要我们提供一个比较方法，当没有这个方法的时候则使用默认的 equals() 方法
        this.equalsFn = equalsFn
    }
    // 向链表尾部添加一个新元素
    push(element) {
        const node = new Node(element)
        let current
        if (this.head === null) {
            this.head = node
        } else {
            current = this.head
            // 获得最后一项
            while (current.next !== null) {
                current = current.next
            }
            // 将其 next 赋为新元素，建立链接
            current.next = node
        }
        this.count++
    }
    // 返回链表中特定位置的元素。如果不存在，返回 undefined
    getElementAt(index) {
        if (index >= 0 && index <= this.count) {
            let current = this.head
            for (let i = 0; i < index && current !== null; i++) {
                current = current.next
            }
            return current
        }
        return undefined
    }
    // 从链表的特定位置移除一个元素。
    removeAt(index) {
        // 检查越界值
        if (index >= 0 && index < this.count) {
            let current = this.head
            // 移除第一项，就是让 head 指向列表的第二个元素
            if (index === 0) {
                this.head = current.next
            } else {
                const previous = this.getElementAt(index - 1)
                current = previous.next
                // 将 previous 与 current 的下一项链接起来：跳过 current，从而移除它
                previous.next = current.next
            }
            this.count--
            return current.element
        }
        return undefined
    }
    // 向链表的特定位置插入一个新元素。
    insert(element, index) {
        if (index >= 0 && index <= this.count) {
            const node = new Node(element)
            // 在第一个位置添加
            if (index === 0) {
                const current = this.head
                node.next = current
                this.head = node
            } else {
                // index-1      index
                // previous     current

                // index-1                  index                       index+1
                // previous.next    =>      node    node.next   =>      current

                // index-1      index       index+1
                // previous     node        current

                const previous = this.getElementAt(index - 1)
                const current = previous.next
                // 与 removeAt() 直接跳过 current 不同的是
                // insert 时需要我们先将 previous 和 node 链接起来，既：node.next = current
                node.next = current
                // 随后再将 previous 和 node 链接起来，既：previous.next = node
                previous.next = node
            }
            this.count++
            return true
        }
        return false
    }
    // 返回元素在链表中的索引。如果链表中没有该元素则返回-1。
    indexOf(element) {
        let current = this.head
        for (let i = 0; i < this.count && current != null; i++) {
            if (this.equalsFn(element, current.element)) {
                return i
            }
            current = current.next
        }
        return -1
    }
    // 从链表中移除一个元素。
    remove(element) {
        // 不关心 index 是否为 -1，因为在 removeAt() 方法中已经检查了 index 参数的合法性
        const index = this.indexOf(element)
        return this.removeAt(index)
    }
    // 返回链表包含的元素个数，与数组的 length 属性类似。
    size() {
        return this.count
    }
    // 如果链表中不包含任何元素，返回 true，如果链表长度大于 0则返回 false。
    isEmpty() {
        return this.size() === 0
    }
    // 返回链表的第一个元素。
    getHead() {
        return this.head === null ? undefined : this.head.element
    }
    // 返回表示整个链表的字符串。
    toString() {
        if (this.isEmpty()) { // 也可以用 this.head === null 来判断
            return ''
        }
        let str = this.head.element
        let current = this.head
    
        while (current.next !== null) {
            current = current.next
            str = `${str},${current.element}`
        }
        return str
    }
    clear() {
        this.count = 0
        this.head = null
    }
    // 修改某个位置的元素并返回 true, 如果链表中没有元素就返回 false
    updateNodeAt(element, index) {
        const current = this.getElementAt(index)
        if (current === undefined) {
            return false
        }
        current.element = element
        return true
    }
}


// -------- test --------
var log = console.log.bind(console)
const linkedList = new LinkedList()
log(linkedList.size())          // 0 
log(linkedList.isEmpty())       // true
linkedList.push(1)
log(linkedList.getHead())       // 1
linkedList.push(3)
linkedList.push(2)
linkedList.push(5)
log(linkedList.size())          // 4
let node = linkedList.getElementAt(2)
log(node.element)               // 2
log(linkedList.indexOf(5))      // 3
log(linkedList.indexOf(8))      // -1
log(linkedList.insert(9, 1))    // true
log(linkedList.toString())      // 1,9,3,2,5
log(linkedList.remove(2))       // 2
log(linkedList.toString())      // 1,9,3,5
log(linkedList.removeAt(2))     // 3
log(linkedList.toString())      // 1,9,5
log(linkedList.updateNodeAt(0, 1)) // true
log(linkedList.toString())      // 1,0,5
log(linkedList.updateNodeAt(7, 7)) // false
log(linkedList.toString())      // 1,0,5
