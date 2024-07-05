// -------- 其他的散列函数：分离链接，线性探查 --------

// -------- 处理 HashTable.js 中的冲突 --------
// 有时一些键会有相同的散列值。不同的值在散列表中对应相同位置的时候，称其为冲突。比如：
const hashlose = new HashTable()
hashlose.put('Gandalf', 'gandalf@email.com')
hashlose.put('John', 'johnsnow®email.com')

hashlose.put('Tyrion', 'tyrion@email.com')
hashlose.put('Aaron', 'aaronOemail.com')

hashlose.put('Jonathan', 'jonathan@email.com')    
hashlose.put('Jamie', 'jamie@email.com')
hashlose.put('Sue', 'sueOemail.com')

hashlose.put('Nathan', 'nathan@email.com')
// Tyrion 和 Aaron 有相同的散列值（16)，Jonathan、Jamie 和 Sue 有相同的散列值（5)
// 导致最终的数据对象中，只有最后一次被添加/修改的数据会覆盖原本数据，进而生效。
// 使用一个数据结构来保存数据的目的显然不是去丢失这些数据，而是通过某种方法将它们全部保存起来；因此，当这种情况发生的时候就要去解决它。
// 介绍两种处理冲突的方法：分离链接、线性探查。


// -------- 分离链接 --------
// 分离链接法包括为散列表的每一个位置创建一个链表并将元素存储在里面。
// 它是解决冲突的最简单的方法，但是它在 HashTable 实例之外还需要额外的存储空间。
// 链表节点
class Node {
    constructor(element) {
        this.element = element
        this.next = null
    }
}

// 链表(单向链表)
class LinkedList {
    constructor() {
        this.head = null
        this.length = 0
    }

    // 追加元素
    append(element) {
        const node = new Node(element)
        let current = null
        if (this.head === null) {
            this.head = node
        } else {
            current = this.head
            while(current.next) {
                current = current.next
            }
            current.next = node
        }
        this.length++
    }

    // 任意位置插入元素
    insert(position, element) {
        if (position >= 0 && position <= this.length) {
            const node = new Node(element)
            let current = this.head
            let previous = null
            let index = 0
            if (position === 0) {
                this.head = node
            } else {
                while (index++ < position) {
                    previous = current
                    current = current.next
                }
                node.next = current
                previous.next = node
            }
            this.length++
            return true
        }
        return false
    }

    // 获取对应位置的元素
    get(position) {
        let res = null
        if (position >= 0 && position <= this.length) {
            let index = 0
            let current = this.head
            if (position === 0) {
                res = current
            } else {
                while (index++ < position) {
                    current = current.next
                }
                res = current
            }
        }
        return res
    }

    // 寻找元素下标
    indexOf(element) {
        let current = this.head
        let index = -1
        while (current) {
            if (element === current.element) {
                return index + 1
            }
            index++
            current = current.next
        }
        return -1
    }

    // 移除指定位置元素
    removeAt(position) {
        // 检查越界值
        if (position > -1 && position < this.length) {
            let current = this.head
            let previous = null
            let index = 0
            if (position === 0) {
                this.head = current.next
            } else {
                while (index++ < position) {
                    previous = current
                    current = current.next
                }
                previous.next = current.next
            }
            this.length--
            return current.element
        }
        return null
    }

    // 删除指定元素
    remove(element) {
        const index = this.indexOf(element)
        return this.removeAt(index)
    }

    isEmpty() {
        return !this.length
    }

    size() {
        return this.length
    }

    // 转为字符串
    toString() {
        let current = this.head
        let string = ''
        while (current) {
            string += ` ${current.element}`
            current = current.next
        }
        return string
    }
}

class HashTable2 { // 分离链接
    constructor() {
        this.table = []
    }

    // 散列函数
    static loseloseHashCode(key) {
        let hash = 0
        for (let codePoint of key) {
            hash += codePoint.charCodeAt()
        }
        return hash % 37
    }

    put(key, value) {
        const position = HashTable2.loseloseHashCode(key)
        if (this.table[position] === undefined) {
            this.table[position] = new LinkedList()
        }
        this.table[position].append({ key, value })
    }
    
    get(key) {
        const position = HashTable2.loseloseHashCode(key)
        if (this.table[position] === undefined) return undefined
        const getElementValue = node => {
            if (!node && !node.element) return undefined
            if (Object.is(node.element.key, key)) {
                return node.element.value
            } else {
                return getElementValue(node.next)
            }
        }
        return getElementValue(this.table[position].head)
    }
    
    remove(key) {
        const position = HashTable2.loseloseHashCode(key)
        if (this.table[position] === undefined) return undefined
        const getElementValue = node => {
            if (!node && !node.element) return false
            if (Object.is(node.element.key, key)) {
                log('this.table[position]', this.table[position])
                this.table[position].remove(node.element)
                log('this.table[position] remove 222', this.table[position])
                if (this.table[position].isEmpty()) {
                    this.table[position] = undefined
                }
                return true
            } else {
                return getElementValue(node.next)
            }
        }
        return getElementValue(this.table[position].head)
    }    
}


// -------- test --------
var log = console.log.bind(console)
const hash2 = new HashTable2()
hash2.put('Gandalf', 'gandalf@email.com')
hash2.put('John', 'johnsnow®email.com')

hash2.put('Tyrion', 'tyrion@email.com')
hash2.put('Aaron', 'aaronOemail.com')
log('hash2', hash2)
hash2.remove('Aaron')
log('hash2', hash2)

hash2.put('Jonathan', 'jonathan@email.com')    
hash2.put('Jamie', 'jamie@email.com')
hash2.put('Sue', 'sueOemail.com')

hash2.put('Nathan', 'nathan@email.com')


// -------- 线性探查1 lose lose 散列函数 --------
// 当想向表中某个位置加入一个新元素的时候，如果索引为 index 的位置已经被占据了，就尝试 index+1 的位置。
// 如果 index+1 的位置也被占据了，就尝试 index+2 的位置，以此类推。
class HashTable3 { // 线性探查
    constructor() {
        this.table = []
    }

    // 散列函数 lose lose，方法是简单地将每个键值中的每个字母的 ASCII 值相加。
    static loseloseHashCode(key) {
        let hash = 0
        for (let codePoint of key) {
            hash += codePoint.charCodeAt()
        }
        return hash % 37
    }

    put(key, value) {
        const position = HashTable3.loseloseHashCode(key)
        // log('position', position)
        if (this.table[position] === undefined) {
            this.table[position] = { key, value }
        } else {
            let index = +position
            while (this.table[index] !== undefined) {
                index++
            }
            this.table[index] = { key, value }
        }
    }
    
    get(key) {
        const position = HashTable3.loseloseHashCode(key)
        const getElementValue = index => {
            if (this.table[index] === undefined) return undefined
            if (Object.is(this.table[index].key, key)) {
                return this.table[index].value
            } else {
                return getElementValue(index + 1)
            }
        }
        return getElementValue(position)
    }
    
    remove(key) {
        const position = HashTable3.loseloseHashCode(key)
        const removeElementValue = index => {
            if (this.table[index] === undefined) return false
            if (Object.is(this.table[index].key, key)) {
                this.table[index] = undefined
                return true
            } else {
                return removeElementValue(index + 1)
            }
        }
        return removeElementValue(position)
    }     
}


// -------- test --------
var log = console.log.bind(console)
const hash3 = new HashTable3()
hash3.put('Gandalf', 'gandalf@email.com')
hash3.put('John', 'johnsnow®email.com')

hash3.put('Tyrion', 'tyrion@email.com')
hash3.put('Aaron', 'aaronOemail.com')
log('hash3', hash3)
hash3.remove('Aaron')
log('hash3', hash3)

hash3.put('Jonathan', 'jonathan@email.com')    
hash3.put('Jamie', 'jamie@email.com')
hash3.put('Sue', 'sueOemail.com')

hash3.put('Nathan', 'nathan@email.com')
hash3.get('Jamie')


// -------- 线性探查2，djb2 散列函数 --------
// 当想向表中某个位置加入一个新元素的时候，如果索引为 index 的位置已经被占据了，就尝试 index+1 的位置。
// 如果 index+1 的位置也被占据了，就尝试 index+2 的位置，以此类推。
class HashTable4 { // 线性探查
    constructor() {
        this.table = []
    }

    // 散列函数 djb2，产生简单的随机分布的散列函数
    static djb2HashCode(key) { 
        let hash = 5381 // 取一个较大的质数
        for (let codePoint of key) {
            hash = hash * 33 + codePoint.charCodeAt()
        }
        return hash % 1013
    }

    put(key, value) {
        const position = HashTable4.djb2HashCode(key)
        if (this.table[position] === undefined) {
            this.table[position] = { key, value }
        } else {
            let index = +position
            while (this.table[index] !== undefined) {
                index++
            }
            this.table[index] = { key, value }
        }
    }
    
    get(key) {
        const position = HashTable4.djb2HashCode(key)
        const getElementValue = index => {
            if (this.table[index] === undefined) return undefined
            if (Object.is(this.table[index].key, key)) {
                return this.table[index].value
            } else {
                return getElementValue(index + 1)
            }
        }
        return getElementValue(position)
    }
    
    remove(key) {
        const position = HashTable4.djb2HashCode(key)
        const removeElementValue = index => {
            if (this.table[index] === undefined) return false
            if (Object.is(this.table[index].key, key)) {
                this.table[index] = undefined
                return true
            } else {
                return removeElementValue(index + 1)
            }
        }
        return removeElementValue(position)
    }     
}


// -------- test --------
var log = console.log.bind(console)
const hash4 = new HashTable4()
hash4.put('Gandalf', 'gandalf@email.com')
hash4.put('John', 'johnsnow®email.com')

hash4.put('Tyrion', 'tyrion@email.com')
hash4.put('Aaron', 'aaronOemail.com')
log('hash4', hash4)
hash4.remove('Aaron')
log('hash4', hash4)

hash4.put('Jonathan', 'jonathan@email.com')    
hash4.put('Jamie', 'jamie@email.com')
hash4.put('Sue', 'sueOemail.com')

hash4.put('Nathan', 'nathan@email.com')
hash4.get('Jamie')
