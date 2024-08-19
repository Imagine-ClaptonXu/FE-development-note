// -------- 归并排序 --------

/*
归并排序是第一个可以实际使用的排序算法。
归并排序性能不错，其复杂度为 O(nlog(n))。

JavaScript 的 Array 类定义了一个 sort 函数（Array.prototype.sort）用以排序 JavaScript 数组（不必自己实现这个算法）。
ECMAScript 没有定义用哪个排序算法，所以浏览器厂商可以自行去实现算法。
例如，Mozilla Firefox 使用归并排序作为 Array.prototype.sort 的实现，而 Chrome（V8 引擎）使用了一个快速排序的变体。

归并排序是一种分而治之算法。
其思想是将原始数组切分成较小的数组，直到每个小数组只有一个位置，接着将小数组归并成较大的数组，直到最后只有一个排序完毕的大数组。
由于是分治法，归并排序也是递归的。要将算法分为两个函数：第一个负责将一个大数组分为多个小数组并调用用来排序的辅助函数。
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


// 归并排序
function mergeSort(array, compareFn = defaultCompare) {
    // 停止条件，在这里此条件是判断数组的长度是否为 1。如果是，则直接返回这个长度为 1 的数组，因为它已排序了。
    if (array.length > 1) {
        const { length } = array
        // 如果数组长度比 1 大，那么将其分成小数组。首先得找到数组的中间位，找到后将数组分成两个小数组，分别叫作 left 和 right。
        const middle = Math.floor(length / 2)
        const left = mergeSort(array.slice(0, middle), compareFn)
        const right = mergeSort(array.slice(middle, length), compareFn)
        // merge 函数负责合并和排序小数组来产生大数组，直到回到原始数组并已排序完成。
        array = merge(left, right, compareFn)
    }
    return array
}

// merge 函数接收两个数组作为参数，并将它们归并至一个大数组。排序发生在归并过程中。
function merge(left, right, compareFn) {
    log('left, right', left, right)
    // 首先需要声明归并过程要创建的新数组以及用来迭代两个数组（left 和 right 数组）所需的两个变量。
    let i = 0
    let j = 0
    const result = []
    // 迭代两个数组的过程中，我们比较来自 left 数组的项是否比来自 right 数组的项小。
    while (i < left.length && j < right.length) {
        // 如果是，将该项从 left 数组添加至归并结果数组，并递增用于迭代数组的控制变量，否则，从 right 数组添加项并递增用于迭代数组的控制变量。
        result.push(
            compareFn(left[i], right[j]) === Compare.LESS_THAN ? left[i++] : right[j++]
        )
    }
    // 接下来，将 left 数组所有剩余的项添加到归并数组中，right 数组也是一样。最后，将归并数组作为结果返回。
    return result.concat(i < left.length ? left.slice(i) : right.slice(j))
}

// -------- test --------
let array = generateArray()
log('排序前：', array.join(', '))
array = mergeSort(array)
log('排序后：', array.join(', '))
