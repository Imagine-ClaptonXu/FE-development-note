// -------- 选择排序 --------

/*
选择排序算法是一种原址比较排序算法。
选择排序大致的思路是找到数据结构中的最小值并将其放置在第一位，接着找到第二小的值并将其放在第二位，以此类推。
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


// 选择排序
function selectionSort(array, compareFn = defaultCompare) {
    const { length } = array
    let indexMin
    for (let i = 0; i < length - 1; i++) {
        // 假设迭代的第一个值为数组的最小值
        indexMin = i
        for (let j = i; j < length; j++) {
            // 比较是否位置 j 的值比当前最小值小
            if (compareFn(array[indexMin], array[j]) === Compare.BIGGER_THAN) {
                // 如果是，更新最小值 indexMin 为 j
                indexMin = j
            }
        }
        // 最后，如果该最小值和原最小值不同，则交换其值。
        if (i !== indexMin) {
            swap(array, i, indexMin)
        }
    }
    return array
}


// -------- test --------
let array = generateArray()
log('排序前：', array.join(', '))
array = selectionSort(array)
log('排序后：', array.join(', '))
