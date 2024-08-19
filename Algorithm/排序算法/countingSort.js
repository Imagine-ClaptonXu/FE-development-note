// -------- 计数排序 --------

/*
计数排序是分布式排序。
分布式排序使用已组织好的辅助数据结构（桶），然后进行合并，得到排好序的数组。
计数排序使用一个用来存储每个元素在原始数组中出现次数的临时数组。在所有元素都计数完成后，临时数组已排好序并可迭代以构建排序后的结果数组。
它是用来排序整数的优秀算法（它是一个整数排序算法），时间复杂度为 O(n+k)，其中 k 是临时计数数组的大小；但是，它确实需要更多的内存来存放临时数组。
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


// 计数排序
function countingSort(array) {
    if (array.length < 2) {
        return array
    }

    // 对于计数排序算法，需要创建计数数组，从索引 0 开始直到最大值索引 value + 1。因此需要找到数组中的最大值。
    const maxValue = findMaxValue(array)
    const counts = new Array(maxValue + 1); // {3} 
    // 迭代数组中的每个位置并在 counts 数组中增加元素计数值，用 0 初始化
    array.forEach(element => {
        if (!counts[element]) {
            counts[element] = 0
        }
        // 第一次出现 0+1=1，第二次出现就是1+1=2，以此类推
        counts[element]++
    })

    // 迭代 counts 数组并构建排序后的结果数组。
    let sortedIndex = 0
    counts.forEach((count, i) => {
        while (count > 0) {
            array[sortedIndex++] = i
            count--
        }
    })
    return array
}

// 要找到数组中的最大值。
function findMaxValue(array) {
    let max = array[0]
    for (let i = 1; i < array.length; i++) {
        if (array[i] > max) {
            max = array[i]
        }
    }
    return max
}


// -------- test --------
let array = generateArray()
log('排序前：', array.join(', '))
array = countingSort(array)
log('排序后：', array.join(', '))
