// -------- Kruskal 算法 --------
// 和 Prim 算法类似，Kruskal 算法也是一种求加权无向连通图的 MST 的贪心算法。


// fix: book, P237, 书中的 Kruskal 算法无法返回期望结果，可以尝试使用 kruskal2
const kruskal = graph => {
    const INFINITY = Number.MAX_SAFE_INTEGER // 或 const INFINITY = Infinity

    // 防止 MST 出现环路。
    const find = (i, parent) => {
        // log('____________find____________innnnn', i)
        // log('parent', parent)
        // log('iiiiiiiiiiiii', i, i===1 || i=== 4)
        while (parent[i]) {
            // log('while', i, parent[i])
            i = parent[i]
        }
        // log('____________find____________ressss', i)
        return i
    }

    // 检测是否是不同的边。
    const union = (i, j, parent) => {
        if (i !== j) {
            parent[i] = j // fix: book, P238
            return true
        }
        return false
    }

    const { length } = graph
    const parent = []
    // for (let i = 0; i < length; i++) {
    //     parent[i] = i;
    // }
    const edges = []
    let ne = 0
    let a
    let b
    let u
    let v
    // 先把邻接矩阵的值复制到 cost 数组，以方便修改且可以保留原始值行。
    const cost = JSON.parse(JSON.stringify(graph))

    // 当 MST 的边数小于顶点总数减 1 时。
    while (ne < length - 1) {
        for (let i = 0, min = INFINITY; i < length; i++) {
            for (let j = i; j < length; j++) {
                if (cost[i][j] < min && cost[i][j] !== 0) { // fix: book, P237
                    min = cost[i][j]
                    a = u = i
                    b = v = j
                    // log('i j', i, j, ', cost 的权重', cost[i][j])
                }
            }
        }
        // 检查 MST 中是否已存在这条边，以避免环路。
        // log('out a, b, u, v', a, b, u, v)
        u = find(u, parent)
        v = find(v, parent)
        // log('u v', u, v)
        // 如果 u 和 v 是不同的边，则将其加入 MST。
        if (union(u, v, parent)) {
            edges[ne] = [u, v]
            ne++
        }
        // 从列表中移除这些边，以免重复计算。
        cost[a][b] = cost[b][a] = INFINITY
    }

    // 返回 MST。
    // log('edges', edges)
    // log('parent', parent)
    return parent
}


// -------- Kruskal2 --------
const kruskal2 = function(graph) {
    // 定义一个 UnionFind 类，用于在 Kruskal 算法中跟踪图中的连通分量
    class UnionFind {
        constructor(size) {
            // 初始化，每个元素都是它自己的根节点
            this.parent = new Array(size)
            for (let i = 0; i < size; i++) {
                this.parent[i] = i
            }
        }
    
        // 查找元素 x 的根节点
        find(x) {
            // log('x', x)
            // log('parent', this.parent)
            if (this.parent[x] !== x) {
                // 路径压缩，将 x 到根节点的路径上的所有节点都直接指向根节点
                this.parent[x] = this.find(this.parent[x])
            }
            return this.parent[x]
        }
    
        // 合并两个元素所在的集合 
        union(x, y) {
            let rootX = this.find(x)
            let rootY = this.find(y)
            // 如果 x 和 y 不在同一个集合中（即它们的根节点不同），则将它们合并
            if (rootX !== rootY) {
                // 将 x 的根节点连接到 y 的根节点上，实现集合的合并
                this.parent[rootX] = rootY
            }
        }
    }
    
    class Edge {
        constructor(u, v, w) {
            this.u = u // 边的起点
            this.v = v // 边的重点
            this.w = w // 边的权重
        }
    }
    
    // 辅助函数，从邻接矩阵中提取边，并返回一个列表
    const generateEdges = function(graph) {
        let numVertices = graph.length
        let edges = []
        // 遍历邻接矩阵的上三角（不包括对角线）
        for (let i = 0; i < numVertices; i++) {
            for (let j = i + 1; j < numVertices; j++) {
                // 如果两个顶点之间有边（即邻接矩阵中的值不为 0）
                if (graph[i][j] !== 0) {
                    // 创建一个 Edge 对象来表示这条边，并将其添加到列表中
                    edges.push(new Edge(i, j, graph[i][j]))
                }
            }
        }
        // log('generateEdges', edges)
        return edges
    }
    
    let numVertices = graph.length
    let edges = generateEdges(graph)
    edges.sort((a, b) => a.w - b.w) // 按权重对边进行排序
    // log('edges sorted', edges)
    let uf = new UnionFind(numVertices)
    let mst = [] // 最小生成树的边列表

    // 遍历排序后的边，查找边起点的根节点和边终点的根节点
    for (let edge of edges) {
        let u = uf.find(edge.u) // 查找边起点的根节点
        let v = uf.find(edge.v) // 查找边终点的根节点
        // log('u v', u, v)
        // 如果边的两个顶点不在同一个集合中（即不构成环），则加入最小生成树
        if (u !== v) {
            uf.union(u, v) // 合并两个集合
            mst.push(edge) // 将边加入最小生成树
            // 如果已经添加了足够的边来连接所有顶点（即边数等于顶点数减一，即找到最小生成树），则退出循环
            if (mst.length === numVertices - 1) {
                break // 
            }
        }
        // 如果边的两个顶点已经在同一个集合中，则忽略这条边，因为它会形成一个环
    }
    log('mst', mst)
    return mst
}


// -------- test --------
var log = console.log.bind(console)

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
    const spa = kruskal2(graph)
    log("Edges in MST:")
    let total = 0
    spa.forEach(edge => {
        log(`(${edge.u}, ${edge.v}) - ${edge.w}`)
        total += edge.w
    })
    log("Total cost of MST is:", total)
    /*
    Edges in MST:
    (0, 1) - 2
    (1, 2) - 2
    (1, 4) - 2
    (3, 5) - 2
    (4, 5) - 2
    Total cost of MST is: 10
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
    const spa = kruskal2(graph)
    log("Edges in MST:")
    let total = 0
    spa.forEach(edge => {
        log(`(${edge.u}, ${edge.v}) - ${edge.w}`)
        total += edge.w
    })
    log("Total cost of MST is:", total)
    /*
    Edges in MST:
    (2, 3) - 4
    (0, 3) - 5
    (0, 1) - 10
    (1, 4) - 10
    Total cost of MST is: 29
    */
}

const __test = function() {
    test1()
    test2()
}

__test()
