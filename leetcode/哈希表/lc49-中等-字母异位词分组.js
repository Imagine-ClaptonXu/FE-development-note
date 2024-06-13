/*
49. 字母异位词分组
中等-字母异位词分组
给你一个字符串数组，请你将 字母异位词 组合在一起。可以按任意顺序返回结果列表。

字母异位词 是由重新排列源单词的所有字母得到的一个新单词。
 
示例 1:
输入: strs = ["eat", "tea", "tan", "ate", "nat", "bat"]
输出: [["bat"],["nat","tan"],["ate","eat","tea"]]

示例 2:
输入: strs = [""]
输出: [[""]]

示例 3:
输入: strs = ["a"]
输出: [["a"]]
 
提示：
1 <= strs.length <= 104
0 <= strs[i].length <= 100
strs[i] 仅包含小写字母
*/
var log = console.log.bind(console)

/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function(strs) {
    if (strs.length === 0) {
        return strs
    }
    let a1 = []
    // 重新把每个字符串按字母顺序排序
    strs.map(e => {
        let w = e.split('')
        w = w.sort()
        a1.push(w.join(''))
    })
    let m = {}
    // a1 = [ 'aet', 'aet', 'ant', 'aet', 'ant', 'abt' ]
    a1.forEach((e, i) => {
        if (m[e] === undefined) {
            m[e] = [strs[i]]
        } else {
            m[e].push(strs[i])
        }
    })
    // log('m', m)
    // log('a1', a1)
    let r = Object.values(m)
    return r
};

log(groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]))
log(groupAnagrams([""]))
log(groupAnagrams(["a"]))
