// -------- 循环队列 --------
// 为充分利用向量空间，克服"假溢出"现象的方法是：将向量空间想象为一个首尾相接的圆环，并称这种向量为循环向量。
// 存储在其中的队列称为循环队列。循环队列是把顺序队列首尾相连，把存储队列元素的表从逻辑上看成一个环，成为循环队列。
// 参考 leetcode 题目 622.设计循环队列: https://leetcode.cn/problems/design-circular-queue/description/ MyCircularQueue
class CircularQueue {
    constructor(k) {
        // 最大容量
        this.maxSize = k
        // front 指向队列的第一个元素，也就是说 arr[front]就是队列的第一个元素，front的初始值 = 0；
        this.front = 0
        // rear 指向队列的最后一个元素的最后一个位置。因为希望空出一个空间做为约定。rear的初始值也 = 0;
        this.rear = 0
        // 节点数量
        this.count = 0
        // 用于存放数据，模拟队列
        this.items = new Array(k)
    }
    // 判断队列是否满
    isFull() {
        return this.count === this.maxSize
    }
    // 判断队列是否为空
    isEmpty() {
        return this.count === 0
    }
    // 入队
    enqueue(element) {
        if (this.isFull()) {
            console.log("队列已满，不能加入数据")
            return false
        }
        // 直接将数据加入
        this.items[this.rear] = element
        // 将 rear 后移，这里必须考虑去模
        this.rear = (this.rear + 1) % this.maxSize
        this.count += 1
        return true
    }
    // 出队
    dequeue() {
        // 判断队列是否为空
        if (this.isEmpty()) {
            console.log("队列为空，无法获取数据")
            return false
        }
        let value = this.items[this.front]
        this.front = (this.front + 1) % this.maxSize
        this.count -= 1
        return true // 也可以 return value
    }
    // 求出当前队列有效数据的个数
    size() {
        return this.count
    }
    // 显示队列的头数据，注意：不是取数据
    Front() {
        if (this.isEmpty()) {
            console.log("队列为空，无法显示队列的头数据")
            return -1
        }
        return this.items[this.front]
    }
    // 显示队列的尾数据，注意：不是取数据
    Rear() {
        if (this.isEmpty()) {
            console.log("队列为空，无法显示队列的尾数据")
            return -1
        }
        log('rear index', (this.rear + this.maxSize - 1) % this.maxSize)
        return this.items[(this.rear + this.maxSize - 1) % this.maxSize]
    }
    // 显示队列的所有数据
    toString() {
        if (this.isEmpty()) {
            return ''
        }
        log('toString 数组中实际的数据', this.items)
        let objStr = this.items[this.front]
        for (let i = this.front + 1; i < this.maxSize; i++) {
            objStr = `${objStr},${this.items[i]}`
        }
        for (let j = this.rear-1; j < this.front; j++) {
            objStr = `${objStr},${this.items[j]}`
        }
        return objStr
    }
}
    

// -------- test --------
var log = console.log.bind(console)
let circularQueue = new CircularQueue(3) // 设置长度为 3
log('enqueue(1)=true', circularQueue.enqueue(1))  // 返回 true
log('enqueue(2)=true', circularQueue.enqueue(2))  // 返回 true
log('enqueue(3)=true', circularQueue.enqueue(3))  // 返回 true
log('enqueue(4)=false', circularQueue.enqueue(4))  // 返回 false，队列已满
log('Rear=3', circularQueue.Rear())  // 返回 3
log('isFull=true', circularQueue.isFull())  // 返回 true
log('dequeue=true', circularQueue.dequeue())  // 返回 true
log('toString=2,3', circularQueue.toString())  // 返回 2,3
log('enqueue(4)=true', circularQueue.enqueue(4))  // 返回 true
log('toString=2,3,4', circularQueue.toString())  // 返回 2,3,4
log('Rear=4', circularQueue.Rear())  // 返回 4
