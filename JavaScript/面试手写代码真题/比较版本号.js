// -------- 比较两个版本号，每个小版本号仅 1 位 --------

// 样例输⼊：
// let version1 = '0.1.1'
// let version2 = '1' 
// compareVersion(version1, version2)
// 输出：
// -1
// 提示：
// version1 < version2 输出 -1, 否则输出 1
// 0.1 相当于 0.1.0.0.0.0...

var log = console.log.bind(console)

const compareVersion = function (version1, version2, fill=9) {
    // 直接补 0
    // 默认补到 5 位版本号
    version1 = version1.padEnd(fill,'.0')
    version2 = version2.padEnd(fill,'.0')
    let v1 = version1.split('.')
    let v2 = version2.split('.')
    // log('v1, v2', v1, v2)
    let res = 1
    for (let index = 0; index < v1.length; index++) {
        const a1 = Number(v1[index])
        const a2 = Number(v2[index])
        if (a1 === a2) {
            continue
        } else if (a1 < a2) {
            res = -1
            break
        } else { // a1 > a2
            break
        }
    }
    return res
}
let version1 = '0.1.1'
let version2 = '1'
compareVersion(version1, version2)


// -------- 比较两个版本号，每个小版本号可多位 --------

// 样例输⼊：
// let version3 = '0.1.1'
// let version4 = '0.302.1.3' 
// compareVersion(version3, version4)
// 输出：
// -1
// 提示：
// version3 < version4 输出 -1, 否则输出 1
// 0.1 相当于 0.1.0.0.0.0...

const compareVersion2 = function (version1, version2, fill=5) {
    let v1 = version1.split('.')
    let v2 = version2.split('.')
    // 补数组长度，默认补到 5 位小版本号
    for (let index = v1.length; index < fill; index++) {
        v1.push('0')
    }
    for (let index = v2.length; index < fill; index++) {
        v2.push('0')
    }
    // log('v1, v2', v1, v2)
    let res = 1
    for (let index = 0; index < v1.length; index++) {
        const a1 = Number(v1[index])
        const a2 = Number(v2[index])
        if (a1 === a2) {
            continue
        } else if (a1 < a2) {
            res = -1
            break
        } else { // a1 > a2
            break
        }
    }
    return res
}
let version3 = '0.1111.1'
let version4 = '0.302.1.3'
compareVersion2(version3, version4)
let version5 = '1.15.202'
let version6 = '1.15.1111.3'
compareVersion2(version5, version6)

// -------- 一组版本号排序 --------

// 样例输⼊：
// let versions = ['0.1.1', '1', '2.3.3', '0.302.1', '4.2.1', '4.2', '4.3.5', '4.3.4.5']
// compareVersionList(versions)
// 输出：['0.1.1', '0.302.1', '1', '2.3.3', '4.2', '4.2.1', '4.3.4.5', '4.3.5']

const compareVersionList = function (arr) {
	arr.sort((a, b) => {
        return compareVersion2(a, b)
	})
	log('输出：', arr)
	return arr
}
let versions = ['0.1.1', '1', '2.3.3', '0.302.1', '4.2.1', '4.2', '4.3.5', '4.3.4.5']
compareVersionList(versions)
