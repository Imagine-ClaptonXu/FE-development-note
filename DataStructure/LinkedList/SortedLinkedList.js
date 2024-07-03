// -------- 有序链表 --------
// 有序链表是指保持元素有序的链表结构。除了使用排序算法之外，还可以将元素插入到正确的位置来保证链表的有序性。


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
// 链表
class LinkedList {
    constructor (equalsFn=equals) {
        // 我们使用count来记录链表中的总数。
        this.count = 0
        // 由于链表数据结构是动态的，因此我们需要将第一个元素的引用保存下来。
        this.head = undefined
        // 如果我们要在链表中遍历，判断当前节点是否是我们需要的节点，而链表中的节点不仅仅是值类型还可能是引用类型，
        // 因此需要我们提供一个比较方法，当没有这个方法的时候则使用默认的 equals() 方法
        this.equalsFn = equalsFn
    }
    // 向链表尾部添加一个新元素
    push(element) {
        const node = new Node(element)
        let current
        if (this.head === undefined) {
            this.head = node
        } else {
            current = this.head
            // 获得最后一项
            while (current.next !== undefined) {
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


const Compare = {
    LESS_THAN: -1,
    BIGGER_THAN: 1,
}

// 用来比较元素
const defaultCompare = function (a, b) {
    if (a === b) {
        return 0;
    }
    return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN
}

// 有序链表
class SortedLinkedList extends LinkedList {
    // SortedLinkedList 类会从 LinkedList 类中继承所有的属性和方法，但是由于这个类有特别的行为，我们需要一个用来比较元素的函数。
    // 因此，还需要声明 compareFn，用来比较元素。该函数会默认使用 defaultCompare。
    // 如果元素有相同的引用，它就返回 0。如果第一个元素小于第二个元素，它就返回 -1，反之则返回 1。
    // 为了保证代码优雅，可以声明一个 Compare 常量来表示每个值。
    // 如果用于比较的元素更复杂一些，我们可以创建自定义的比较函数并将它传入 SortedLinkedList 类的构造函数中。
    constructor(equalsFn=equals, compareFn=defaultCompare) {
        super(equalsFn)
        this.compareFn = compareFn
    }
    // 有序插入元素
    // 由于不想允许在任何位置插入元素，要给 index 参数设置一个默认值，以便直接调用 list.insert(myElement) 而无须传入 index 参数。
    // 如果 index 参数传给了方法，它的值会被忽略，因为插入元素的位置是内部控制的。
    insert(element, index = 0) {
        // 如果有序链表为空，我们可以直接调用 LinkedList 的 insert 方法并传入 0 作为 index。
        if (this.isEmpty()) {
            return super.insert(element, 0)
        }
        // 如果不为空，调用 getIndexNextSortedElement(element) 会知道插入元素的正确位置并调用 LinkedList 的 insert 方法，传入该位置来保证链表有序。
        const pos = this.getIndexNextSortedElement(element)
        return super.insert(element, pos)
    }
    getIndexNextSortedElement(element) {
        let current = this.head
        let i = 0
        for (; i < this.size() && current; i++) {
            const compare = this.compareFn(element, current.element)
            if (compare === Compare.LESS_THAN) {
                return i
            }
            current = current.next
        }
        return i
    }
}


// -------- test --------
var log = console.log.bind(console)
const linkedList = new SortedLinkedList()
log(linkedList.size())            // 0 
log(linkedList.isEmpty())         // true
linkedList.insert(1)
log(linkedList.getHead())         // 1
linkedList.insert(3)
linkedList.insert(2, 0)
linkedList.insert(5, 0)
log(linkedList.size())            // 4
let node = linkedList.getElementAt(2)
log(node.element)                 // 2
log(linkedList.indexOf(5))        // 3
log(linkedList.indexOf(8))        // -1
log(linkedList.insert(9, 1))      // true
log(linkedList.toString())        // 1,2,3,5,9
log(linkedList.remove(2))         // 2
log(linkedList.toString())        // 1,3,5,9
log(linkedList.removeAt(2))       // 5
log(linkedList.toString())        // 1,3,9
