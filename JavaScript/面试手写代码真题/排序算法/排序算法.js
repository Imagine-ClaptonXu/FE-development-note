// -------- 常见的排序算法 --------


var log = console.log.bind(console)

/**
 * 生成一个随机数组成的数组
 * @param {number} maxValue 最大值
 * @param {number} len 个数
 * @returns [] 数组最大值不超过 maxValue, 数组长度不超过 number
 */
const generateArray = function(maxValue, len) {  
	let array = []
	for (let i = 0; i < len; ++i) {
        array.push(Math.round(maxValue * Math.random()))
    }
	return array
}

// 冒泡排序
const bubbleSort = function (arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                let tmp = arr[j]
                arr[j] = arr[j + 1]
                arr[j + 1] = tmp
            }
        }
    }
    return arr
}

// 选择排序
const selectionSort = function (arr) {
    let len = arr.length
    let minIndex = null
    let tmp = null
    for (let i = 0; i < len; i++) {
        minIndex = i
        for (let j = i + 1; j < len; j++) {
            if (arr[j] < arr[minIndex]) { // 寻找最小的数
                minIndex = j // 将最小数的索引保存
            }
        }
        tmp = arr[i]
        arr[i] = arr[minIndex]
        arr[minIndex] = tmp
    }
    return arr
}

// 插入排序
const insertSort = function (arr) {
    if (arr.length <= 1) {
        return arr
    }
    for (let i = 1; i < arr.length; i++) {
        let preIndex = i
        let tmp = arr[i]
        // log('tmp', tmp)
        // log('arr[preIndex - 1]', arr[preIndex - 1])
        while (preIndex > 0 && tmp < arr[preIndex - 1]) {
            arr[preIndex] = arr[preIndex - 1]
            preIndex--
            // log('inner arr', arr)
        }
        arr[preIndex] = tmp
        // log('arr', arr)
    }
    return arr
}

// 希尔排序
const shellSort = function (arr) {
    if (arr.length <= 1) {
        return arr
    }
    let step = Math.floor(arr.length / 2)
    for (step; step > 0; step = Math.floor(step / 2)) {
        // 内层循环与插入排序的写法基本一致，只是每次移动的步长变为 step，比较 step 而不是相邻的
        for (let i = step; i < arr.length; i++) {
            let preIndex = i - step
            let tmp = arr[i]
            // log('tmp', tmp)
            // log('arr[preIndex]', arr[preIndex])
            while (preIndex >= 0 && tmp < arr[preIndex]) {
                arr[preIndex + step] = arr[preIndex]
                preIndex -= step
                // log('inner arr', arr)
            }
            arr[preIndex + step] = tmp
            // log('arr', arr)
        }
    }
    return arr
}

// 快速排序(递归)
const quickSort = function (arr) {
    if (arr.length <= 1) {
        return arr
    }
    
    const midIndex = Math.floor(arr.length / 2)
    const mid = arr.splice(midIndex, 1)[0]
    const left = []
    const right = []
    
    for (const num of arr) {
        if (num < mid) {
            left.push(num)
        } else {
            right.push(num)
        }
    }
    
    return [...quickSort(left), mid, ...quickSort(right)]
}

// 快速排序(堆栈)
const stackQuickSort = function(arr) {
    // 初始化栈
    let stack = [0, arr.length - 1]

	while (stack.length > 0) {
        // log('stack', stack)
		let endIndex = stack.pop()
        let startIndex = stack.pop()
		if (startIndex >= endIndex) {
            continue
        }

        let midIndex = Math.floor((startIndex + endIndex) / 2)
        let tmp = arr[midIndex]
        arr[midIndex] = arr[endIndex]
        arr[endIndex] = tmp
        // log('交换 1 arr', arr)

		let preIndex = startIndex - 1
		for (let i = startIndex; i <= endIndex; i++) {
			if (arr[i] <= arr[endIndex]) {
                preIndex = preIndex + 1
                let tmp = arr[i]
                arr[i] = arr[preIndex]
                arr[preIndex] = tmp
                // log('交换 2 arr', arr)
            }
		}
		stack.push(startIndex, preIndex - 1, preIndex + 1, endIndex)
        // log('stack 222', stack)
	}
    // log('arr', arr)
    return arr
}

// 归并排序
const mergeSort = function (arr) {
    const merge = function(right, left) {
        let res = []
        // log('merge right', right)
        // log('merge left', left)
        while (right.length > 0 && left.length > 0) {
            if (right[0] < left[0]) {
                res.push(right.shift())
            } else {
                res.push(left.shift())
            }
            // log('res1', res)
        }
        while (right.length > 0) {
            res.push(right.shift())
        }   
        while (left.length > 0) {
            res.push(left.shift())
        }
        // log('res2', res)
        return res
    }

    if (arr.length <= 1) {
        return arr
    }
    let mid = Math.floor(arr.length / 2)
    let right = arr.slice(0, mid)
    let left = arr.slice(mid)
    // log('out right', right)
    // log('out left', left)
    return merge(mergeSort(right), mergeSort(left))
}

// 计数排序
const countingSort = function (arr, maxValue=99999999) {
    let bucket = new Array(maxValue + 1)
    for (let i = 0; i < arr.length; i++) {
        if (!bucket[arr[i]]) {
            bucket[arr[i]] = 0
        }
        bucket[arr[i]]++
    }
    let index = 0;
    // log('bucket', bucket)
    for (let j = 0; j < bucket.length; j++) {
        while (bucket[j] > 0) {
            // log('bucket[j]', j, bucket[j])
            // log('index', index)
            arr[index] = j
            index = index + 1
            // 处理有重复的元素(数字)，继续往后排
            bucket[j]--
            // log('bucket[j]', bucket[j])
        }
    }
    return arr
}

// 桶排序
const bucketSort = function (arr, bucketSize='') {
    if (arr.length < 2) {
        return arr
    }
    
    // 找到 arr 中的最大值和最小值
    let maxValue = Math.max(...arr)
    let minValue = Math.min(...arr)
    // let maxValue = arr[0]
    // let minValue = arr[0]
    // for (let i = 1; i < arr.length; i++) {
    //     if (arr[i] < minValue) {
    //         minValue = arr[i]
    //     } else if (arr[i] > maxValue) {
    //         maxValue = arr[i]
    //     }
    // }
    // log('最大', maxValue)
    // log('最小', minValue)

    // 每个桶最多不超过多少个元素(数字)
    let BUCKET_SIZE = 5
    bucketSize = bucketSize || BUCKET_SIZE

    // 一个有多少个桶
    let bucketLen = Math.floor((maxValue - minValue) / bucketSize) + 1
    // log('bucketLen', bucketLen)
    let bucketList = new Array(bucketLen)
    // 初始化每个桶
    for (let i = 0; i < bucketList.length; i++) {
        bucketList[i] = []
    }
    // 把元素(数字)放到对应索引的桶中
    for (let i = 0; i < arr.length; i++) {
        let current = arr[i]
        let bucketIndex = Math.floor((current - minValue) / bucketSize)
        // log('index', bucketIndex)
        // log('value', current)
        bucketList[bucketIndex].push(current)
        // log('___', bucketList)
    }
    // log('bucketList', bucketList)

    // 对每个桶排序后再合并起来
    arr.length = 0
    for (let i = 0; i < bucketLen; i++) {
        insertSort(bucketList[i])
        for (let j = 0; j < bucketList[i].length; j++) {
            arr.push(bucketList[i][j])
        }
    }

    return arr
}

// 基数排序
const radixSort = function(arr) {
    // 获得每位的数字
    const getDigit = function (x, d) {
        let a = [1, 10, 100, 1000, 10000, 100000, 1000000, 10000000, 100000000, 1000000000, 10000000000, 100000000000]
        return (Math.floor(x / a[d]) % 10)
    }

    // 找到 arr 中的最大值和最小值
    let maxValue = Math.max(...arr)

    // 基数, 以 10 进制来进行排序
    const radix = 10
    let i = 0
    let j = 0
    let count = new Array(radix) // 0~9 的桶
    let len = arr.length
    let bucket = new Array(len)
    // 利用 LSD, 也就是次位优先
    for (let d = 0; d < maxValue; d++) {
        for (i = 0; i < radix; i++) {
            count[i] = 0
        }
        // 向各个桶中添加元素，并统计出每个桶中装的个数
        for (i = 0; i < len; i++) {
            // log('arr[i], d', arr[i], d)
            j = getDigit(arr[i], d)
            // log('j', j)
            count[j]++
        }
        // count 的越往后值最大,最大值为 arr.length
        // count 数组的值为, 该位数值为该索引的数字总数
        for (i = 1; i < radix; i++) {
            count[i] = count[i] + count[i - 1]
        }
        // 按照桶的顺序将导入temp中
        for (i = len - 1; i >= 0; i--) {
            j = getDigit(arr[i], d)
            bucket[count[j] - 1] = arr[i]
            count[j]--
        }
        // 将已经根据相应位数排好的序列导回 arr 中
        for (i = 0; i < len; i++) {
            arr[i] = bucket[i]
        }
    }
    // log('count', count)
    // log('bucket', bucket)
    return arr
}

// 堆排序
const heapSort = function(arr) {
    // 每个结点的值都大于或等于其左右子结点的值，称为大顶堆
    // 或者每个结点的值都小于或等于其左右子结点的值，称为小顶堆
    // 这里使用大顶堆

    // 长度为 7 的随机数组
    // [50, 80, 100, 14, 70, 90, 3]

    // 转换成大顶堆
    //          100             
    //     50         80        
    //  3    14    70    90   

    // 每个节点在新数组中对应的索引
    //           0
    //     1           2
    //  3    4      5    6  

    // 大顶堆对应的新数组
    // [100, 50, 80, 3, 14, 70, 90]

    const buildMaxHeap = function(arr) {
        for (let i = Math.floor(arr.length / 2); i >= 0; i--) {
            setHeap(arr, i, arr.length)
        }
    }
    const setHeap = function(arr, i, len) {
        let left = 2 * i + 1
        let right = 2 * i + 2
        let max = i
        if (left < len && arr[left] > arr[max]) {
            max = left
        }
        if (right < len && arr[right] > arr[max]) {
            max = right
        }
        if (max != i) {
            [arr[i], arr[max]] = [arr[max], arr[i]]
            setHeap(arr, max, len)
        }
    }

    buildMaxHeap(arr)
    // log('buildMaxHeap', arr)
    // 交换
    for (let j = arr.length - 1; j > 0; j--) {
        [arr[0], arr[j]] = [arr[j], arr[0]]
        // log('arr, 0, j', arr, 0, j)
        setHeap(arr, 0, j)
    }
    // log('res', arr)
    return arr
}

// 对齐格式化字符串长度
const alignLog = (str='###', n=15, sign='-') => {
    return str.padEnd(n, sign)
}

const __main = function () {
    let maxNumber = 100
    let count = 7
    let data = generateArray(maxNumber, count)
    log(alignLog('data'), data.join(', '))
    log(alignLog('start', 30, '_'))

    let a1 = bubbleSort(JSON.parse(JSON.stringify(data)))
    log(alignLog('bubbleSort'), a1.join(', '))

    let a2 = selectionSort(JSON.parse(JSON.stringify(data)))
    log(alignLog('selectionSort'), a2.join(', '))

    let a3 = insertSort(JSON.parse(JSON.stringify(data)))
    log(alignLog('insertSort'), a3.join(', '))

    let a4 = shellSort(JSON.parse(JSON.stringify(data)))
    log(alignLog('shellSort'), a4.join(', '))

    let a5 = quickSort(JSON.parse(JSON.stringify(data)))
    log(alignLog('quickSort'), a5.join(', '))

    let a6 = stackQuickSort(JSON.parse(JSON.stringify(data)))
    log(alignLog('stackQuickSort'), a6.join(', '))

    let a7 = mergeSort(JSON.parse(JSON.stringify(data)))
    log(alignLog('mergeSort'), a7.join(', '))

    let a8 = countingSort(JSON.parse(JSON.stringify(data)), maxNumber)
    log(alignLog('countingSort'), a8.join(', '))

    let a9 = bucketSort(JSON.parse(JSON.stringify(data)))
    log(alignLog('bucketSort'), a9.join(', '))

    let a10 = radixSort(JSON.parse(JSON.stringify(data)))
    log(alignLog('radixSort'), a10.join(', '))

    let a11 = heapSort(JSON.parse(JSON.stringify(data)))
    log(alignLog('heapSort'), a11.join(', '))
}

__main()
