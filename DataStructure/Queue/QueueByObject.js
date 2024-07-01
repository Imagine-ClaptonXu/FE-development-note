// -------- 基于对象的队列 --------
// 是一种遵循先进先出(FIFO)原则的一组有序的项，队列在尾部添加新元素，并从顶部移除元素，最新添加的元素必须排在队列的末尾。
// enqueue(): 向队列的尾部添加元素。
// dequeue(): 在队列的开头移除第一个元素，并返回被移除的元素。
// peek(): 返回队列的第一个元素。
// isEmpty(): 判断队列是否为空。
// size(): 返回队列包含元素的个数。
// clear(): 清空队列。
// toString(): 将队列转换成字符串格式。

class Queue {
    constructor() {
        // 控制队列的大小
        this.count = 0
        // 追踪第一个元素
        this.front = 0
        // 仿照栈数据结构，写出一个在获取元素时更高效的数据结构，使用一个对象来存储元素
        this.items = {}
    }
    // 向队列的尾部添加元素。
    enqueue(element) {
        this.items[this.count] = element
        this.count++
    }
    // 在队列的开头移除第一个元素，并返回被移除的元素。
    dequeue() {
        if (this.isEmpty()) {
            return undefined
        }
        const result = this.items[this.front]
        delete this.items[this.front]
        this.front++
        return result
    }
    // 返回队列的第一个元素。
    peek() {
        if (this.isEmpty()) {
            return undefined
        }
        return this.items[this.front]
    }
    isEmpty() {
        return this.size() === 0
    }
    size() {
        return this.count - this.front
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
        let objStr = this.items[this.front]
        for (let i = this.front + 1; i < this.count; i++) {
            objStr = `${objStr},${this.items[i]}`
        }
        return objStr
    }
}

// -------- test --------
var log = console.log.bind(console)
const queue = new Queue()
log(queue.isEmpty())  // true
queue.enqueue('AAA')
queue.enqueue('BBB')
queue.enqueue('CCC')
log(queue.isEmpty())  // false
log(queue.size())     // 3
log(queue.toString()) // AAA,BBB,CCC
log(queue.peek())     // AAA
queue.dequeue()
queue.clear()
log(queue.isEmpty())  // true
queue.enqueue('John')
queue.enqueue('Camila')
log(queue.size()) // 3
log(queue.isEmpty()) // false
queue.dequeue()
log(queue.toString()) // 'Camila'
