// -------- 冒泡排序 --------

/*
学习排序算法时，通常都先学冒泡算法，因为它在所有排序算法中最简单。然而，从运行时间的角度来看，冒泡排序是最差的一个。

冒泡排序比较所有相邻的两个项，如果第一个比第二个大，则交换它们。元素项向上移动至正确的顺序，就好像气泡升至表面一样，冒泡排序因此得名。

复杂度是 O(n2)
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


// 冒泡排序
function bubbleSort(array, compareFn = defaultCompare) {
    const { length } = array
    for (let i = 0; i < length; i++) {
        for (let j = 0; j < length - 1; j++) {
            // 内循环将从第一位迭代至倒数第二位，内循环实际上进行当前项和下一项的比较
            if (compareFn(array[j], array[j + 1]) === Compare.BIGGER_THAN) {
                // 当前项比下一项大，则交换它们，意思是位置为 j+1 的值将会被换置到位置 j 处，反之亦然
                swap(array, j, j + 1)
            }
        }
    }
    return array
}


// 注意当算法执行外循环的第二轮的时候，索引 4 和 5 已经是正确排序的了。
// 但是在后续比较中，它们还在一直进行着比较（已经不需要了）。因此可以改进一下。
function modifiedBubbleSort(array, compareFn = defaultCompare) {
    const { length } = array
    for (let i = 0; i < length; i++) {
        for (let j = 0; j < length - 1 - i; j++) {
            if (compareFn(array[j], array[j + 1]) === Compare.BIGGER_THAN) {
                swap(array, j, j + 1)
            }
        }
    }
    return array
}


// -------- test --------
let array = generateArray()
log('排序前：', array.join(', '))
array = bubbleSort(array)
log('排序后：', array.join(', '))

let array2 = generateArray()
log('排序前：', array2.join(', '))
array2 = modifiedBubbleSort(array2)
log('排序后：', array2.join(', '))
