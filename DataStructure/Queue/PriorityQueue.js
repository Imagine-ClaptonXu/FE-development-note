// -------- 优先队列 --------
// 一种特殊的队列。在优先队列中，元素被赋予优先级，当访问队列元素时，具有最高优先级的元素最先删除。
// 优先队列的出队顺序跟入队顺序无关，优先队列是按照元素的优先级来决定出队顺序的。优先级高的元素优先出队，优先级低的元素后出队。
// 优先队列符合 「最高级先出（First in, Largest out）」 的规则。
class PriorityQueue {
    constructor() {
        this.items = []
    }

    // 入队
    enqueue(element, priority) {
        const queueElement = { element, priority }
        if (this.isEmpty()) {
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

    peek() {
        return this.items[0]
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

// -------- test --------
var log = console.log.bind(console)
const priorityQueue = new PriorityQueue()
priorityQueue.enqueue('John', 2)
priorityQueue.enqueue('Jack', 1)
priorityQueue.enqueue('Camila', 1)
priorityQueue.enqueue('Surmon', 3)
priorityQueue.enqueue('skyRover', 2)
priorityQueue.enqueue('sasa', 1)
priorityQueue.print()
log(priorityQueue.isEmpty(), priorityQueue.size()) // false 6
// [
//     {
//         "element": "Jack",
//         "priority": 1
//     },
//     {
//         "element": "Camila",
//         "priority": 1
//     },
//     {
//         "element": "sasa",
//         "priority": 1
//     },
//     {
//         "element": "John",
//         "priority": 2
//     },
//     {
//         "element": "skyRover",
//         "priority": 2
//     },
//     {
//         "element": "Surmon",
//         "priority": 3
//     }
// ]
