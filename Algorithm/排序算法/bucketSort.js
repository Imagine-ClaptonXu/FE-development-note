// -------- 桶排序 --------

/*
桶排序（也被称为箱排序）也是分布式排序算法。
它将元素分为不同的桶（较小的数组），再使用简单的排序算法，例如插入排序（用来排序小数组的不错的算法），来对每个桶进行排序。然后将所有的桶合并为结果数组。
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


// 桶排序
// 需要指定需要多少桶来排序各个元素。默认情况下使用 5 个桶。
// 桶排序在所有元素平分到各个桶中时的表现最好。如果元素非常稀疏，则使用更多的桶会更好。
function bucketSort(array, bucketSize = 5) {
    if (array.length < 2) {
        return array
    }
    const buckets = createBuckets(array, bucketSize)
    return sortBuckets(buckets)
}

// 创建桶并将元素分布到不同的桶中
function createBuckets(array, bucketSize) {
    // 第一步，计算每个桶中需要分布的元素个数 bucketCount。
    // 要使用一个公式，包含计算数组最大值和最小值的差值并与桶的大小进行除法计算。
    let minValue = array[0]
    let maxValue = array[0]
    for (let i = 1; i < array.length; i++) {
        if (array[i] < minValue) {
            minValue = array[i]
        } else if (array[i] > maxValue) {
            maxValue = array[i]
        }
    }
    const bucketCount = Math.floor((maxValue - minValue) / bucketSize) + 1
    // 初始化每个桶，buckets 中的每个位置包含了另一个数组（多维数组）。
    const buckets = []
    for (let i = 0; i < bucketCount; i++) {
        buckets[i] = []
    }
    // 将元素放入正确的桶中。
    for (let i = 0; i < array.length; i++) {
        const bucketIndex = Math.floor((array[i] - minValue) / bucketSize)
        buckets[bucketIndex].push(array[i])
    }
    return buckets
}

// 对每个桶执行插入排序算法并将所有桶合并为排序后的结果数组
function sortBuckets(buckets) {
    const sortedArray = []
    for (let i = 0; i < buckets.length; i++) {
        if (buckets[i] != null) {
            insertionSort(buckets[i])
            sortedArray.push(...buckets[i])
        }
    }
    return sortedArray
}

// 插入排序
function insertionSort(array, compareFn = defaultCompare) {
    const { length } = array
    let temp
    for (let i = 1; i < length; i++) {
        let j = i
        temp = array[i]
        while (j > 0 && compareFn(array[j - 1], temp) === Compare.BIGGER_THAN) {
            array[j] = array[j - 1]
            j--
        }
        array[j] = temp
    }
    return array
}


// -------- test --------
let array = generateArray()
log('排序前：', array.join(', '))
array = bucketSort(array)
log('排序后：', array.join(', '))
