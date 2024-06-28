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


// -------- 用栈解决实际问题 --------
// 1. 十进制转二进制
// 技巧：要把十进制转换成二进制，我们可以将该十进制除以2并对商取整，直到结果为0。
// 例子：
// 十进制10，转二进制
// step1: 10 / 2 => 商5，余数0
// step2: 5 / 2  => 商2，余数1
// step3: 2 / 2  => 商1, 余数0
// step4: 1 / 2  => 商0，余数1
// result：使用栈结构(先进后出)，结果为：1010
const decimal2Binary = function (decNumber) {
    const stack = new Stack()
    let number = decNumber
    let rem
    let binaryString = ''
    while (number > 0) {
        rem = Math.floor(number % 2) // 获取余数
        number = Math.floor(number / 2) // 获取商
        stack.push(rem)
    }
    while (!stack.isEmpty()) {
        let item = stack.pop()
        let str = item.toString()
        binaryString += str
    }
    return binaryString
}
log(decimal2Binary(233))    // 11101001
log(decimal2Binary(10))     // 1010
log(decimal2Binary(1000))   // 1111101000


// -------- 通用进制转换算法 --------
// 二进制   0b
// 八进制   0o
// 十进制   0d
// 十六进制 0x
function baseConverter(decNumber, base) {
    if (base < 2 || base > 36) {
        return ''
    }
    const stack = new Stack()
    const digits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let number = decNumber
    let rem
    let baseString = ''
    while (number > 0) {
        rem = Math.floor(number % base)
        number = Math.floor(number / base)
        stack.push(rem)
    }
    while (!stack.isEmpty()) {
        baseString += digits[stack.pop()]
    }
    return baseString
}
log(baseConverter(100, 2)) // 1100100
log(baseConverter(100, 8)) // 144
log(baseConverter(100, 16)) // 64
log(baseConverter(100, 32)) // 34
