// -------- 最大堆 --------
// MaxHeap 类的算法和 MinHeap 类的算法一模一样。不同之处在于要把所有 >（大于）的比较换成 <（小于）的比较。

function defaultCompare (a, b) {
    if (a === b) {
        return 0
    }
    return a < b ? -1 : 1
}
const swap = (array, a, b) => [array[a], array[b]] = [array[b], array[a]]
const Compare = {
    LESS_THAN: -1,
    BIGGER_THAN: 1,
}
class MinHeap {
    constructor(compareFn=defaultCompare) {
        this.compareFn = compareFn
        this.heap = [] // 使用数组实现
    }
    // 【访问节点】
    // 访问左侧子节点
    getLeftIndex(index) {
        return 2 * index + 1
    }
    // 访问右侧子节点
    getRightIndex(index) {
        return 2 * index + 2
    }
    // 访问父节点
    getParentIndex(index) {
        if (index === 0) {
            return undefined
        }
        return Math.floor((index - 1) / 2)
    }
    // 【向堆中插入新值】
    // 向堆中插入值是指将值插入堆的底部叶节点（数组的最后一个位置）再执行 siftUp 方法（上移操作），将这个值和它的父节点进行交换，直到父节点小于这个插入的值。
    // 这个上移操作也被称为 up head、percolate up、bubble up、heapify up 或 cascade up。
    insert(value) {
        if (value !== null) {
            this.heap.push(value) 
            this.siftUp(this.heap.length - 1)
            return true
        }
        return false
    }
    // 【上移操作】
    // 接收插入值的位置作为参数。
    siftUp(index) {
        // 需要获取其父节点的位置
        let parent = this.getParentIndex(index)
        // 如果插入的值小于它的父节点（在最小堆中，或在最大堆中比父节点大），那么将这个元素和父节点交换
        let compare = this.compareFn(this.heap[parent], this.heap[index]) > Compare.LESS_THAN // fix: book P204
        // 重复这个过程直到堆的根节点也经过了交换节点和父节点位置的操作
        while (index > 0 && compare) {
            // log('in while parent', parent)
            // 该元素和父节点交换
            swap(this.heap, parent, index)
            index = parent
            parent = this.getParentIndex(index)
        }
    }
    size() {
        return this.heap.length
    }
    isEmpty() {
        return this.size() === 0
    }
    // 【找最小值】
    // 在最小堆中，最小值总是位于数组的第一个位置（堆的根节点）。
    findMinimum() {
        return this.isEmpty() ? undefined : this.heap[0]
    }
    // 【移除最小值（最小堆）】
    // 表示移除数组中的第一个元素（堆的根节点）。
    // 在移除后，将堆的最后一个元素移动至根部并执行 siftDown 函数，表示将交换元素直到堆的结构正常。
    // 这个下移操作也被称为 sink down、percolate down、bubble down、heapify down 或 cascade down。
    extract() {
        // 如果堆为空，也就是没有值可以导出，那么可以返回 undefined。
        if (this.isEmpty()) {
            return undefined
        }
        // 如果堆中只有一个值，可以直接移除并返回它。
        if (this.size() === 1) {
            return this.heap.shift()
        }
        // 但如果堆中有不止一个值，需要将第一个值移除，存储到一个临时变量中以便在执行完下移操作后返回它。
        const removedValue = this.heap.shift()
        this.siftDown(0)
        return removedValue
    }
    // 【下移操作（堆化）】
    // 下移操作（堆化） siftDown 方法接收移除元素的位置作为参数。
    siftDown(index) {
        // 将 index 复制到 element 变量中。
        let element = index
        // 同样要获取左子节点和右子节点的值。
        const left = this.getLeftIndex(index)
        const right = this.getRightIndex(index)
        const size = this.size()
        // 下移操作表示将元素和最小子节点（最小堆）进行交换。
        // 如果元素小于它的左子节点（且 index 合法），就交换元素和它的左子节点。
        let compareLeft = this.compareFn(this.heap[element], this.heap[left]) > Compare.LESS_THAN // fix: book P207
        if (left < size && compareLeft) {
            // log('in left')
            element = left
        }
        // 如果元素小于它的右子节点（且 index 合法），就交换元素和它的右子节点。
        let compareRight = this.compareFn(this.heap[element], this.heap[right]) > Compare.LESS_THAN // fix: book P207
        if (right < size && compareRight) {
            // log('in right')
            element = right
        }
        // 在找到最小子节点的位置后，要检验它的值是否和 element 相同（传入 siftDown 方法），因为和自己交换是没有意义的！
        // 如果不同，就将它和最小的 element 交换，并且重复这个过程直到 element 被放在正确的位置上。
        if (index !== element) {
            // 将它和最小的 element 交换
            swap(this.heap, index, element)
            this.siftDown(element)
        }
    }
}


// 将比较反转，不将 a 和 b 进行比较，而是将 b 和 a 进行比较
function reverseCompare(compareFn) {
    return (a, b) => compareFn(b, a)
}

// 最大堆
class MaxHeap extends MinHeap {
    constructor(compareFn=defaultCompare) {
        super(compareFn)
        this.compareFn = reverseCompare(compareFn)
    }
}


// -------- test --------
// 用测试最小堆的代码来测试最大堆。不同点是最大的值会是堆的根节点，而不是最小的值。
var log = console.log.bind(console)
const maxHeap = new MaxHeap()
maxHeap.insert(2)
maxHeap.insert(3)
maxHeap.insert(4)
maxHeap.insert(5)
maxHeap.insert(1)
log('Heap size: ', maxHeap.size())             // 5
log('Heap min value: ', maxHeap.findMinimum()) // 5
log('Heap size: ', maxHeap.size())             // 5
log('Heap is empty: ', maxHeap.isEmpty())      // false
log('Heap min value: ', maxHeap.findMinimum()) // 5
log('Extract maximum: ', maxHeap.extract())    // 5
log('Extract maximum: ', maxHeap.extract())    // 4
log('Extract maximum: ', maxHeap.extract())    // 3
