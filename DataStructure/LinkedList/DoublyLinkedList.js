// -------- 双向链表 --------
// 双向链表和普通链表的区别在于，在链表中，一个节点只有链向下一个节点的链接；
// 而在双向链表中，链接是双向的：一个链向下一个元素，另一个链向前一个元素


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
class Node {
    constructor(element) {
        // 表示要加入链表元素的值
        this.element = element
        // 指向链表下一个元素的指针
        this.next = null
    }
}
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


// 双向链表的链表节点
class DoublyNode extends Node {
    constructor (element, next, prev) {
        super(element, next)
        // previous，链向前一个元素
        this.prev = prev // 双向链表新增的内容
    }
}

// 双向链表
class DoublyLinkedList extends LinkedList {
    constructor(equalsFn=equals) {
        super(equalsFn)
        // 控制着指向最后一个元素的指针。
        this.tail = undefined // 双向链表新增的内容
    }
    // 插入一个新元素，跟普通(单向)链表区别在于：
    // 普通(单向)链表只需要控制一个 next 指针，而双向链表同时需要控制 next 和 prev 两个指针。
    insert(element, index) {
        if (index >= 0 && index <= this.count) {
            const node = new DoublyNode(element)
            let current = this.head
            if (index === 0) {
                // 在双向链表第一个位置（起点）插入一个新元素。
                if (this.head == null) {
                    // 如果双向链表为空，只需要把 head 和 tail 都指向这个新节点
                    this.head = node
                    this.tail = node // 双向链表新增的内容
                } else {
                    // 如果不为空，current 变量将是对双向链表中第一个元素的引用。
                    // 就像我们在链表中所做的，把 node.next 设为 current，而 head 将指向 node。
                    // 不同之处在于，我们还需要为指向上一个元素的指针设一个值。
                    // current.prev 指针将由指向 undefined 变为指向新元素。node.prev 指针已经是 undefined，因此无须更新。
                    node.next = this.head
                    current.prev = node // 双向链表新增的内容
                    this.head = node
                }
            } else if (index === this.count) { // 双向链表新增的内容
                // 在双向链表最后添加一个新元素。
                // 这是一种特殊情况，因为我们还控制着指向最后一个元素的指针。
                // current 变量将引用最后一个元素，然后开始建立链接，current.next 指针（指向 undefined）将指向 node（node.next 已经指向了 undefined）。
                // node.prev 将引用 current。最后只剩一件事了，就是更新 tail，它将由指向 current 变为指向 node
                current = this.tail
                current.next = node
                node.prev = current
                this.tail = node
            } else {
                // 在双向链表中间插入一个新元素。
                // 迭代双向链表，直到要找的位置。getElementAt 方法是继承的，不需要重写。我们将在 current 和 previous 元素之间插入新元素。
                // 首先，node.next 将指向 current，而 previous.next 将指向 node，这样就不会丢失节点之间的链接。
                // 然后需要处理所有的链接：current.prev 将指向 node，而 node.prev 将指向 previous。
                const previous = this.getElementAt(index - 1)
                current = previous.next
                node.next = current
                previous.next = node
                current.prev = node // 双向链表新增的内容
                node.prev = previous // 双向链表新增的内容
            }
            this.count++
            return true
        }
        return false
    }
    // 从任意位置移除元素
    removeAt(index) {
        if (index >= 0 && index < this.count) {
            let current = this.head
            if (index === 0) {
                // 移除第一个元素。
                // current 变量是对双向链表中第一个元素的引用，也就是我们想移除的元素。
                // 需要改变 head 的引用，将其从 current 改为下一个元素（current.next），还要更新 current.next 指向上一个元素的指针（因为第一个元素的 prev 指针是 undefined）。
                // 因此，把 head.prev 指向 undefined（因为 head 也指向双向链表中新的第一个元素，也可以用 current.next.prev）。
                // 由于要移除的元素是第一个元素，且双向链表只有一项的时候，需要把 tail 也设为 undefined。
                this.head = current.next
                // 双向链表新增的内容
                // 如果只有一项，更新 tail 
                if (this.count === 1) {
                    this.tail = undefined
                } else {
                    this.head.prev = undefined
                }
            } else if (index === this.count - 1) { // 双向链表新增的内容
                // 从最后一个位置移除元素。
                // 既然已经有了对最后一个元素的引用（tail），我们就不需要为找到它而迭代双向链表。
                // 这样也就可以把 tail 的引用赋给 current 变量。接下来，需要把 tail 的引用更新为双向链表中倒数第二个元素（current.prev，或者 tail.prev）。
                // 既然 tail 指向了倒数第二个元素，我们就只需要把 next 指向 undefined。
                current = this.tail
                this.tail = current.prev
                this.tail.next = undefined
            } else {
                // 从双向链表中间移除一个元素。
                // 首先需要迭代双向链表，直到要找的位置。current 变量所引用的就是要移除的元素。
                // 要移除它，可以通过更新 previous.next 和 current.next.prev 的引用，在双向链表中跳过它。
                // 因此，previous.next 将指向 current.next，而 current.next.prev 将指向 previous。
                current = this.getElementAt(index)
                const previous = current.prev
                // 将 previous 与 current 的下一项链接起来——跳过 current
                previous.next = current.next
                current.next.prev = previous // 双向链表新增的内容
            }
            this.count--
            return current.element
        }
        return undefined
    }
    // 在双向链表尾部添加新元素，区别仍然是我们需要多维护一个 tail 指针。
    push (element) {
        const node = new DoublyNode(element)
        if (this.head === null) {
            this.tail = node
            this.head = node
        } else {
            this.tail.next = node
            node.prev = this.tail
            this.tail = node
        }
        this.count++
    }
    clear() {
        super.clear()
        this.tail = null
    }
    // 返回链表的最后一个元素。
    getTail() {
        return this.tail === null ? undefined : this.tail.element
    }
    // 反向返回表示整个链表的字符串。
    inverseToString() {
        if (this.tail === null) {
          return ''
        }
        let str = `${this.tail.element}`
        let current = this.tail.prev
        for (let index = 0; index < this.count && current != null; index++) {
            str = `${str},${current.element}`
            current = current.prev
        }
        return str
    }
}


// -------- test --------
var log = console.log.bind(console)
const linkedList = new DoublyLinkedList()
log(linkedList.size())            // 0
log(linkedList.isEmpty())         // true
linkedList.push(1)
log(linkedList.getHead())         // 1
linkedList.push(3)
linkedList.push(2)
linkedList.push(5)
log(linkedList.size())            // 4
let node = linkedList.getElementAt(2)
log(node.element)                 // 2
log(linkedList.indexOf(5))        // 3
log(linkedList.indexOf(8))        // -1
log(linkedList.insert(9, 1))      // true
log(linkedList.toString())        // 1,9,3,2,5
log(linkedList.inverseToString()) // 5,2,3,9,1
log(linkedList.getTail())         // 5
log(linkedList.remove(2))         // 2
log(linkedList.toString())        // 1,9,3,5
log(linkedList.inverseToString()) // 5,3,9,1
log(linkedList.removeAt(2))       // 3
log(linkedList.toString())        // 1,9,5
