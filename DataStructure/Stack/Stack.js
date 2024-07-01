// -------- 栈 --------
// 是一种遵从后进先出(LIFO)原则的有序集合，新添加或待删除的元素都保存在栈的同一端，称之为栈顶，另一端叫栈底。在栈里，新元素都靠近栈顶，旧元素都接近栈底。
// push(): 在栈顶添加一个或者多个元素。
// pop(): 移除栈顶的第一个元素，同时返回被移除的元素。
// peek(): 返回栈顶的元素。
// isEmpty(): 判断栈是否为空，是则返回 true, 否则返回 false
// size(): 返回栈中元素的个数
// clear(): 移除栈中的所有元素

class Stack {
    constructor() {
        this.items = []
    }

    // 入栈
    push(element) {
        this.items.push(element)
    }

    // 出栈
    pop() {
        return this.items.pop()
    }

    // 返回栈顶（末位）
    peek() {
        return this.items[this.size() - 1]
    }

    // 判断栈是否为空
    isEmpty() {
        return this.size() === 0
    }

    // 元素个数
    size() {
        return this.items.length
    }

    // 清空栈
    clear() {
        this.items = []
    }

    // 打印栈数据
    print() {
        console.log(this.items)
    }
}


// -------- test --------
var log = console.log.bind(console)
const stack = new Stack()
log(stack.isEmpty()) // true

// 添加元素
stack.push(5)
stack.push(8)

// 读取属性再添加
log(stack.peek()) // 8
stack.push(11)
log(stack.size()) // 3
log(stack.isEmpty()) // false
stack.print()
