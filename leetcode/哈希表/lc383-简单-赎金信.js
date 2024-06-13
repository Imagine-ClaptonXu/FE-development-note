/*
383. 赎金信
简单-赎金信
给你两个字符串：ransomNote 和 magazine ，判断 ransomNote 能不能由 magazine 里面的字符构成。
如果可以，返回 true ；否则返回 false 。
magazine 中的每个字符只能在 ransomNote 中使用一次。

示例 1：
输入：ransomNote = "a", magazine = "b"
输出：false

示例 2：
输入：ransomNote = "aa", magazine = "ab"
输出：false

示例 3：
输入：ransomNote = "aa", magazine = "aab"
输出：true
 
提示：
1 <= ransomNote.length, magazine.length <= 105
ransomNote 和 magazine 由小写英文字母组成
*/

var log = console.log.bind(console)

/**
 * @param {string} ransomNote
 * @param {string} magazine
 * @return {boolean}
 */
var canConstruct = function(ransomNote, magazine) {
    let wordArr = magazine.split('')
    let wordMap = {}
    wordArr.forEach(e => {
        if (wordMap[e] === undefined) {
            wordMap[e] = 1
        } else {
            wordMap[e] += 1
        }
    })

    let res = true
    target = ransomNote.split('')
    for (let i = 0; i < target.length; i++) {
        const e = target[i];
        if (wordMap[e] && wordMap[e] > 0) {
            wordMap[e] -= 1 
        } else {
            res = false
            break
        }
    }
    log('res', res)
    return res
}

canConstruct("a", "b")
canConstruct("aa", "ab")
canConstruct("aa", "aab")

/**
 * @param {string} ransomNote
 * @param {string} magazine
 * @return {boolean}
 */
var canConstruct2 = function(ransomNote, magazine) {
    let res = true
    for (let val of ransomNote) {
        if (magazine.includes(val)) {
            // 按顺序把在 magazine 中找到的字符替换成''
            magazine = magazine.replace(val, '')
        } else {
            res = false
            return res
        }
    }
    log('res', res)
    return res
};
canConstruct2("a", "b")
canConstruct2("aa", "ab")
canConstruct2("aa", "aab")