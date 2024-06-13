// -------- 集合 --------

class Set {
    constructor() {
        this.items = {}
    }

    has(value) {
        return this.items.hasOwnProperty(value)
    }

    add(value) {
        if (!this.has(value)) {
            this.items[value] = value
            return true
        }     
        return false
    }

    remove(value) {
        if (this.has(value)) {
            delete this.items[value]
            return true
        }
        return false
    }

    get size() {
        return Object.keys(this.items).length
    }

    get values() {
        return Object.keys(this.items)
    }

    // 并集
    union(otherSet) {
        const unionSet = new Set()
        this.values.forEach((v, i) => unionSet.add(this.values[i]))
        otherSet.values.forEach((v, i) => unionSet.add(otherSet.values[i]))
        return unionSet
    }
    
    // 交集
    intersection(otherSet) {
        const intersectionSet = new Set()
        this.values.forEach((v, i) => {
            if (otherSet.has(v)) {
                intersectionSet.add(v)
            }
        })
        return intersectionSet
    }
    
    // 差集
    // a.difference(b)
    // 元素存在于 a 中，但是不存在于 b 中
    difference(otherSet) {
        const differenceSet = new Set()
        this.values.forEach((v, i) => {
            if (!otherSet.has(v)) {
                differenceSet.add(v)
            }
        })
        return differenceSet
    }
    
    // 子集
    // a.subset(b)
    // a 是 b 的子集，或者说 b 包含 a
    subset(otherSet) {
        if (this.size > otherSet.size) {
            return false
        } else {
            return !this.values.some(v => !otherSet.has(v))
        } 
    }
}

// test
var log = console.log.bind(console)
const set = new Set()
set.add(1)
log(set.values)  // ["1"] 
log(set.has(1))  // true 
log('再加入1', set.add(1))
log(set.size) // 1 
set.add(2) 
log(set.values)  // ["1", "2"] 
log(set.has(2))  // true 
log(set.size) // 2 
log(set.values)  // ["1", "2"] 
set.remove(1) 
log(set.values) // ["2"] 
set.remove(2) 
log(set.values) // []
set.add(1)
set.add(2)
set.add(3)
set.add(12)
const set2 = new Set()
set2.add(12)
set2.add(22)
set2.add(32)
set2.add(2)
log('set', set) // 1, 2, 3, 12
log('set2', set2) // 2, 12, 22, 32
log('union', set.union(set2)) // 1, 2, 3, 12, 22, 32
log('union', set2.union(set)) // 1, 2, 3, 12, 22, 32
log('intersection', set.intersection(set2)) // 2, 12
log('intersection', set2.intersection(set)) // 2, 12
log('difference', set.difference(set2)) // 1, 3
log('difference', set2.difference(set)) // 22, 32
log('subset', set.subset(set2)) // false
log('subset', set2.subset(set)) // false
const set3 = new Set()
set3.add(1)
set3.add(12)
log('subset', set3.subset(set)) // true
