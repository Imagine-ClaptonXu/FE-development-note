// -------- 希尔排序 --------

/*
fix: book P239, 补充希尔排序

希尔排序（Shell Sort）是一种插入排序的改进版本，它通过比较相隔某个增量序列的不同距离的元素来工作。
最初，整个序列被分割成多个子序列，然后对这些子序列进行直接插入排序。随着算法的进行，子序列的增量逐渐减少，直到增量变为1，此时整个序列基本有序，直接插入排序可以快速完成排序。
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


// 希尔排序
function shellSort(arr) {
    // 获取数组长度
    let n = arr.length
    // 初始化增量
    let gap = Math.floor(n / 2)

    // 进行希尔排序
    while (gap > 0) {
        // 遍历数组
        for (let i = gap; i < n; i++) {
            // 假设当前元素为最小值
            let temp = arr[i]
            // 初始化索引
            let j
            // 遍历该增量的所有元素
            for (j = i - gap; j >= 0 && arr[j] > temp; j -= gap) {
                // 元素大于临时值，则交换位置
                arr[j + gap] = arr[j]
            }
            // 将临时值放到正确的位置
            arr[j + gap] = temp
        }
        // 更新增量
        gap = Math.floor(gap / 2)
    }
    // 返回排序后的数组
    return arr
}


// -------- test --------
let array = generateArray()
log('排序前：', array.join(', '))
array = shellSort(array)
log('排序后：', array.join(', '))
