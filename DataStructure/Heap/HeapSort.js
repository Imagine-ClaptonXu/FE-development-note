// -------- 堆排序算法 --------
/*
可以使用二叉堆数据结构来创建一个非常著名的排序算法：堆排序算法。它包含下面三个步骤。
(1) 用数组创建一个最大堆用作源数据。
(2) 在创建最大堆后，最大的值会被存储在堆的第一个位置。要将它替换为堆的最后一个值，将堆的大小减 1。
(3) 最后，将堆的根节点下移并重复步骤 2 直到堆的大小为 1。
用最大堆得到一个升序排列的数组（从最小到最大）。如果想要这个数组按降序排列，可以用最小堆代替。
*/

function defaultCompare (a, b) {
    if (a === b) {
        return 0
    }
    return a < b ? -1 : 1
}

const Compare = {
    LESS_THAN: -1,
    BIGGER_THAN: 1,
}

const swap = (array, a, b) => [array[a], array[b]] = [array[b], array[a]]

// 堆排序算法
function heapSort(array, compareFn=defaultCompare) {
    let heapSize = array.length
    buildMaxHeap(array, compareFn) // 步骤 1 
    while (heapSize > 1) {
        swap(array, 0, --heapSize) // 步骤 2 
        heapify(array, 0, heapSize, compareFn) // 步骤 3 
    }
    return array
}

// 要构建最大堆，可以使用下面的函数。
function buildMaxHeap(array, compareFn) { 
    for (let i = Math.floor(array.length / 2); i >= 0; i -= 1) { 
        heapify(array, i, array.length, compareFn)
    } 
    return array 
}

/*
最大堆函数会重新组织数组的顺序。
归功于要进行的所有比较，只需要对后半部分数组执行 heapify（下移）函数（前半部分会被自动排好序，所以不需要对已经知道排好序的部分执行函数）。
heapify 函数和在 最小堆中创建的 siftDown 方法有相同的代码。
不同之处是将堆本身、堆的大小和要使用的比较函数传入作为参数。
因为不直接使用堆数据结构，而是使用它的逻辑来开发 heapSort 算法。
*/
// 【下移函数】
function heapify(array, index, size, compareFn) { // fix: book P210
    function getLeftIndex(index) {
        return 2 * index + 1
    }
    function getRightIndex(index) {
        return 2 * index + 2
    }

    // 将 index 复制到 element 变量中。
    let element = index
    // 同样要获取左子节点和右子节点的值。
    const left = getLeftIndex(index)
    const right = getRightIndex(index)
    // 下移操作表示将元素和最小子节点（最小堆）进行交换。
    // 如果元素小于它的左子节点（且 index 合法），就交换元素和它的左子节点。
    let compareLeft = compareFn(array[element], array[left]) > Compare.LESS_THAN
    if (left < size && compareLeft) {
        // log('in left')
        element = left
    }
    // 如果元素小于它的右子节点（且 index 合法），就交换元素和它的右子节点。
    let compareRight = compareFn(array[element], array[right]) > Compare.LESS_THAN
    if (right < size && compareRight) {
        // log('in right')
        element = right
    }
    // 在找到最小子节点的位置后，要检验它的值是否和 element 相同（传入 siftDown 方法），因为和自己交换是没有意义的！
    // 如果不同，就将它和最小的 element 交换，并且重复这个过程直到 element 被放在正确的位置上。
    if (index !== element) {
        // 将它和最小的 element 交换
        swap(array, index, element)
        heapify(array, element, size, compareFn)
    }
}


// -------- test --------
var log = console.log.bind(console)
const array = [6, 7, 3, 5, 4, 1, 2]
log('Before heapSort: ', array)           // [6, 7, 3, 5, 4, 1, 2]
log('After  heapSort: ', heapSort(array)) // [7, 6, 5, 4, 3, 2, 1]
