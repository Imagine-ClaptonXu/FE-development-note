// -------- 队列 --------
// 是一种遵循先进先出(FIFO)原则的一组有序的项，队列在尾部添加新元素，并从顶部移除元素，最新添加的元素必须排在队列的末尾。
class Queue {
    constructor(items) {
        this.items = items || []
    }

    // 入队
    enqueue(element){
        this.items.push(element)
    }

    // 出队
    dequeue() {
        return this.items.shift()
    }

    // 首位
    peek() {
        return this.items[0]
    }

    // 末位
    last() {
        return this.items[this.items.length - 1]
    }

    clear() {
        this.items = []
    }

    size() {
        return this.items.length
    }

    isEmpty() {
        return !this.items.length
    }

    print() {
        log(this.items)
    }
}

var log = console.log.bind(console)
const queue = new Queue()
log(queue.isEmpty) // true
queue.enqueue('John')
queue.enqueue('Jack')
queue.enqueue('Camila')
log(queue.size()) // 3
log(queue.isEmpty()) // false
queue.dequeue()
queue.dequeue()
queue.print() // 'Camila'
