// -------- 用队列解决实际问题 -------
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
var log = console.log.bind(console)


// -------- 击鼓传花 --------
// 游戏规则：需要游戏参与者围成一个圈，并按固定的顺序传递给旁边的人，某一时刻传花结束，此时花在谁手里，谁就退出圆圈，结束游戏，
// 重复这个过程，直到只剩最后一个孩子即为胜利者。
const hotPotato = function (elementList, num) {
    const queue = new Queue()
    const eliminatedList = []
    for (let i = 0; i < elementList.length; i++) {
        queue.enqueue(elementList[i])
    }
    while (queue.size() > 1) {
        for (let i = 0; i < num; i++) {
            queue.enqueue(queue.dequeue())
        }
        eliminatedList.push(queue.dequeue())
    }
    return {
        eliminated: eliminatedList,
        winner: queue.dequeue()
    }
}

const names = ['AAA', 'BBB', 'CCC', 'DDD', 'EEE']
const result = hotPotato(names, 7)
for (let i = 0; i < result.eliminated.length; i++) {
    log(`${result.eliminated[i]}在击鼓传花游戏中被淘汰。`)
}
log(`胜利者：${result.winner}`)
// CCC在击鼓传花游戏中被淘汰。
// BBB在击鼓传花游戏中被淘汰。
// EEE在击鼓传花游戏中被淘汰。
// DDD在击鼓传花游戏中被淘汰。
// 胜利者：AAA


// -------- 回文检查器 --------
// 回文：是正反都能读通的单词、词组、数或一系列字符的序列，例如 madam 和 racecar。
const palindromeChecker = function(str) {
    if (str === undefined || str === null || (str !== null && str.length === 0)) {
        return false
    }
    const dequeue = new DoubleEndedQueue()
    // 转换为小写，并移除所有空格
    const lowerStr = str.toLowerCase().replace(/\s/g, '')
    let isEqual = true
    let firstChar, lastChar
    for (let i = 0; i < lowerStr.length; i++) {
        dequeue.addBack(lowerStr.charAt(i))
    }
    while (dequeue.size() > 1 && isEqual) {
        firstChar = dequeue.removeFront()
        lastChar = dequeue.removeBack()
        if (firstChar !== lastChar) {
            isEqual = false
        }
    }
    return isEqual
}

log(palindromeChecker('a'))      // true
log(palindromeChecker('aa'))     // true
log(palindromeChecker('kayak'))  // true
log(palindromeChecker('level'))  // true
log(palindromeChecker('madam'))  // true
log( palindromeChecker('ABBC'))  // false
