/*
290. 单词规律
简单-单词规律
给定一种规律 pattern 和一个字符串 s ，判断 s 是否遵循相同的规律。
这里的 遵循 指完全匹配，例如， pattern 里的每个字母和字符串 s 中的每个非空单词之间存在着双向连接的对应规律。

示例1:
输入: pattern = "abba", s = "dog cat cat dog"
输出: true

示例 2:
输入:pattern = "abba", s = "dog cat cat fish"
输出: false

示例 3:
输入: pattern = "aaaa", s = "dog cat cat dog"
输出: false

示例 4:
输入: pattern = "abba", s = "dog dog dog dog"
输出: false
*/
var log = console.log.bind(console)

/**
 * @param {string} pattern
 * @param {string} s
 * @return {boolean}
 */
var wordPattern = function(pattern, s) {
    let res = true
    let l1 = pattern.length
    let l2 = s.split(' ').length
    // 长度不同就不是
    if (l1 === l2) {
        let a1 = pattern.split('')
        let a2 = s.split(' ')
        let o = {}
        for (let i = 0; i < l1; i++) {
            const e = a1[i];
            if (Object.keys(o).includes(e)) {
                if (o[e] !== a2[i]) {
                    res = false
                    break
                }
            } else {
                if (Object.values(o).includes(a2[i])) {
                    res = false
                    break
                } else {
                    o[e] = a2[i]
                }
            }
        }
    } else {
        res = false
    }
    log('res', res)
    return res
};

wordPattern("abba", "dog cat cat dog")
wordPattern("abba", "dog cat cat fish")
wordPattern("aaaa", "dog cat cat dog")
wordPattern("abba", "dog dog dog dog")
