/*
205. 同构字符串
简单-同构字符串
给定两个字符串 s 和 t ，判断它们是否是同构的。
如果 s 中的字符可以按某种映射关系替换得到 t ，那么这两个字符串是同构的。
每个出现的字符都应当映射到另一个字符，同时不改变字符的顺序。
不同字符不能映射到同一个字符上，相同字符只能映射到同一个字符上，字符可以映射到自己本身。

示例 1:
输入：s = "egg", t = "add"
输出：true

示例 2：
输入：s = "foo", t = "bar"
输出：false

示例 3：
输入：s = "paper", t = "title"
输出：true
 
提示：
1 <= s.length <= 5 * 104
t.length == s.length
s 和 t 由任意有效的 ASCII 字符组成
*/
var log = console.log.bind(console)

// 单表
var isIsomorphic = function(s, t) {
    let res = true
    // 长度不一样，就不是同构
    if (s.length !== t.length) {
        res = false
    } else {
        let len = s.length
        let map = {}
        for (let i = 0; i < len; i++) {
            // log('map', map)
            const key = s[i]
            const value = t[i]
            // 字母有映射
            if (map[key]) {
                // 不等于期望字符
                if (map[key] !== value) {
                    res = false
                    break
                }
            }
            // 字母没有映射
            else {
                // 不能多对一，b=>b, d=>b
                if ((Object.values(map).includes(value))) {
                    res = false
                    break
                }
                // 没有映射，加入映射表
                else {
                    map[key] = value
                }
                
            }
        }
    }
    log('res', res)
    return res
}

log('______________')
isIsomorphic("egg", "add") // true
isIsomorphic("foo", "bar") // false
isIsomorphic("paper", "title") // true
isIsomorphic("badc", "baba") // false


// 双表
var isIsomorphic2 = function(s, t) {
    let res = true
    if (s.length !== t.length) {
        res = false
    } else {
        let m1 = new Map()
        let m2 = new Map()
        for(let i = 0; i < s.length; i++){
            if (m1.has(s[i])) {
                if (m1.get(s[i]) !== t[i]) {
                    res = false
                    break
                }
            } else if (m2.has(t[i])) {
                if (m2.get(t[i]) !== s[i]) {
                    res = false
                    break
                }
            } else {
                m1.set(s[i], t[i])
                m2.set(t[i], s[i])
            }
        }
    }
    log('res2', res)
    return res
}
isIsomorphic2("egg", "add") // true
isIsomorphic2("foo", "bar") // false
isIsomorphic2("paper", "title") // true
isIsomorphic2("badc", "baba") // false