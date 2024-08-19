// -------- 基数排序 --------

/*
基数排序是一个分布式排序算法，根据数字的有效位或基数（这也是它为什么叫基数排序）将整数分布到桶中。基数是基于数组中值的记数制的。
比如，对于十进制数，使用的基数是 10。会使用 10 个桶用来分布元素并且首先基于个位数字进行排序，然后基于十位数字，然后基于百位数字，以此类推。
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


// 基数排序
function radixSort(array, radixBase = 10) {
    if (array.length < 2) {
        return array
    }

    let minValue = array[0]
    let maxValue = array[0]
    for (let i = 1; i < array.length; i++) {
        if (array[i] < minValue) {
            minValue = array[i]
        } else if (array[i] > maxValue) {
            maxValue = array[i]
        }
    }

    // 从最后一位开始排序所有的数。这个算法也可以被修改成支持排序字母字符。
    let significantDigit = 1
    // 首先只会基于最后一位有效位对数字进行排序，在下次迭代时，会基于第二个有效位进行排序（十位数字），然后是第三个有效位（百位数字），以此类推。
    while ((maxValue - minValue) / significantDigit >= 1) {
        array = countingSortForRadix(array, radixBase, significantDigit, minValue)
        significantDigit *= radixBase
    }
    return array
}

// 基于有效位（基数）排序的代码。
function countingSortForRadix(array, radixBase, significantDigit, minValue) {
    let bucketsIndex
    const buckets = []
    const aux = []
    // 基于基数初始化桶。排序的是十进制数，需要 10 个桶。
    for (let i = 0; i < radixBase; i++) {
        buckets[i] = 0
    }
    // 基于数组中（行{6}）数的有效位（行{7}）进行计数排序（行{8}）。
    for (let i = 0; i < array.length; i++) {
        bucketsIndex = Math.floor(((array[i] - minValue) / significantDigit) % radixBase)
        buckets[bucketsIndex]++
    }
    // 由于是计数排序，还要计算累积结果来得到正确的计数值。
    for (let i = 1; i < radixBase; i++) {
        buckets[i] += buckets[i - 1]
    }
    // 将值移回原始数组中。
    for (let i = array.length - 1; i >= 0; i--) {
        bucketsIndex = Math.floor(((array[i] - minValue) / significantDigit) % radixBase)
        aux[--buckets[bucketsIndex]] = array[i]
    }
    for (let i = 0; i < array.length; i++) {
        array[i] = aux[i]
    }
    return array
}


// -------- test --------
let array = generateArray()
log('排序前：', array.join(', '))
array = radixSort(array)
log('排序后：', array.join(', '))
