/*
242. 有效的字母异位词
简单-有效的字母异位词
给定两个字符串 s 和 t ，编写一个函数来判断 t 是否是 s 的字母异位词。

注意：若 s 和 t 中每个字符出现的次数都相同，则称 s 和 t 互为字母异位词。

示例 1:
输入: s = "anagram", t = "nagaram"
输出: true

示例 2:
输入: s = "rat", t = "car"
输出: false
 
提示:
1 <= s.length, t.length <= 5 * 104
s 和 t 仅包含小写字母
 
进阶: 如果输入字符串包含 unicode 字符怎么办？你能否调整你的解法来应对这种情况？
*/
var log = console.log.bind(console)

/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function(s, t) {
    let res = true
    let m1 = {}
    if (s.length === t.length) {
        for (let i = 0; i < s.length; i++) {
            const e = s[i];
            if (Object.keys(m1).includes(e)) {
                m1[e] = m1[e] + 1
            } else {
                m1[e] = 1
            }
        }
        for (let j = 0; j < t.length; j++) {
            const e = t[j];
            if (Object.keys(m1).includes(e)) {
                m1[e] = m1[e] - 1
                if (m1[e] < 0) {
                    res = false
                    break
                }
            } else {
                res = false
                break
            }
        }
    } else {
        res = false
    }
    return res
};

isAnagram("anagram", "nagaram")
isAnagram("rat", "car")


var isAnagram2 = function(s, t) {
    let res = true
    let m1 = {}
    if (s.length === t.length) {
        for (let i = 0; i < s.length; i++) {
            const e = s[i];
            const f = t[i];
            if (!(m1[e])) {
                m1[e] = 1
            } else {
                m1[e] = m1[e] + 1
            }

            if (!(m1[f])) {
                m1[f] = -1
            } else {
                m1[f] = m1[f] - 1
            }
        }
        if (!(Object.values(m1).every(e => e === 0))) {
            res = false
        }
    } else {
        res = false
    }
    log('res', res)
    return res
};

isAnagram2("an", "na")
isAnagram2("anagram", "nagaram")
isAnagram2("rat", "car")
