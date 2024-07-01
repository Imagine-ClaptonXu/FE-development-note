// -------- 用栈解决实际问题 --------
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


// -------- 十进制转二进制 --------
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
