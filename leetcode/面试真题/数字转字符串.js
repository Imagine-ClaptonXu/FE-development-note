// -------- 每三位数字增加逗号 --------

// 样例输⼊：
// let number = 1234567890
// addComma(number)
// 样例输出：
// 1,234,567,890

var log = console.log.bind(console)

const addComma = function (number) {
    let res = []
    let arr = String(number).split('').reverse()
    for (let index = 0; index < arr.length; index++) {
        const e = arr[index]
        if (index > 0 && index % 3 === 0) {
            res.push(',')
        }
        res.push(e)
    }
    // log('输出：', res)
    let r = res.reverse().join('')
    // log('输出2：', r)
    return r
}
let number = 1234567890
addComma(number)
