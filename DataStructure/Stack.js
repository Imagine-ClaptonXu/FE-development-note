// -------- 栈 --------

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

    // 末位
    get peek() {
        return this.items[this.items.length - 1]
    }

    // 是否为空栈
    get isEmpty() {
        return !this.items.length
    }

    // 尺寸
    get size() {
        return this.items.length
    }

    // 清空栈
    clear() {
        this.items = []
    }

    // 打印栈数据
    print() {
        log(this.items)
    }
}

// test
var log = console.log.bind(console)
const stack = new Stack()
log(stack.isEmpty) // true

// 添加元素
stack.push(5)
stack.push(8)

// 读取属性再添加
log(stack.peek) // 8
stack.push(11)
log(stack.size) // 3
log(stack.isEmpty) // false
stack.print()
