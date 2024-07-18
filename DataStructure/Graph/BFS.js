// -------- 广度优先搜索（breadth-first search，BFS） --------
// 从第一个指定的顶点开始遍历图，先访问其所有的邻点（相邻顶点），就像一次访问图的一层。换句话说，就是先宽后深地访问顶点。如图(./res/BFS.png)所示。


/* 以下是从顶点 v 开始的广度优先搜索算法所遵循的步骤。
(1) 创建一个队列 Q。
(2) 标注 v 为被发现的（灰色），并将 v 入队列 Q。
(3) 如果 Q 非空，则运行以下步骤：
    (a) 将 u 从 Q 中出队列；
    (b) 标注 u 为被发现的（灰色）；
    (c) 将 u 所有未被访问过的邻点（白色）入队列；
    (d) 标注 u 为已被探索的（黑色）；
*/


const Colors = {
    WHITE: 0,
    GREY: 1,
    BLACK: 2,
}

const initializeColor = vertices => {
    const color = {}
    for (let i = 0; i < vertices.length; i++) {
        color[vertices[i]] = Colors.WHITE
    }
    return color
}

class Queue {
    constructor(items) {
        this.items = items || []
    }

    // 入队
    enqueue(element){
        this.items.push(element)
    }

    // 出队
    dequeue() {
        return this.items.shift()
    }

    // 首位
    peek() {
        return this.items[0]
    }

    // 末位
    last() {
        return this.items[this.items.length - 1]
    }

    clear() {
        this.items = []
    }

    size() {
        return this.items.length
    }

    isEmpty() {
        return !this.items.length
    }

    print() {
        log(this.items)
    }
}

/** 广度优先搜索（breadth-first search，BFS）
 * @param {Graph} graph 邻接表创建的图
 * @param {string} startVertex 源顶点
 * @param {Function} callback 回调函数
 */
const breadthFirstSearch = (graph, startVertex, callback) => {
    const vertices = graph.getVertices()
    const adjList = graph.getAdjList()
    // 用 initializeColor 函数来将 color 数组初始化为白色。
    const color = initializeColor(vertices)
    // 声明和创建一个 Queue 实例，存储待访问和待探索的顶点。
    const queue = new Queue()
    // breadthFirstSearch 方法接收一个图实例和顶点作为算法的起始点。
    // 起始顶点是必要的，将此起始顶点入队。
    queue.enqueue(startVertex)
    while (!queue.isEmpty()) {
        // 如果队列非空，通过出队操作从队列中移除一个顶点。
        const u = queue.dequeue()
        // 再取得一个包含该顶点所有邻点的邻接表。
        const neighbors = adjList.get(u)
        // 该顶点将被标注为灰色，表示发现了它（但还未完成对其的探索）。
        color[u] = Colors.GREY
        // 取 u 的每个邻点
        for (let i = 0; i < neighbors.length; i++) {
            const w = neighbors[i]
            // 如果未被访问过（颜色为白色），则将其标注为已经发现了（颜色置灰），并将加入队列。这样当其出队的时候，可以完成对其的探索。
            if (color[w] === Colors.WHITE) {
                color[w] = Colors.GREY
                queue.enqueue(w)
            }
        }
        // 当完成探索该顶点和其相邻顶点后，将该顶点标注为已探索过的（颜色设置为黑色）。
        color[u] = Colors.BLACK
        // 实现 breadthFirstSearch 方法也接收一个回调（在遍历树时使用了一个相似的方法）。
        // 这个参数是可选的，如果传递了回调函数，就会用到它。
        if (callback) {
            callback(u)
        }
    }
}


/* 1. 使用 BFS 寻找最短路径
给定一个图 G 和源顶点 v，找出每个顶点 u 和 v 之间最短路径的距离（以边的数量计）。
对于给定顶点 v，广度优先算法会访问所有与其距离为 1 的顶点，接着是距离为 2 的顶点，以此类推。可以用广度优先算法来解。
可以修改 breadthFirstSearch 方法以返回一些信息：
- 从 v 到 u 的距离 distances[u]；
- 前溯点 predecessors[u]， 用来推导出从 v 到其他每个顶点 u 的最短路径。
改进过的广度优先方法的实现：BFS


2. 其他最短路径算法
在 ./Graph.js 中实现的图不是加权图。如果要计算加权图中的最短路径（例如，城市 A 和城市 B 之间的最短路径——GPS 和 Google Maps 中用到的算法），BFS 未必合适。
举几个例子：
Dijkstra 算法，解决了单源最短路径问题。
Bellman-Ford 算法，解决了边权值为负的单源最短路径问题。
A* 搜索算法，解决了求仅一对顶点间的最短路径问题，用经验法则来加速搜索过程。
Floyd-Warshall 算法，解决了求所有顶点对之间的最短路径这一问题。
*/
const BFS = (graph, startVertex) => {
    const vertices = graph.getVertices()
    const adjList = graph.getAdjList()
    const color = initializeColor(vertices)
    const queue = new Queue()
    // 用 distances 表示距离
    const distances = {}
    // 用 predecessors 表示前溯点
    const predecessors = {}
    queue.enqueue(startVertex)
    // 对于图中的每一个顶点，用 0 来初始化数组 distances，用 null 来初始化数组 predecessors
    for (let i = 0; i < vertices.length; i++) {
        distances[vertices[i]] = 0
        predecessors[vertices[i]] = null
    }
    while (!queue.isEmpty()) {
        const u = queue.dequeue()
        const neighbors = adjList.get(u)
        color[u] = Colors.GREY
        for (let i = 0; i < neighbors.length; i++) {
            const w = neighbors[i]
            // 当发现顶点 u 的邻点 w 时
            if (color[w] === Colors.WHITE) {
                color[w] = Colors.GREY
                // 通过给 distances[u]加 1 来增加 v 和 w 之间的距离（u 是 w 的前溯点，distances[u]的值已经有了）。
                distances[w] = distances[u] + 1 // {6} 
                // 设置 w 的前溯点值为 u。
                predecessors[w] = u // {7} 
                queue.enqueue(w)
            }
        }
        color[u] = Colors.BLACK
    }

    // 通过前溯点数组，可以用下面的代码来构建从顶点 A 到其他顶点的路径。
    // 用 paths 存储全部路径
    const paths = []
    // 顶点 A 作为源顶点。
    const myVertices = graph.vertices
    const fromVertex = myVertices[0]
    // 对于每个其他顶点（除了顶点 A），计算顶点 A 到其的路径。
    for (i = 1; i < myVertices.length; i++) {
        // 从 myVertices 数组得到值
        const toVertex = myVertices[i]
        // 然后创建一个栈来存储路径值（用数组）
        const path = []
        // 接着，追溯 toVertex 到 fromVertex 的路径。
        for (let v = toVertex; v !== fromVertex; v = predecessors[v]) {
            // 将变量 v 添加到栈中。
            path.push(v)
        }
        // 最后，把源顶点也添加到栈中，以得到完整路径。['I', 'E', 'B', 'A']
        path.push(fromVertex)
        // 把 ['I', 'E', 'B', 'A'] 反转，['A', 'B', 'E', 'I']，存入 paths 
        paths.push(path.reverse())
    }

    return {
        distances,
        predecessors,
        paths,
    }
}


// -------- test --------
var log = console.log.bind(console)

// 创建图
const createGraph = function (vertices, edges, isDirected=false) {
    function defaultToString(item) {
        if (item === null) {
            return 'NULL'
        } else if (item === undefined) {
            return 'UNDEFINED'
        } else if (typeof item === 'string' || item instanceof String) {
            return `${item}`
        } else if (Object.prototype.toString.call(item) === '[object Object]') {
            // 如果 item 变量是一个对象的话，它需要实现 toString 方法，否则会导致出现异常的输出结果，如[object Object]。这对用户是不友好的。
            // 暂时用 JSON.stringify 顶顶
            return JSON.stringify(item)
        }
        return item.toString()
    }
    class ValuePair {
        constructor(key, value) {
            this.key = key
            this.value = value
        }
        toString() {
            return `[#${this.key}: ${this.value}]`
        }
    }
    class Dictionary {
        constructor(toStrFn=defaultToString) {
            this.toStrFn = toStrFn
            this.table = {}
        }
        // 检测一个键是否存在于字典中
        hasKey (key) {
            let value = this.table[this.toStrFn(key)]
            return value !== null && value !== undefined
        }
        // 向字典中添加新元素。
        set(key, value) {
            if (key != null && value != null) {
                const tableKey = this.toStrFn(key)
                this.table[tableKey] = new ValuePair(key, value)
                return true
            }
            return false
        }
        // 从字典中移除一个值
        remove(key) {
            if (this.hasKey(key)) {
                delete this.table[this.toStrFn(key)]
                return true
            }
            return false
        }
        // 从字典中检索一个值
        get(key) {
            const valuePair = this.table[this.toStrFn(key)]
            return valuePair == null ? undefined : valuePair.value
        }
        // 将字典中所有[键，值]对返回。
        keyValues() {
            // 方法一，Object.values
            // return Object.values(this.table)

            // 方法二，for in
            const valuePairs = []
            for (const k in this.table) {
                if (this.hasKey(k)) {
                    valuePairs.push(this.table[k]) 
                }
            }
            return valuePairs
        }
        // 将字典所包含的所有键名以数组形式返回。
        keys() {
            // 方法一，map
            // return this.keyValues().map(valuePair => valuePair.key)

            // 方法二，for 循环
            const keys = []
            const valuePairs = this.keyValues()
            for (let i = 0; i < valuePairs.length; i++) {
                keys.push(valuePairs[i].key)
            }
            return keys
        }
        // 将字典所包含的所有数值以数组形式返回。
        values() {
            return this.keyValues().map(valuePair => valuePair.value)
        }
        // 迭代字典中所有的键值对。
        forEach(callbackFn) {
            const valuePairs = this.keyValues()
            for (let i = 0; i < valuePairs.length; i++) {
                const result = callbackFn(valuePairs[i].key, valuePairs[i].value)
                if (result === false) {
                    break
                }
            }
        }
        size() {
            return this.keyValues().length
        }
        isEmpty() {
            return this.size() === 0
        }
        clear() {
            this.table = {}
        }
        toString() {
            if (this.isEmpty()) {
                return ''
            }
            const valuePairs = this.keyValues()
            let objStr = valuePairs[0].toString()
            for (let index = 1; index < valuePairs.length; index++) {
                objStr = `${objStr}, ${valuePairs[index].toString()}`
            }
            return objStr
        }
    }
    class Graph {
        constructor(isDirected=false) {
            this.isDirected = isDirected // 表示图是否有向，默认是无向的。
            this.vertices = [] // 使用一个数组来存储图中所有顶点的名字。
            this.adjList = new Dictionary() // 用字典来存储邻接表。用顶点的名字作为键，邻接顶点列表作为值。
        }
        // 向图中添加一个新的顶点。接收顶点 v 作为参数。
        addVertex(v) {
            // 只有在这个顶点不存在于图中时
            if (!this.vertices.includes(v)) {
                // 将该顶点添加到顶点列表中
                this.vertices.push(v)
                // 并且在邻接表中，设置顶点 v 作为键，对应的值为一个空数组。
                this.adjList.set(v, [])
            }
        }
        // 来添加顶点之间的边。接收两个顶点作为参数，也就是要建立连接的两个顶点。
        addEdge(v, w) {
            // 在连接顶点之前，需要验证顶点是否存在于图中。
            // 如果顶点 v 或 w 不存在于图中，要将它们加入顶点列表。
            if (!this.adjList.get(v)) {
                this.addVertex(v)
            }
            if (!this.adjList.get(w)) {
                this.addVertex(w)
            }
            // 通过将 w 加入到 v 的邻接表中，添加了一条自顶点 v 到顶点 w 的边。
            this.adjList.get(v).push(w)
            // 如果想实现一个有向图，到这里为止就足够了。
            // 如果是无向图，需要添加一条自 w 到 v 的边。
            if (!this.isDirected) {
                this.adjList.get(w).push(v)
            }
        }
        // 返回顶点列表。
        getVertices() {
            return this.vertices
        }
        // 返回邻接表。
        getAdjList() {
            return this.adjList
        }
        // 为了方便在控制台输出图。
        toString() {
            let s = ''
            for (let i = 0; i < this.vertices.length; i++) {
                s += `${this.vertices[i]} -> `
                const neighbors = this.adjList.get(this.vertices[i])
                for (let j = 0; j < neighbors.length; j++) {
                    s += `${neighbors[j]} `
                }
                s += '\n'
            }
            return s
        }
    }

    // 创建图
    const graph = new Graph(isDirected)
    // 添加顶点
    for (let i = 0; i < vertices.length; i++) {
        graph.addVertex(vertices[i])
    }
    // 添加边
    for (let index = 0; index < edges.length; index++) {
        const v1 = edges[index][0]
        const v2 = edges[index][1]
        graph.addEdge(v1, v2)
    }
    return graph
}

// 测试 1，测试 breadthFirstSearch 方法，广度优先访问全部顶点
const test1 = function () {
    // 顶点
    const vertices = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']
    // 边
    const edges = [
        ['A', 'B'],
        ['A', 'C'],
        ['A', 'D'],
        ['C', 'D'],
        ['C', 'G'],
        ['D', 'G'],
        ['D', 'H'],
        ['B', 'E'],
        ['B', 'F'],
        ['E', 'I'],
    ]
    // 创建图
    const graph = createGraph(vertices, edges)
    const printVertex = (value) => log('Visited vertex: ' + value)
    const myVertices = graph.vertices
    breadthFirstSearch(graph, myVertices[0], printVertex) 
    /* 
    Visited vertex: A
    Visited vertex: B
    Visited vertex: C
    Visited vertex: D
    Visited vertex: E
    Visited vertex: F
    Visited vertex: G
    Visited vertex: H
    Visited vertex: I
    顶点被访问的顺序，和示意图(./res/BFS.png)所展示的一致。
    */
}

// 测试 2，测试 BFS 方法，寻找最短路径
const test2 = function () {
    // 顶点
    const vertices = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']
    // 边
    const edges = [
        ['A', 'B'],
        ['A', 'C'],
        ['A', 'D'],
        ['C', 'D'],
        ['C', 'G'],
        ['D', 'G'],
        ['D', 'H'],
        ['B', 'E'],
        ['B', 'F'],
        ['E', 'I'],
    ]
    // 创建图
    const graph = createGraph(vertices, edges)
    const myVertices = graph.vertices
    const shortestPathA = BFS(graph, myVertices[0])
    // distances 表示顶点 A 与顶点 B、C 和 D 的距离为 1；与顶点 E、F、G 和 H 的距离为 2；与顶点 I 的距离为 3。
    log('distances:   ', shortestPathA.distances)     // {A: 0, B: 1, C: 1, D: 1, E: 2, F: 2, G: 2, H: 2 , I: 3}
    log('predecessors:', shortestPathA.predecessors)  // {A: null, B: "A", C: "A", D: "A", E: "B", F: "B", G: "C", H: "D", I: "E"}
    log('paths:       ', shortestPathA.paths)
    /* paths
    [
        ['A', 'B'],
        ['A', 'C'],
        ['A', 'D'],
        ['A', 'B', 'E'],
        ['A', 'B', 'F'],
        ['A', 'C', 'G'],
        ['A', 'D', 'H'],
        ['A', 'B', 'E', 'I'],
    ]
    */
    // 把 paths 全部打印出来
    let paths = JSON.parse(JSON.stringify(shortestPathA.paths))
    for (let index = 0; index < paths.length; index++) {
        const path = paths[index];
        let s = path.shift()
        while (!(path.length === 0)) {
            s += ' - ' + path.shift()
        }
        log(s)
    }
    /* 打印的 paths
    A - B 
    A - C 
    A - D 
    A - B - E 
    A - B - F 
    A - C - G 
    A - D - H 
    A - B - E - I
    */
}

const __test = function () {
    test1()
    test2()
}

__test()
