// -------- 字典 --------
// 在字典中，存储的是[键，值]对，其中键名是用来查询特定元素的。字典也称作映射、符号表或关联数组。在计算机科学中，字典经常用来保存对象的引用地址。

/* 常见的操作(方法)
 *  set(key,value): 向字典中添加新元素。如果 key 已经存在，那么已存在的 value 会被新的值覆盖。
 *  remove(key): 通过使用键值作为参数来从字典中移除键值对应的数据值。
 *  hasKey(key): 如果某个键值存在于该字典中，返回 true，否则返回 false。
 *  get(key): 通过以键值作为参数查找特定的数值并返回。
 *  clear(): 删除该字典中的所有值。
 *  size(): 返回字典所包含值的数量。与数组的 length 属性类似。
 *  isEmpty(): 在 size 等于零的时候返回 true，否则返回 false。
 *  keys(): 将字典所包含的所有键名以数组形式返回。
 *  values(): 将字典所包含的所有数值以数组形式返回。
 *  keyValues(): 将字典中所有[键，值]对返回。
 *  forEach(callbackFn): 迭代字典中所有的键值对。callbackFn 有两个参数: key 和 value。可以在回调函数返回 false 时被中止（和 Array 的 every 方法相似）
*/

// 在字典中，理想的情况是用字符串作为键名，值可以是任何类型（从数、字符串等原始类型，到复杂的对象）。
// 但是，由于 JavaScript 不是强类型的语言，不能保证键一定是字符串。需要把所有作为键名传入的对象转化为字符串，
// 使得从 Dictionary 类中搜索和获取值更简单（同样的逻辑也可以应用在 Set 类上）。
// 要实现此功能，我们需要一个将 key 转化为字符串的函数。默认使用 defaultToString 函数。
function defaultToString(item) {
    if (item === null) {
        return 'NULL'
    } else if (item === undefined) {
        return 'UNDEFINED'
    } else if (typeof item === 'string' || item instanceof String) {
        return `${item}`
    } else if (Object.prototype.toString.call(item) === '[object Object]') {
        // 如果 item 变量是一个对象的话，它需要实现 toString 方法，否则会导致出现异常的输出结果，如[object Object]。这对用户是不友好的。
        // 暂时用 JSON.stringify 顶顶
        return JSON.stringify(item)
    }
    return item.toString()
}

// 为了在字典中保存 value，将 key 转化为字符串，而为了保存信息，同样要保存原始的 key。因此不能只将 value 保存在字典中，
// 而是要保存两个值：原始的 key 和 value。为了字典能更简单地通过 toString 方法输出结果，同样为 ValuePair类创建 toString 方法。
class ValuePair {
    constructor(key, value) {
        this.key = key
        this.value = value
    }
    toString() {
        return `[#${this.key}: ${this.value}]`
    }
}

class Dictionary {
    constructor(toStrFn=defaultToString) {
        this.toStrFn = toStrFn
        this.table = {}
    }
    // 检测一个键是否存在于字典中
    hasKey (key) {
        let value = this.table[this.toStrFn(key)]
        return value !== null && value !== undefined
    }
    // 向字典中添加新元素。
    set(key, value) {
        if (key != null && value != null) {
            const tableKey = this.toStrFn(key)
            this.table[tableKey] = new ValuePair(key, value)
            return true
        }
        return false
    }
    // 从字典中移除一个值
    remove(key) {
        if (this.hasKey(key)) {
            delete this.table[this.toStrFn(key)]
            return true
        }
        return false
    }
    // 从字典中检索一个值
    get(key) {
        const valuePair = this.table[this.toStrFn(key)]
        return valuePair == null ? undefined : valuePair.value
    }
    // 将字典中所有[键，值]对返回。
    keyValues() {
        // 方法一，Object.values
        // return Object.values(this.table)

        // 方法二，for in
        const valuePairs = []
        for (const k in this.table) {
            if (this.hasKey(k)) {
                valuePairs.push(this.table[k]) 
            }
        }
        return valuePairs
    }
    // 将字典所包含的所有键名以数组形式返回。
    keys() {
        // 方法一，map
        // return this.keyValues().map(valuePair => valuePair.key)

        // 方法二，for 循环
        const keys = []
        const valuePairs = this.keyValues()
        for (let i = 0; i < valuePairs.length; i++) {
            keys.push(valuePairs[i].key)
        }
        return keys
    }
    // 将字典所包含的所有数值以数组形式返回。
    values() {
        return this.keyValues().map(valuePair => valuePair.value)
    }
    // 迭代字典中所有的键值对。
    forEach(callbackFn) {
        const valuePairs = this.keyValues()
        for (let i = 0; i < valuePairs.length; i++) {
            const result = callbackFn(valuePairs[i].key, valuePairs[i].value)
            if (result === false) {
                break
            }
        }
    }
    size() {
        return this.keyValues().length
    }
    isEmpty() {
        return this.size() === 0
    }
    clear() {
        this.table = {}
    }
    toString() {
        if (this.isEmpty()) {
            return ''
        }
        const valuePairs = this.keyValues()
        let objStr = valuePairs[0].toString()
        for (let index = 1; index < valuePairs.length; index++) {
            objStr = `${objStr}, ${valuePairs[index].toString()}`
        }
        return objStr
    }
}


// -------- test --------
var log = console.log.bind(console)
const dic = new Dictionary()
dic.set('AAA', 'AAA@qq.com')
dic.set('BBB', 'BBB@163.com')
dic.set('CCC', 'CCC@gmail.com')
log(dic.hasKey('AAA'))  // true
log(dic.size())         // 3
log(dic.get('AAA'))     // AAA@qq.com
log(dic.keys())         // ['AAA', 'BBB', 'CCC']
log(dic.values())       // ['AAA@qq.com', 'BBB@163.com', 'CCC@gmail.com']
log(dic.keyValues())    // [{key: 'AAA', value: 'AAA@qq.com'}， {key: 'BBB', value: 'BBB@qq.com'}， {key: 'CCC', value: 'CCC@qq.com'}]
dic.remove('BBB')
log(dic.keys())         // ['AAA', 'CCC']
log(dic.values())       // ['AAA@qq.com',  'CCC@gmail.com']
log(dic.keyValues())    // [{key: 'AAA', value: 'AAA@qq.com'}， {key: 'CCC', value: 'CCC@qq.com'}]
dic.forEach((key, value) => {
    log('forEach: ', `key: ${key}, value: ${value}`)
    // forEach: key: AAA, value: AAA@qq.com
    // forEach: key: CCC, value: CCC@gmail.com
})
