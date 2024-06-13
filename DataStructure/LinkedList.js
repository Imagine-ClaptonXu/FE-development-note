// -------- 链表, 双向链表 --------

/** 常见的操作(方法)
 * 
 * append(element): 向链表尾部添加一个新的项
 * inset(position, element): 向链表的特定位置插入一个新的项
 * get(position): 获取对应位置的元素
 * indexOf(element): 返回元素在链表中的索引, 如果链表中没有元素就返回 -1
 * update(position, element): 修改某个位置的元素并返回, 如果链表中没有元素就返回 false
 * removeAt(position): 从链表的特定位置移除一项
 * remove(element): 移除链表的某个元素
 * isEmpty(): 如果链表中不包含任何元素, 返回 true, 如果链表长度大于 0 则返回 false
 * size(): 返回链表包含的元素个数, 与数组的length属性类似
 * toString(): 由于链表项使用了 Node 类, 就需要重写继承自 JavaScript 对象默认的 toString 方法, 让其只输出元素的值
 * forwardString(): 返回正向遍历节点字符串形式
 * backwordString(): 返回反向遍历的节点的字符串形式, 双向链表
 */

// 链表节点
class Node {
    constructor(element) {
        this.element = element
        this.next = null
    }
}

// 链表(单向链表)
class LinkedList {
    constructor() {
        this.head = null
        this.length = 0
    }

    // 追加元素
    append(element) {
        const node = new Node(element)
        let current = null
        if (this.head === null) {
            this.head = node
        } else {
            current = this.head
            while(current.next) {
                current = current.next
            }
            current.next = node
        }
        this.length++
    }

    // 任意位置插入元素
    insert(position, element) {
        if (position >= 0 && position <= this.length) {
            const node = new Node(element)
            let current = this.head
            let previous = null
            let index = 0
            if (position === 0) {
                this.head = node
            } else {
                while (index++ < position) {
                    previous = current
                    current = current.next
                }
                node.next = current
                previous.next = node
            }
            this.length++
            return true
        }
        return false
    }

    // 获取对应位置的元素
    get(position) {
        let res = null
        if (position >= 0 && position <= this.length) {
            let index = 0
            let current = this.head
            if (position === 0) {
                res = current
            } else {
                while (index++ < position) {
                    current = current.next
                }
                res = current
            }
        }
        return res
    }

    // 寻找元素下标
    indexOf(element) {
        let current = this.head
        let index = -1
        while (current) {
            if (element === current.element) {
                return index + 1
            }
            index++
            current = current.next
        }
        return -1
    }

    // 修改某个位置的元素
    update(position, element) {
        let res = false
        if (position >= 0 && position <= this.length) {
            let index = 0
            let current = this.head
            if (position === 0) {
                current.element = element
            } else {
                while (index++ < position) {
                    current = current.next
                }
                current.element = element
                res = current
            }
        }
        return res
    }

    // 移除指定位置元素
    removeAt(position) {
        // 检查越界值
        if (position > -1 && position < this.length) {
            log('removeAt', position)
            let current = this.head
            let previous = null
            let index = 0
            if (position === 0) {
                this.head = current.next
            } else {
                while (index++ < position) {
                    previous = current
                    current = current.next
                }
                previous.next = current.next
            }
            this.length--
            return current.element
        }
        return null
    }

    // 删除指定元素
    remove(element) {
        const index = this.indexOf(element)
        log('remove index', index)
        return this.removeAt(index)
    }

    isEmpty() {
        return !this.length
    }

    size() {
        return this.length
    }

    // 转为字符串
    toString() {
        let current = this.head
        let string = ''
        while (current) {
            string += ` ${current.element}`
            current = current.next
        }
        return string
    }

    // 返回正向遍历节点字符串形式
    forwardString() {
        return this.toString()
    }

    // 返回反向遍历的节点的字符串形式
    backwordString() {
        return this.toString().split('').reverse().join('')
    }
}

// test
var log = console.log.bind(console)
const linkedList = new LinkedList()
log(linkedList)
linkedList.append(1)
linkedList.append(2)
linkedList.append(3)
linkedList.append(4)
linkedList.insert(3, 666)
linkedList.remove(3)
log(linkedList)
// log('indexOf', linkedList.indexOf(24))
// log('indexOf', linkedList.indexOf(2))
// log('get', linkedList.get(1))
// log('get', linkedList.get(312))
// log('update', linkedList.update(1, 9))
// log('update', linkedList.update(11, 9))
log('toString', linkedList.toString())
// log('backwordString', linkedList.backwordString())


// -------- 双向链表 --------

// 在双向链表中, 链接是双向的: 一个链向下一个元素, 另一个链向前一个元素

// 双向节点
class DoubleNode {
    constructor(element) {
        this.element = element
        this.prev = null
        this.next = null
    }
}

// 双向链表
class DoubleLinkedList {
    constructor() {
        this.head = null
        this.tail = null
        this.length = 0
    }

    // 追加元素
    append(element) {
        const node = new DoubleNode(element)
        if (this.head === null) {
            this.head = node
            this.tail = node
        } else {
            node.prev = this.tail
            this.tail.next = node
            this.tail = node
        }
        this.length++
    }

    // 任意位置插入元素
    insert(position, element) {
        if (position >= 0 && position <= this.length){
            const node = new Node2(element)
            let current = this.head
            let previous = null
            let index = 0
            // 首位
            if (position === 0) {
                if (!this.head){
                    this.head = node
                    this.tail = node
                } else {
                    node.next = current
                    this.head = node
                    current.prev = node
                }
            } else if (position === this.length) {
                // 末位
                current = this.tail
                current.next = node
                node.prev = current
                this.tail = node
            } else {
                // 中间
                while (index++ < position) {
                    previous = current
                    current = current.next
                }
                node.next = current
                previous.next = node
                current.prev = node
                node.prev = previous
            }
            this.length++
            return true
        }
        return false
    }

    // 移除指定位置元素
    removeAt(position) {
        if (position > -1 && position < this.length) {
            let current = this.head
            let previous = null
            let index = 0
            // 首位
            if (position === 0) {
                this.head = this.head.next
                this.head.prev = null
                if (this.length === 1) {
                    this.tail = null
                }
            } else if (position === this.length - 1) {
                // 末位
                this.tail = this.tail.prev
                this.tail.next = null
            } else {
                // 中位
                while (index++ < position) {
                    previous = current
                    current = current.next
                }
                previous.next = current.next
                current.next.prev = previous
            }
            this.length--
            return current.element
        } else {
            return null
        }
    }

    // 转为字符串
    toString() {
        let current = this.head
        let string = ''
        let i = 0
        while (i < this.length) {
            string += ` ${current.element}`
            current = current.next
            i += 1
        }
        return string
    }

    // 转为字符串, 倒序
    toStringReverse() {
        let current = this.tail
        let string = ''
        let i = 0
        while (i < this.length) {
            string += ` ${current.element}`
            current = current.prev
            i += 1
        }
        return string
    }

    // 其他方法...
}

// test
var log = console.log.bind(console)
log('-------- 双向链表 --------')
const linkedList2 = new DoubleLinkedList()
linkedList2.append(1)
linkedList2.append(2)
linkedList2.append(3)
linkedList2.insert(1, 111)
linkedList2.insert(3, 333)
log(linkedList2)
log('toString2', linkedList2.toString())
log('toStringReverse2', linkedList2.toStringReverse())
