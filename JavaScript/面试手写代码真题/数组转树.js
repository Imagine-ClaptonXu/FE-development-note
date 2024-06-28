// -------- 数组转树 --------
function array2Tree(data) {
    // 初始化结果数组，并判断输入数据的格式
    let result = []
    if (!Array.isArray(data)) {
        return result
    }
    // 使用 map，将当前对象的 id 与当前对象对应存储起来
    let map = {}
    data.forEach(item => {
        map[item.id] = item
    })

    data.forEach(item => {
        let parent = map[item.parentId]
        if (parent) {
            if (!parent.children) {
                parent.children = []
            }
            parent.children.push(item)
        } else {
            result.push(item)
        }
    })
    return result
}

// 测试用例
let array = [
    {id: 1, parentId: 0, name: 'parentId-0'},
    {id: 66, parentId: 0, name: 'parentId-0'},
    {id: 2, parentId: 1, name: 'parentId-1'},
    {id: 3, parentId: 1, name: 'parentId-1'},
    {id: 21, parentId: 2, name: 'parentId-2'},
    {id: 67, parentId: 66, name: 'parentId-66'},
    {id: 33, parentId: 3, name: 'parentId-3'},
    {id: 35, parentId: 33, name: 'parentId-33'},
    {id: 99, parentId: 35, name: 'parentId-35'},
]
let tree = array2Tree(array)
console.log('tree', tree)
