// -------- 大数相加 --------

var log = console.log.bind(console)

const bigAdd = function (a, b) {
    a = String(a)
    b = String(b)
    const maxLen = Math.max(a.length, b.length)
    a = a.padStart(maxLen, '0')
    b = b.padStart(maxLen, '0')
    let rest = 0
    let result = new Array(maxLen)
    for (let i = maxLen - 1; i >= 0; i--) {
        const num1 = parseInt(a[i], 10)
        const num2 = parseInt(b[i], 10)
        const total = num1 + num2 + rest
        rest = Math.floor(total / 10)
        result[i] = total % 10
    }
    if (rest > 0) {
        result.unshift(rest)
    }
    return result.join('')
}

log(bigAdd(9876543210543210000, 321)) // 9876543210543210321
log(9876543210543210000 + 321) // 9876543210543210000
