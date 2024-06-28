// -------- 解析 URL Params 为对象 --------
function parserUrlParams(url) {
    let paramsStr = url
    // 有问号取问号后面的，没有问号则认为已经是 search 了
    if (paramsStr.includes('?')) {
        paramsStr = /.+\?(.+)$/.exec(url)[1] // 将 ? 后面的字符串取出来
    }
    // console.log("将 ? 后面的字符串取出来", paramsStr)

    // 看有没有 #，去掉 # 和 hash
    if (paramsStr.includes('#')) {
        let p1 = paramsStr.split('#')[0]
        let p2 = paramsStr.split('#')[1]
        if (p1.slice(0, 1) === '/') {
            paramsStr = p2
        }
        if (p2.slice(0, 1) === '/') {
            paramsStr = p1
        }
    }
    // console.log("去掉 # 和 hash", paramsStr)
    
    const paramsArr = paramsStr.split('&') // 将字符串以 & 分割后存到数组中
    // console.log('paramsArr', paramsArr)
    let paramsObj = {}
    // 将 params 存到对象中
    paramsArr.forEach(param => {
        // 处理有 key=value，(有 value 的参数)
        if (/=/.test(param)) {
            let [key, value] = param.split('=') // 分割 key 和 value
            value = decodeURIComponent(value) // 解码
            // 不转为数字，否则 000001 会被转成 1
            // value = /^\d+$/.test(value) ? parseFloat(value) : value // 判断是否转为数字
            if (paramsObj.hasOwnProperty(key)) { // 如果对象有 key，则添加一个值
                paramsObj[key] = [].concat(paramsObj[key], value)
            } else { // 如果对象没有这个 key，创建 key 并设置值
                paramsObj[key] = value
            }
        } else { // 处理没有 value 的参数
            paramsObj[param] = true
        }
    })
    // console.info('URL Params', paramsObj)
    return paramsObj
}

// 测试1，有 key 无 value, 有重复的 key, 有 key= 无 value
/* 期望结果
{
    "user": "anonymous",
    "id": ["123", "456"],
    "woi": "",
    "city": "北京",
    "enabled": true,
    "k": ""
}
*/
let url1 = 'http://www.domain.com/?user=anonymous&id=123&woi=&id=456&city=%E5%8C%97%E4%BA%AC&enabled&k=';
let parserUrlParams1 = parserUrlParams(url1)
console.log('test1', parserUrlParams1)

// 测试2，带 hash，hash 位置在前和在后的情况
/* 期望结果
{
    "code": ["000000", "111111"],
    "rand": "30251",
    "Version": "2022072531",
    "pid": "8880",
    "token": "kMB1/3SwCfB2N5Lco7+xlnUs42j3a+RVreL+IwutXTJk=",
    "bata": "0001",
    "fCode": "000309"
}
*/
let url2 = 'http://www.domain.com/?code=000000&rand=30251&code=111111&Version=2022072531&pid=8880&token=kMB1%2f3SwCfB2N5Lco7%2bxlnUs42j3a%2bRVreL%2bIwutXTJk%3d&bata=0001&fCode=000309#/home'
let parserUrlParams2 = parserUrlParams(url2)
console.log('test2', parserUrlParams2)

let url3 = 'http://www.domain.com/#/home?code=000000&rand=30251&code=111111&Version=2022072531&pid=8880&token=kMB1%2f3SwCfB2N5Lco7%2bxlnUs42j3a%2bRVreL%2bIwutXTJk%3d&bata=0001&fCode=000309'
let parserUrlParams3 = parserUrlParams(url3)
console.log('test3', parserUrlParams3)
