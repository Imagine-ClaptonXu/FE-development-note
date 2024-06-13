/*
1. 两数之和
简单-两数之和

提示
给定一个整数数组 nums 和一个整数目标值 target，
请你在该数组中找出 和为目标值 target  的那 两个 整数，并返回它们的数组下标。

你可以假设每种输入只会对应一个答案。但是，数组中同一个元素在答案里不能重复出现。

你可以按任意顺序返回答案。

 
示例 1：
输入：nums = [2,7,11,15], target = 9
输出：[0,1]
解释：因为 nums[0] + nums[1] == 9 ，返回 [0, 1] 。

示例 2：
输入：nums = [3,2,4], target = 6
输出：[1,2]

示例 3：
输入：nums = [3,3], target = 6
输出：[0,1]

*/

var log = console.log.bind(console)

const sum2 = function(nums, target) {
    let res = []
    for (let index = 0; index < nums.length; index++) {
        const e = nums[index]
        let arr2 = nums.slice(index)
        for (let i2 = 0; i2 < arr2.length; i2++) {
            const e2 = arr2[i2];
            if (e + e2 === target) {
                res = [index, i2 + index]
                break
            }
        }
    }
    log('res', res)
}

// sum2([2,7,11,15], 9)
// sum2([3,2,4], 6)
// sum2([3,3], 6)
// sum2([2,7,11,15,5,9], 20)

var twoSum = function(nums, target) {
    let map = {} // map对象，储存的键值对为  {数组nums的值： 值对应的下标}
    let dif // 差值，计算target与数组各数的差值
    for (let i = 0; i < nums.length; i++) {
        dif = target - nums[i]
        // 如果 map[dif] 已经存在，说明差值一样，就找到了
        // 例：
        // 6-2=4
        // map[4] 不存在
        // map 中存 2: index
        // 6-4=2
        // map[2] 存在，找到了
        if(map[dif] !== undefined) {
            log([i, map[dif]])
            return [i, map[dif]]
        }
        map[nums[i]] = i
    }
}

twoSum([2,7,11,15], 9)
twoSum([3,2,4], 6)
twoSum([3,3], 6)
twoSum([2,7,12,15,5,9], 21)


