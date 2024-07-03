// -------- 循环链表 --------
// 循环链表可以像链表一样只有单向引用，也可以像双向链表一样有双向引用。
// 循环链表和链表的区别：最后一个元素指向下一个元素的指针不是 undefined，而是指向第一个元素（即 tail.next 指向 head）。
// 双向循环链表：tail.next 指向 head 元素，head.prev 指向 tail 元素。

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
        this.element = element
        this.next = undefined
    }
}

// 循环链表
class CircularLinkedList {
    constructor (equalsFn=equals) {
        // 我们使用count来记录链表中的总数。
        this.count = 0
        // 由于链表数据结构是动态的，因此我们需要将第一个元素的引用保存下来。
        this.head = undefined
        // 如果我们要在链表中遍历，判断当前节点是否是我们需要的节点，而链表中的节点不仅仅是值类型还可能是引用类型，
        // 因此需要我们提供一个比较方法，当没有这个方法的时候则使用默认的 equals() 方法
        this.equalsFn = equalsFn
    }
    // 在任意位置插入新元素
    insert(element, index) {
        // 向循环链表中插入元素的逻辑和向普通链表中插入元素的逻辑是一样的。
        if (index >= 0 && index <= this.count) {
            const node = new Node(element)
            let current = this.head
            if (index === 0) {
                if (this.head === undefined) {
                    this.head = node
                    // 循环链表为空，将 head node 赋值为新创建的元素，并且将最后一个节点链接到 head。
                    // 这种情况下，循环链表最后的元素就是我们创建的指向自己的节点，因为它同时也是 head。
                    node.next = this.head // 循环链表新增的内容
                } else {
                    // 在非空循环链表的第一个位置插入元素，要将 node.next 指向 head 节点（current 变量）。这在 LinkedList 类中使用过的逻辑。
                    // 但是在 CircularLinkedList 中，还要保证最后一个节点指向这个新的头部元素，所以需要取得最后一个元素的引用。
                    // 用 getElementAt 方法，传入长度。将头部元素更新为新元素，再将最后一个节点（current）指向新的头部节点。
                    node.next = current
                    current = this.getElementAt(this.size())
                    this.head = node
                    // 不同之处在于我们需要将循环链表尾部节点的 next 引用指向头部节点。
                    current.next = this.head // 循环链表新增的内容
                }
            } else {
                // 在循环链表中间插入新元素，这种场景没有变化，因为对循环链表的第一个和最后一个节点没有做任何修改。
                const previous = this.getElementAt(index - 1)
                node.next = previous.next
                previous.next = node
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
                if (this.size() === 1) {
                    this.head = undefined
                } else {
                    // 从非空循环链表中移除第一个元素。由于 head 的指向会改变，需要修改最后一个节点的 next 属性。
                    // 先保存现在 head 元素的引用，它将从循环链表中移除。和 insert 一样要获得最后一个元素的引用，存储在 current 变量中。
                    // 在取得所有所需节点的引用后，可以构建新的节点指向了。
                    // 先更新 head element，将其指向第二个元素（head.next），
                    // 然后将最后一个 element（current.next）指向新的 head。
                    // 再更新 current 变量的引用，这样就能返回它来表示移除元素的值。
                    const removed = this.head
                    current = this.getElementAt(this.size()) // 循环链表新增的内容
                    this.head = this.head.next
                    current.next = this.head
                    current = removed
                }
            } else {
                // 不需要修改循环链表最后一个元素
                const previous = this.getElementAt(index - 1)
                current = previous.next
                previous.next = current.next
            }
            this.count--
            return current.element
        }
        return undefined
    }
    // 在循环链表尾部添加元素
    push(element) {
        const node = new Node(element)
        if (this.head === undefined) {
            this.head = node
        } else {
            // 获得最后一项
            const current = this.getElementAt(this.count - 1)
            current.next = node
        }
        // 唯一的区别依然是我们需要维护最后一个元素的指针。
        node.next = this.head // 循环链表新增的内容
        this.count++
    }
    // 返回表示整个链表的字符串。
    toString() {
        if (this.isEmpty()) { // 也可以用 this.head === undefined 来判断
            return ''
        }
        let str = this.head.element
        let current = this.head
        // 不能再用 current.next 为 undefined 来判断结束循环，会死循环，改用 this.count
        for (let index = 1; index < this.count; index++) {
            current = current.next
            str = `${str},${current.element}`
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
    // 返回元素在链表中的索引。如果链表中没有该元素则返回-1。
    indexOf(element) {
        let current = this.head
        for (let i = 0; i < this.count && current !== undefined; i++) {
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
    clear() {
        this.count = 0
        this.head = undefined
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
const linkedList = new CircularLinkedList()
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
log(linkedList.remove(2))         // 2
log(linkedList.toString())        // 1,9,3,5
log(linkedList.removeAt(2))       // 3
log(linkedList.toString())        // 1,9,5
