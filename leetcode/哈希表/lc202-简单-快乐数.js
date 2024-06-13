/*
202. 快乐数
简单-快乐数

编写一个算法来判断一个数 n 是不是快乐数。

「快乐数」 定义为：

对于一个正整数，每一次将该数替换为它每个位置上的数字的平方和。
然后重复这个过程直到这个数变为 1，也可能是 无限循环 但始终变不到 1。
如果这个过程 结果为 1，那么这个数就是快乐数。
如果 n 是 快乐数 就返回 true ；不是，则返回 false 。


示例 1：
输入：n = 19
输出：true
解释：
1*1 + 9*9 = 82
8*8 + 2*2 = 68
6*6 + 8*8 = 100
1*1 + 0*0 + 0*0 = 1

示例 2：
输入：n = 2
输出：false
解释：
2*2 = 4
4*4 = 16
1*1 + 6*6 = 37
3*3 + 7*7 = 58
...
找规律 会重复循环
4, 16, 37, 58, 89, 145, 42, 20， 4


提示：
1 <= n <= 2^31 - 1
*/
var log = console.log.bind(console)

var checkIsHappy = function (list, n) {
    let arr = String(n).split('')
    let sum = 0
    arr.forEach(e => {
        e = Number(e)
        sum = sum + Math.pow(Number(e), 2)
    })
    sum = Number(sum)
    if (list.includes(sum)) {
        return false
    }
    if (sum === 1) {
        log('===1')
        return true
    }
    list.push(sum)
    // log('list', list)
    // log('递归')
    return checkIsHappy(list, sum)
}

var isHappy = function(n) {
    let list = [n]
    if (n === 1) {
        return true
    } else if (n > 1 && n <= (Math.pow(2, 31) - 1)) {
        return checkIsHappy(list, n)
    } else {
        return false
    }
}

let a1 = isHappy(19)
log('aaaaaaa1', a1)
let a2 = isHappy(2)
log('aaaaaaa2', a2)