// -------- 散列表(HashTable，也叫 HashMap) --------
// 散列算法的作用是尽可能快地在数据结构中找到一个值。

// 要在数据结构中获得一个值（使用 get 方法），需要迭代整个数据结构来找到它。
// 如果使用散列函数，就知道值的具体位置，因此能够快速检索到该值。散列函数的作用是给定一个键值，然后返回值在表中的地址。

// 散列表有一些在计算机科学中应用的例子。因为它是字典的一种实现，所以可以用作关联数组。它也可以用来对数据库进行索引。
// 当我们在关系型数据库（如 MySQL、SQL Server等）中创建一个新的表时，一个不错的做法是同时创建一个索引来更快地查询到记录的 key。在这种情况下，散列表可以用来保存键和对表中记录的引用。
// 另一个很常见的应用是使用散列表来表示对象。JavaScript 语言内部就是使用散列表来表示每个对象。此时，对象的每个属性和方法（成员）被存储为 key 对象类型，每个 key 指向对应的对象成员。


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

class ValuePair {
    constructor(key, value) {
        this.key = key
        this.value = value
    }
    toString() {
        return `[#${this.key}: ${this.value}]`
    }
}

class HashTable {
    constructor(toStrFn=defaultToString) {
        this.toStrFn = toStrFn
        this.table = {}
    }
    // 使用最常见的散列函数 —— lose lose 散列函数，方法是简单地将每个键值中的每个字母的 ASCII 值相加。
    loseloseHashCode(key) {
        if (typeof key === 'number') {
            return key;
        }
        const tableKey = this.toStrFn(key)
        let hash = 0
        for (let i = 0; i < tableKey.length; i++) {
            hash += tableKey.charCodeAt(i)
        }
        // 为了得到比较小的数值，使用 hash 值和一个任意数做除法的余数（%），规避操作数超过数值变量最大表示范围的风险。
        return hash % 37
    }
    // hashCode 调用 loseloseHashCode 方法，将 key 作为参数传入。
    hashCode(key) {
        return this.loseloseHashCode(key)
    }
    // 向散列表增加一个新的项（也能更新散列表）。
    put(key, value) {
        if (key != null && value != null) {
            const hashCode = this.hashCode(key)
            this.table[hashCode] = new ValuePair(key, value)
            return true
        }
        return false
    }
    // 返回根据键值检索到的特定的值。
    get(key) {
        const valuePair = this.table[this.hashCode(key)]
        return valuePair == null ? undefined : valuePair.value
    }
    // 根据键值从散列表中移除值。
    remove(key) {
        const hashCode = this.hashCode(key)
        const valuePair = this.table[hashCode]
        if (valuePair != null) {
            delete this.table[hashCode]
            return true
        }
        return false
    }
}


// -------- test --------
var log = console.log.bind(console)
const hash = new HashTable()
hash.put('AAA', 'AAA@qq.com')
hash.put('BBB', 'BBB@163.com')
hash.put('CCC', 'CCC@gmail.com')
console.log(hash.hashCode('AAA') + '- AAA') // 10
console.log(hash.hashCode('BBB') + '- BBB') // 13
console.log(hash.hashCode('CCC') + '- CCC') // 16
console.log(hash.get('AAA'))                // AAA@qq.com
console.log(hash.get('BBB'))                // BBB@163.com
console.log(hash.get('CCC'))                // CCC@gmail.com
hash.remove('BBB')
console.log(hash.get('AAA'))                // AAA@qq.com
console.log(hash.get('BBB'))                // undefined
console.log(hash.get('CCC'))                // CCC@gmail.com
