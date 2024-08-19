// -------- 快速排序 --------

/*
快速排序也许是最常用的排序算法。它的复杂度为 O(nlog(n))，且性能通常比其他复杂度为 O(nlog(n))的排序算法要好。
和归并排序一样，快速排序也使用分而治之的方法，将原始数组分为较小的数组（但它没有像归并排序那样将它们分割开）。

快速排序比目前学过的其他排序算法要复杂一些。
(1) 首先，从数组中选择一个值作为主元（pivot），也就是数组中间的那个值。
(2) 创建两个指针（引用），左边一个指向数组第一个值，右边一个指向数组最后一个值。
移动左指针直到找到一个比主元大的值，接着，移动右指针直到找到一个比主元小的值，然后交换它们，重复这个过程，直到左指针超过了右指针。
这个过程将使得比主元小的值都排在主元之前，而比主元大的值都排在主元之后。这一步叫作划分（partition）操作。
(3) 接着，算法对划分后的小数组（较主元小的值组成的子数组，以及较主元大的值组成的子数组）重复之前的两个步骤，直至数组已完全排序。
*/

var log = console.log.bind(console)

/**
 * 生成一个随机数组成的数组
 * @param {number} maxValue 最大值
 * @param {number} len 个数
 * @returns [] 数组最大值不超过 maxValue, 数组长度不超过 number
 */
const generateArray = function(maxValue=100, len=5) {  
	let array = []
	for (let i = 0; i < len; ++i) {
        array.push(Math.round(maxValue * Math.random()))
    }
	return array
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

// -------- test --------
let array = generateArray()
log('排序前：', array.join(', '))
array = quickSort(array)
log('排序后：', array.join(', '))
