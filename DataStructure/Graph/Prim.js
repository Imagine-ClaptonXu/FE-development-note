// -------- Prim 算法 --------
// Prim 算法是一种求解加权无向连通图的 MST 问题的贪心算法。
// 它能找出一个边的子集，使得其构成的树包含图中所有顶点，且边的权值之和最小。


const prim = graph => {
    const INFINITY = Number.MAX_SAFE_INTEGER // 或 const INFINITY = Infinity

    // 要计算顶点间的 minDistance，就要搜索 distance 数组中的最小值，返回它在数组中的索引。
    const minKey = (distance, visited) => {
        let min = INFINITY
        let minIndex = -1
        for (let v = 0; v < distance.length; v++) {
            if (visited[v] === false && distance[v] <= min) {
                min = distance[v]
                minIndex = v
            }
        }
        return minIndex
    }

    const parent = [] // 保存 MST 的结果。
    const key = [] // 保存权值最小的边。
    const path = [] // 路径，[[顶点, 顶点], [顶点, 顶点]...]。
    const visited = []
    const { length } = graph
    // 先把所有顶点（key）初始化为无限大（INFINITY），visited 初始化为 false。
    for (let i = 0; i < length; i++) {
        key[i] = INFINITY
        visited[i] = false
        path[i] = []
    }

    // 然后选择第一个 key 作为第一个顶点，又因为第一个顶点总是 MST 的根节点，所以 parent[0] = -1。
    key[0] = 0
    parent[0] = -1
    path[0] = [0, 0]

    // 然后，对所有顶点求 MST。
    for (let i = 0; i < length - 1; i++) {
        // 从未处理的顶点集合中选出 key 值最小的顶点（与 Dijkstra 算法中使用的 minDistance 函数一样，只是名字不同）。
        const u = minKey(key, visited) // fix: book P236, 去掉参数 graph, 把 minKey(graph, key, visited) 改为  minKey(key, visited)
        // 把选出的顶点标为 visited（true），避免重复计算。
        visited[u] = true
        
        for (let v = 0; v < length; v++) {
            // 如果得到更小的权值。
            if (graph[u][v] && !visited[v] && graph[u][v] < key[v]) {
                // 顶点 -> 顶点的路径
                path[v] = [u, v]
                // 保存路径。
                parent[v] = u
                // 更新权值。
                key[v] = graph[u][v]
            }
        }
    }

    // 处理完所有顶点后，返回包含 MST 的结果。
    return parent
}


// -------- test --------
var log = console.log.bind(console)

// 打印出来方便查看结果
const printMST = function(graph, parent) {
    let totalCost = 0
    log("Edge \tWeight")
    for (let i = 0; i < parent.length; i++) {
        if (parent[i] !== -1) { // 确保顶点 i 被包含在 MST 中
            log(`${parent[i]} - ${i} \t${graph[parent[i]][i]}`)
            totalCost += graph[parent[i]][i]
        }
    }
    log(`Total cost of MST is ${totalCost}`)
}

const test1 = function() {
    const graph = [ // 加权无向图
    //   A  B  C  D  E  F
        [0, 2, 4, 0, 0, 0], // A
        [2, 0, 2, 4, 2, 0], // B
        [4, 2, 0, 0, 3, 0], // C
        [0, 4, 0, 0, 3, 2], // D
        [0, 2, 3, 3, 0, 2], // E
        [0, 0, 0, 2, 2, 0], // F
    ]
    log('test1 graph:', graph)
    const spa = prim(graph)
    printMST(graph, spa)
    /*
    Edge 	Weight
    0 - 1 	2
    1 - 2 	2
    5 - 3 	2
    1 - 4 	2
    4 - 5 	2
    Total cost of MST is 10
    */
}


const test2 = function() {
    const graph = [
        [0, 10, 6, 5, 0],
        [10, 0, 0, 15, 10],
        [6, 0, 0, 4, 0],
        [5, 15, 4, 0, 20],
        [0, 10, 0, 20, 0],
    ]
    log('test2 graph:', graph)
    const spa = prim(graph)
    printMST(graph, spa)
    /*
    Edge 	Weight
    0 - 1 	10
    3 - 2 	4
    0 - 3 	5
    1 - 4 	10
    Total cost of MST is 29
    */
}

const __test = function() {
    test1()
    test2()
}

__test()
