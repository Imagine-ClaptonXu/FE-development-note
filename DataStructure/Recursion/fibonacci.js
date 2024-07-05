// -------- 斐波那契 fibonacci --------

// 斐波那契数列是另一个可以用递归解决的问题。
// 它是一个由 0、1、1、2、3、5、8、13、21 等数组成的序列。数 2 由 1 + 1 得到，数 3 由 1 + 2 得到，数 5 由 2 + 3 得到，以此类推。

// 位置 0 的斐波那契数是零。
// 1 和 2 的斐波那契数是 1。
// n（此处 n > 2）的斐波那契数是（n - 1）的斐波那契数加上（n - 2）的斐波那契数。

// 1. 循环
function fibonacciIterative(n) {
    if (n < 1) return 0
    if (n <= 2) return 1
    let fibNMinus2 = 0
    let fibNMinus1 = 1
    let fibN = n
    for (let i = 2; i <= n; i++) { // n >= 2 
        fibN = fibNMinus1 + fibNMinus2 // f(n-1) + f(n-2) 
        fibNMinus2 = fibNMinus1
        fibNMinus1 = fibN
    }
    return fibN
}
fibonacciIterative(6) // 8

// 2. 递归
function fibonacci(n) {
    if (n < 1) return 0
    if (n <= 2) return 1
    return fibonacci(n - 1) + fibonacci(n - 2)
}
fibonacci(6) // 8

// 3. 记忆化
// 记忆化是一种保存前一个结果的值的优化技术，类似于缓存。
// 在计算 fibonacci(5) 时的调用，会发现 fibonacci(3) 被计算了两次，因此可以将它的结果存储下来，这样当需要再次计算它的时候，我们就已经有它的结果了。
function fibonacciMemoization(n) {
    const memo = [0, 1]
    const fibonacci = (n) => {
        if (memo[n] != null) {
            return memo[n]
        }
        return memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo)
    }
    return fibonacci(n)
}
fibonacciMemoization(6) // 8
