// -------- 双向链表实现栈 --------
// 之所以使用双向链表而不是链表，是因为对栈来说，我们会向链表尾部添加元素，也会从链表尾部移除元素。
// DoublyLinkedList 类有列表最后一个元素（tail）的引用，无须迭代整个链表的元素就能获取它。
// 双向链表可以直接获取头尾的元素，减少过程消耗，它的时间复杂度和原始的 Stack 实现相同，为 O(1)。

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

// 双向链表的链表节点
class DoublyNode {
    constructor (element, next, prev) {
        this.element = element
        this.next = next
        // previous，链向前一个元素
        this.prev = prev // 双向链表新增的内容
    }
}

// 双向链表
class DoublyLinkedList {
    constructor(equalsFn=equals) {
        this.count = 0
        this.head = undefined
        // 控制着指向最后一个元素的指针。
        this.tail = undefined // 双向链表新增的内容
        this.equalsFn = equalsFn
    }
    // 插入一个新元素，跟普通(单向)链表区别在于：
    // 普通(单向)链表只需要控制一个 next 指针，而双向链表同时需要控制 next 和 prev 两个指针。
    insert(element, index) {
        if (index >= 0 && index <= this.count) {
            const node = new DoublyNode(element)
            let current = this.head
            if (index === 0) {
                // 在双向链表第一个位置（起点）插入一个新元素。
                if (this.head == undefined) {
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
        if (this.head === undefined) {
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
        this.count = 0
        this.head = undefined
        this.tail = undefined
    }
    // 返回链表的最后一个元素。
    getTail() {
        return this.tail === undefined ? undefined : this.tail.element
    }
    // 反向返回表示整个链表的字符串。
    inverseToString() {
        if (this.tail === undefined) {
          return ''
        }
        let str = `${this.tail.element}`
        let current = this.tail.prev
        for (let index = 0; index < this.count && current !== undefined; index++) {
            str = `${str},${current.element}`
            current = current.prev
        }
        return str
    }

    
    // 下面是普通(单向)链表的方法，没有变化
    // 返回链表中特定位置的元素。如果不存在，返回 undefined
    getElementAt(index) {
        if (index >= 0 && index <= this.count) {
            let current = this.head
            for (let i = 0; i < index && current !== undefined; i++) {
                current = current.next
            }
            return current
        }
        return undefined
    }
    // 返回元素在链表中的索引。如果链表中没有该元素则返回-1。
    indexOf(element) {
        let current = this.head
        for (let i = 0; i < this.count && current != undefined; i++) {
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
        return this.head === undefined ? undefined : this.head.element
    }
    // 返回表示整个链表的字符串。
    toString() {
        if (this.isEmpty()) { // 也可以用 this.head === undefined 来判断
            return ''
        }
        let str = this.head.element
        let current = this.head
    
        while (current.next !== undefined) {
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


// 双向链表实现栈
class StackLinkedList {
    constructor() {
        this.items = new DoublyLinkedList()
    }
    push(element) {
        this.items.push(element)
    }
    pop() {
        if (this.isEmpty()) {
            return undefined
        }
        return this.items.removeAt(this.size() - 1)
    }
    peek() {
        if (this.isEmpty()) {
            return undefined
        }
        return this.items.getElementAt(this.size() - 1).element
    }
    isEmpty() {
        return this.items.isEmpty()
    }
    size() {
        return this.items.size()
    }
    clear() {
        this.items.clear()
    }
    toString() {
        return this.items.toString()
    }
}


// -------- test --------
var log = console.log.bind(console)
const stack = new StackLinkedList()
log(stack.isEmpty()) // true

// 添加元素
stack.push(1)
stack.push(5)
stack.push(8)

// 读取属性再添加
log(stack.peek()) // 8
stack.push(11)
log(stack.size()) // 4
log(stack.isEmpty()) // false
log(stack.toString()) // 1,5,8,11
