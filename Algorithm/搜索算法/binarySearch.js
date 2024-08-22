// -------- 二分搜索 --------

/*
二分搜索算法的原理和猜数字游戏类似。
就是那个有人说“我正想着一个 1～100 的数”的游戏。每回应一个数，那个人就会说这个数是高了、低了还是对了。
这个算法要求被搜索的数据结构已排序。以下是该算法遵循的步骤。
(1) 选择数组的中间值。
(2) 如果选中值是待搜索值，那么算法执行完毕（值找到了）。
(3) 如果待搜索值比选中值要小，则返回步骤 1 并在选中值左边的子数组中寻找（较小）。
(4) 如果待搜索值比选中值要大，则返回步骤 1 并在选种值右边的子数组中寻找（较大）。
*/

var log = console.log.bind(console)

const DOES_NOT_EXIST = -1

// 二分搜索
function binarySearch(array, value, compareFn = defaultCompare) {
    const sortedArray = quickSort(array)
    log('sortedArray', sortedArray)
    let low = 0
    
    let high = sortedArray.length // fix: book P259, 去掉 -1 否则无法搜索到数组最后一个元素
    // 当 low 比 high 小时，计算得到中间项索引并取得中间项的值
    while (lesserOrEquals(low, high, compareFn)) { // fix: book P259, while 循环条件后面缺了一个括回 )
        const mid = Math.floor((low + high) / 2)
        log('mid', mid)
        const element = sortedArray[mid]
        // 比较选中项的值和搜索值，如果小了，则选择数组低半边并重新开始。
        // 如果选中项的值比搜索值大了，则选择数组高半边并重新开始。
        // 若两者都是不是，则意味着选中项的值和搜索值相等，因此直接返回该索引。
        if (compareFn(element, value) === Compare.LESS_THAN) {
            low = mid + 1
        } else if (compareFn(element, value) === Compare.BIGGER_THAN) {
            high = mid - 1
        } else {
            return mid
        }
    }
    // 如果 low比 high 大，则意味着该待搜索值不存在并返回 -1。
    return DOES_NOT_EXIST
}

function lesserOrEquals(a, b, compareFn) {
    const comp = compareFn(a, b)
    return comp === Compare.LESS_THAN || comp === Compare.EQUALS
}

const Compare = {
    LESS_THAN: -1,
    BIGGER_THAN: 1,
}

// 用来比较元素
const defaultCompare = function (a, b) {
    if (a === b) {
        return 0
    }
    return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN
}

// 交换函数
function swap(array, a, b) {
    [array[a], array[b]] = [array[b], array[a]]
}


// 快速排序
// 声明一个主方法来调用递归函数，传递待排序数组，以及索引 0 及其最末的位置（因为要排整个数组，而不是一个子数组）作为参数。
function quickSort(array, compareFn = defaultCompare) {
    return quick(array, 0, array.length - 1, compareFn)
}

// 快速排序过程
function quick(array, left, right, compareFn) {
    // 首先声明 index，该变量能将子数组分离为较小值数组和较大值数组。
    let index
    // 如果数组的长度比 1 大（只有一个元素的数组必然是已排序的），将对给定子数组执行 partition 操作（第一次调用是针对整个数组）以得到 index。
    if (array.length > 1) {
        // 这样就能再次递归地调用 quick 函数了。partition 函数返回值将赋值给 index。
        index = partition(array, left, right, compareFn)
        // 如果子数组存在较小值的元素，则对该数组重复这个过程。
        if (left < index - 1) {
            quick(array, left, index - 1, compareFn)
        }
        // 同理，存在较大值的子数组也是如此，如果有子数组存在较大值，也重复快速排序过程。
        if (index < right) { 
            quick(array, index, right, compareFn)
        }
    }
    return array
}

// 划分过程
// 第一件要做的事情是选择主元，有好几种方式。最简单的一种是选择数组的第一个值（最左边的值）。
// 然而，研究表明对于几乎已排序的数组，这不是一个好的选择，它将导致该算法的最差表现。另外一种方式是随机选择数组的一个值或是选择中间的值
function partition(array, left, right, compareFn) {
    // 选择中间值作为主元
    const pivot = array[Math.floor((right + left) / 2)]
    // 初始化两个指针：left（低），初始化为数组第一个元素；right（高），初始化为数组最后一个元素。
    let i = left
    let j = right
    // 只要 left 和 right 指针没有相互交错，就执行划分操作。
    while (i <= j) {
        // 首先，移动 left 指针直到找到一个比主元大的元素。
        while (compareFn(array[i], pivot) === Compare.LESS_THAN) {
            i++;
        }
        // 同样移动 right 指针，直到找到一个比主元小的元素。
        while (compareFn(array[j], pivot) === Compare.BIGGER_THAN) {
            j--;
        }
        // 当左项比右项大（值比较），即左指针指向的元素比主元大，且右指针指向的元素比主元小，并且此时左指针索引没有右指针索引大时
        if (i <= j) {
            // 交换它们，然后移动两个指针，并重复此过程。
            swap(array, i, j)
            i++
            j--
        }
    }
    // 在划分操作结束后，返回左指针的索引，用来在 quick 函数中处创建子数组。
    return i
}

// test
let r = binarySearch([1,2,3,4,5,16], 16)
log('r', r)
