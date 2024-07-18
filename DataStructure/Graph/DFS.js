// -------- 深度优先搜索（depth-first search，DFS） --------
// 从第一个指定的顶点开始遍历图，沿着路径直到这条路径最后一个顶点被访问了，接着原路回退并探索下一条路径。换句话说，它是先深度后广度地访问顶点，如图(./res/DFS.png)所示。

/* 深度优先搜索算法不需要一个源顶点。在深度优先搜索算法中，若图中顶点 v 未访问，则访问该顶点 v。
要访问顶点 v，照如下步骤做：
(1) 标注 v 为被发现的（灰色）；
(2) 对于 v 的所有未访问（白色）的邻点 w，访问顶点 w；
(3) 标注 v 为已被探索的（黑色）。
如你所见，深度优先搜索的步骤是递归的，这意味着深度优先搜索算法使用栈来存储函数调用（由递归调用所创建的栈）。
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

// depthFirstSearch 函数接收一个 Graph 类实例和回调函数作为参数。
const depthFirstSearch = (graph, callback) => {
    const vertices = graph.getVertices()
    const adjList = graph.getAdjList()
    // 初始化每个顶点的颜色
    const color = initializeColor(vertices)
    for (let i = 0; i < vertices.length; i++) {
        // 对于图中每一个未被访问过的顶点，调用私有的递归函数 depthFirstSearchVisit，传递的参数为要访问的顶点 u、颜色数组以及回调函数。
        if (color[vertices[i]] === Colors.WHITE) {
            depthFirstSearchVisit(vertices[i], color, adjList, callback)
        }
    }
}

const depthFirstSearchVisit = (u, color, adjList, callback) => {
    // 当访问顶点 u 时，标注其为被发现的（灰色）。
    color[u] = Colors.GREY
    // 如果有 callback 函数的话，则执行该函数输出已访问过的顶点。
    if (callback) {
        callback(u)
    }
    // 接下来的一步是取得包含顶点 u 所有邻点的列表。
    const neighbors = adjList.get(u)
    for (let i = 0; i < neighbors.length; i++) {
        const w = neighbors[i]
        // 对于顶点 u 的每一个未被访问过（颜色为白色）的邻点 w，
        if (color[w] === Colors.WHITE) {
            // 调用 depthFirstSearchVisit 函数，传递 w 和其他参数（添加顶点 w 入栈，这样接下来就能访问它）。
            depthFirstSearchVisit(w, color, adjList, callback)
        }
    }
    // 最后，在该顶点和邻点按深度访问之后回退（意思是该顶点已被完全探索），并将其标注为黑色。
    color[u] = Colors.BLACK
}


/* 1. 探索深度优先算法
到目前为止，展示了深度优先搜索算法的工作原理。可以用该算法做更多的事情，而不只是输出被访问顶点的顺序。

对于给定的图 G，希望深度优先搜索算法遍历图 G 的所有节点，构建“森林”（有根树的一个集合）以及一组源顶点（根），并输出两个数组：发现时间和完成探索时间。
可以修改 depthFirstSearch 函数来返回一些信息：
- 顶点 u 的发现时间 d[u]；
- 当顶点 u 被标注为黑色时，u 的完成探索时间 f[u]；
- 顶点 u 的前溯点 p[u]。
改进过的深度优先方法的实现：DFS


深度优先算法背后的思想是什么？
边是从最近发现的顶点 u 处被向外探索的。只有连接到未发现的顶点的边被探索了。
当 u 所有的边都被探索了，该算法回退到 u 被发现的地方去探索其他的边。
这个过程持续到发现了所有从原始顶点能够触及的顶点。
如果还留有任何其他未被发现的顶点，对新源顶点重复这个过程。
重复该算法，直到图中所有的顶点都被探索了。
对于改进过的深度优先搜索，有两点需要注意：
- 时间（time）变量值的范围只可能在图顶点数量的一倍到两倍（2|V|）之间；
- 对于所有的顶点 u，d[u]<f[u]（意味着，发现时间的值比完成时间的值小，完成时间意思是所有顶点都已经被探索过了）。
在这两个假设下，有如下的规则。
1 <= d [u] < f [u] <= 2|V| 
如果对同一个图再跑一遍新的深度优先搜索方法，对图中每个顶点，会得到如下的发现/完成时间。但能用这些新信息来做什么呢？看 2. 拓扑排序


2. 拓扑排序————使用深度优先搜索
给定下图(./res/有向无环图（DAG）.png)，假定每个顶点都是一个需要去执行的任务。这是一个有向图，意味着任务的执行是有顺序的。
例如，任务 F 不能在任务 A之前执行。注意这个图没有环，意味着这是一个无环图。所以可以说该图是一个有向无环图（DAG）。

当需要编排一些任务或步骤的执行顺序时，这称为拓扑排序（topological sorting，英文亦写作 topsort 或是 toposort）。
日常生活中这个问题在不同情形下都会出现。例如，当要开始学习一门计算机科学课程，在学习某些知识之前得按顺序完成一些知识储备（不可以在上算法 I 课程前先上算法 II 课程）。
当开发一个项目时，需要按顺序执行一些步骤。例如，首先从客户那里得到需求，接着开发客户要求的东西，最后交付项目。你不能先交付项目再去收集需求。
拓扑排序只能应用于 DAG。那么，如何使用深度优先搜索来实现拓扑排序呢？详见底部 test2
*/
const DFS = graph => {
    const vertices = graph.getVertices()
    const adjList = graph.getAdjList()
    const color = initializeColor(vertices)
    // 声明一个变量来追踪发现时间和完成探索时间。
    // 声明一个 time 对象，包含 count 属性，和 JavaScript 按值或按引用传递参数有关。在一些语言中，按值或按引用传递参数是有区别的。
    // 原始数据类型是按值传递的，也就是说值的作用域只存在于函数的执行过程中。如果修改了值，只会在函数的作用域内生效。
    // 如果参数以引用形式（对象）传递，并修改了对象中的任意属性，将会影响对象的原始值。对象以引用形式传递是因为只有内存的引用被传给了函数或方法。
    // 在这里希望次数统计在这个算法执行过程中是全局使用的，所以需要将参数以对象传递，而不是原始值。
    const time = {
        count: 0,
    }
    // 为图的每一个顶点来初始化 discovery、finished 和 predecessors 数组。
    const discovery = {}
    const finished = {}
    const predecessors = {}
    for (let i = 0; i < vertices.length; i++) {
        finished[vertices[i]] = 0
        discovery[vertices[i]] = 0
        predecessors[vertices[i]] = null
    }
    for (let i = 0; i < vertices.length; i++) {
        if (color[vertices[i]] === Colors.WHITE) {
            DFSVisit(vertices[i], color, discovery, finished, predecessors, time, adjList)
        }
    }
    return {
        discovery,
        finished,
        predecessors,
    }
}

const DFSVisit = (u, color, discovery, finished, predecessors, time, adjList) => {
    // 当一个顶点第一次被发现时，追踪其发现时间。
    color[u] = Colors.GREY
    discovery[u] = ++time.count
    const neighbors = adjList.get(u)
    for (let i = 0; i < neighbors.length; i++) {
        const w = neighbors[i]
        if (color[w] === Colors.WHITE) {
            // 当它是由引自顶点 u 的边而被发现的，追踪它的前溯点。
            predecessors[w] = u
            DFSVisit(w, color, discovery, finished, predecessors, time, adjList)
        }
    }
    color[u] = Colors.BLACK
    // 最后，当这个顶点被完全探索后，追踪其完成时间。
    finished[u] = ++time.count
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

// 测试 1，测试 depthFirstSearch 方法，深度优先访问全部顶点
const test1 = function () {
    // 使用 ./Graph.js 中的测试用例
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
    // 回调方法，打印定点
    const printVertex = (value) => log('Visited vertex: ' + value)
    // 用 depthFirstSearch 方法深度优先访问全部顶点
    depthFirstSearch(graph, printVertex) 
    /* 
    Visited vertex: A
    Visited vertex: B
    Visited vertex: E
    Visited vertex: I
    Visited vertex: F
    Visited vertex: C
    Visited vertex: D
    Visited vertex: G
    Visited vertex: H
    顶点被访问的顺序，和示意图(./res/DFS.png)所展示的一致。
    */
}

// 测试 2，测试 DFS 方法，在示意图(./res/有向无环图（DAG）.png)上执行深度优先搜索。
const test2 = function () {
    // 顶点
    const vertices = ['A', 'B', 'C', 'D', 'E', 'F']
    // 边
    const edges = [
        ['A', 'C'],
        ['A', 'D'],
        ['B', 'D'],
        ['B', 'E'],
        ['C', 'F'],
        ['F', 'E'],
    ]
    // 创建图
    const isDirectedGraph = createGraph(vertices, edges, true)
    
    // 下图(./res/DFS后有向无环图（DAG）的发现和完成时间.png)展示了执行深度优先搜索算法后，该图的发现和完成时间。
    const result = DFS(isDirectedGraph)
    log('result', result)

    // 以倒序来排序完成时间数组，这便得出了该图的拓扑排序。
    const fTimes = result.finished
    const myVertices = isDirectedGraph.vertices
    let res = []
    for (let count = 0; count < myVertices.length; count++) {
        let max = 0
        let maxName = null
        for (i = 0; i < myVertices.length; i++) {
            if (fTimes[myVertices[i]] > max) {
                max = fTimes[myVertices[i]]
                maxName = myVertices[i]
            }
        }
        res.push(maxName)
        delete fTimes[maxName]
    }
    let res2str = res.join(' - ')
    log(res2str) // B - A - D - C - F - E
    // 注意之前的拓扑排序结果仅是多种可能性之一。如果稍微修改一下算法，就会有不同的结果。比如下面这个结果也是众多其他可能性中的一个。
    // A - B - C - D - F - E 
    // 这也是一个可以接受的结果。
}

const __test = function () {
    test1()
    test2()
}

__test()
