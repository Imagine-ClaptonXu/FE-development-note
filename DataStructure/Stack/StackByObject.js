// -------- 基于对象的栈 --------
// 创建一个Stack类最简单的方式就是使用一个数组来存储其元素，但在处理大量数据的时候，我们需要评估如何操作数据是最高效的，在使用数组的时候，大部分方法的时间复杂度为O(n)，另外数组是元素的一个有序集合，为了保证元素排列有序，它会占用更多的内存空间。
// push(): 在栈顶添加一个或者多个元素。
// pop(): 移除栈顶的第一个元素，同时返回被移除的元素。
// peek(): 返回栈顶的元素。
// isEmpty(): 判断栈是否为空，是则返回 true, 否则返回 false
// clear(): 移除栈中的所有元素。
// size(): 返回栈中元素的个数。
// toString(): 将栈结构转换为字符串。

class Stack {
    constructor() {
        this.count = 0
        this.items = {}
    }
    push(element) {
        this.items[this.count] = element
        this.count++
    }
    size() {
        return this.count
    }
    isEmpty() {
        return this.count === 0
    }
    pop() {
        if (this.isEmpty()) {
            return undefined
        }
        this.count -= 1
        const result = this.items[this.count]
        delete this.items[this.count]
        return result
    }
    peek() {
        return this.items[this.count - 1]
    }
    clear() {
        this.count = 0
        this.items = {}
    }
    toString() {
        if (this.isEmpty()) {
            return ''
        }
        let result = this.items['0']
        for (let i = 1; i < this.count; i++) {
            result = `${result},${this.items[i]}`
        }
        return result
    }
}

var log = console.log.bind(console)


// -------- test --------
const test1 = function() {
    let stack = new Stack()
    log(stack.isEmpty())  // true
    stack.push(1)
    stack.push(3)
    stack.push(5)
    log(stack.size())     // 3
    log(stack.peek())     // 5
    log(stack.pop())      // 5
    log(stack.toString()) // 1,3
    stack.clear()
    log(stack.size())     // 0
    log(stack.isEmpty())  // true
}
test1()
