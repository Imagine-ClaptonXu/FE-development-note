// -------- 阶乘 --------

// 计算一个数的阶乘
// 5 的阶乘表示为 5!，和 5 × 4 × 3 × 2 × 1 相等，结果是 120。

// 1. 循环
function factorial(number) {
    if (number < 0) {
        return undefined
    }
    let total = 1
    for (let n = number; n > 1; n--) {
        total = total * n
    }
    return total
}
console.log(factorial(5)) // 120

// 2. 递归
function factorial(n) {
    if (n === 1 || n === 0) { // 基线条件
        return 1
    }
    return n * factorial(n - 1) // 递归调用
}
console.log(factorial(5)) // 120
