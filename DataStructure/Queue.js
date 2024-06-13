// -------- 队列 --------

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

    // 末位
    get front() {
        return this.items[0]
    }

    // 末位
    get peek() {
        return this.items[this.items.length - 1]
    }

    clear() {
        this.items = []
    }

    get size() {
        return this.items.length
    }

    get isEmpty() {
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
log(queue.size) // 3
log(queue.isEmpty) // false
queue.dequeue()
queue.dequeue()
queue.print() // 'Camila'


// -------- 优先队列 --------

class PriorityQueue {
    constructor() {
        this.items = []
    }

    // 入队
    enqueue(element, priority){
        const queueElement = { element, priority }
        if (this.isEmpty) {
            this.items.push(queueElement)
        } else {
            const preIndex = this.items.findIndex((item) => queueElement.priority < item.priority)
            if (preIndex > -1) {
                this.items.splice(preIndex, 0, queueElement)
            } else {
                this.items.push(queueElement)
            }
        }
    }

    dequeue() {
        return this.items.shift()
    }

    front() {
        return this.items[0]
    }

    clear() {
        this.items = []
    }

    get size() {
        return this.items.length
    }

    get isEmpty() {
        return !this.items.length
    }

    print() {
        log(this.items)
    }
}

var log = console.log.bind(console)
const priorityQueue = new PriorityQueue()
priorityQueue.enqueue('John', 2)
priorityQueue.enqueue('Jack', 1)
priorityQueue.enqueue('Camila', 1)
priorityQueue.enqueue('Surmon', 3)
priorityQueue.enqueue('skyRover', 2)
priorityQueue.enqueue('sasa', 1)
priorityQueue.print()
log(priorityQueue.isEmpty, priorityQueue.size) // false 6


// -------- 循环队列 --------
class LoopQueue extends Queue {
    constructor(items) {
        super(items)
    }

    getIndex(index) {
        const length = this.items.length
        return index > length ? (index % length) : index
    }

    find(index) {
        return !this.isEmpty ? this.items[this.getIndex(index)] : null
    }
}

var log = console.log.bind(console)
const loopQueue = new LoopQueue(['Surmon'])
loopQueue.enqueue('SkyRover')
loopQueue.enqueue('Even')
loopQueue.enqueue('Alice')
log(loopQueue.size, loopQueue.isEmpty) // 4 false
log(loopQueue.find(26)) // 'Evan'
log(loopQueue.find(87651)) // 'Alice'
