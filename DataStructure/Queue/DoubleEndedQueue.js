// -------- 双端队列 --------
// 双端队列是一种将栈的原则和队列的原则混合在一起的数据结构。
// 双端队列是一种允许我们同时从前端和后端添加和移除元素的特殊队列，在计算机科学中，双端队列的一个常见应用是存储一系列撤销操作，
// 每当用户在软件中进行了一个操作，该操作被存在一个双端队列中，当用户点击撤销按钮时，该操作会被从双端队列中弹出，表示它被从后面移除了。
// 在进行预先定义的一定数量的操作后，最新进行的操作会被从双端队列的前端移除。
// 部分代码和队列相同，同时也拥有一些相同的方法: isEmpty()、clear()、size()和toString()
// isEmpty(): 判断队列是否为空。
// size(): 返回队列包含元素的个数。
// clear(): 清空队列。
// toString(): 将队列转换成字符串格式。
// addFront(): 在双端队列的前端添加新元素。
// addBack(): 在双端队列的后端添加新元素。
// removeFront(): 在双端队列的前端移除新元素。
// removeBack(): 在双端队列的后端移除新元素。
// peekFront(): 返回双端队列前端的第一个元素。
// peekBack(): 返回双端队列后端的第一个元素。

class DoubleEndedQueue {
    constructor() {
        this.count = 0
        this.front = 0
        this.items = {}
    }
    size() {
        return this.count - this.front
    }
    isEmpty() {
        return this.size() === 0
    }
    clear() {
        this.count = 0
        this.front = 0
        this.items = {}
    }
    toString() {
        if (this.isEmpty()) {
            return ''
        }
        let strObj = this.items[this.front]
        for (let i = this.front + 1; i < this.count; i++) {
            strObj = `${strObj},${this.items[i]}`
        }
        return strObj
    }
    addFront(element) {
        if (this.isEmpty()) {
            this.addBack(element)
        } else {
            this.items[--this.front] = element
        }
    }
    addBack(element) {
        this.items[this.count] = element
        this.count++
    }
    removeFront() {
        if (this.isEmpty()) {
            return undefined
        }
        const result = this.items[this.front]
        delete this.items[this.front]
        this.front++
        return result
    }
    removeBack() {
        if (this.isEmpty()) {
            return undefined
        }
        this.count--
        const result = this.items[this.count]
        delete this.items[this.count]
        return result
    }
    peekFront() {
        if (this.isEmpty()) {
            return undefined
        }
        return this.items[this.front]
    }
    peekBack() {
        if (this.isEmpty()) {
            return undefined
        }
        return this.items[this.count - 1]
    }
}


// -------- test --------
var log = console.log.bind(console)
const dequeue = new DoubleEndedQueue()
log(dequeue.isEmpty())  // true
dequeue.addBack('AAA')
dequeue.addBack('BBB')
log(dequeue.toString()) // AAA,BBB
dequeue.addBack('CCC')
log(dequeue.toString()) // AAA,BBB,CCC
log(dequeue.size())     // 3
dequeue.removeFront() 
log(dequeue.toString()) // BBB,CCC
dequeue.removeBack()
log(dequeue.toString()) // BBB
dequeue.addFront('DDD')
log(dequeue.peekFront())// DDD
log(dequeue.peekBack()) // BBB
log(dequeue.toString()) // DDD,BBB
