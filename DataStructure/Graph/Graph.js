// -------- 图 --------
/* 图的相关术语和三种不同表示
图是一种非线性数据结构。图是网络结构的抽象模型。图是一组由边连接的节点（或顶点）。任何二元关系都可以用图来表示。
任何社交网络，例如 Facebook、Twitter 和 Google+，都可以用图来表示。还可以使用图来表示道路、航班以及通信。

图在数学及技术上的概念。
一个图 G = (V, E)由以下元素组成。
- V：一组顶点
- E：一组边，连接 V 中的顶点


在着手实现算法之前，先了解一下图的一些【图的相关术语】。
- 由一条边连接在一起的顶点称为【相邻顶点】。比如，A 和 B 是相邻的，A 和 D 是相邻的，A 和 C 是相邻的，A 和 E 不是相邻的。
- 一个顶点的【度】是其相邻顶点的数量。比如，A 和其他三个顶点相连接，因此 A 的度为 3；E 和其他两个顶点相连，因此 E 的度为 2。
- 【路径】是顶点 v1, v2, …, vk的一个连续序列，其中 vi和 vi+1是相邻的。以上一示意图中的图为例，其中包含路径 A B E I 和 A C D G。
- 【简单路径】要求不包含重复的顶点。举个例子，A D G 是一条简单路径。除去最后一个顶点（因为它和第一个顶点是同一个顶点），【环】也是一个简单路径，比如 A D C A（最后一个顶点重新回到 A）。
- 如果图中不存在环，则称该图是【无环的】。如果图中每两个顶点间都存在路径，则该图是【连通的】。


【有向图和无向图】
图可以是【无向】的（边没有方向）或是【有向】的（有向图）。如下图(./res/有向图.png)所示，有向图的边有一个方向。
如果图中每两个顶点间在双向上都存在路径，则该图是强连通的。例如，C 和 D 是强连通的，而 A 和 B 不是强连通的。
图还可以是【未加权】的（目前为止看到的图都是未加权的）或是【加权】的。如下图(./res/加权图.png)所示，加权图的边被赋予了权值。
可以用图来解决计算机科学中的很多问题，比如搜索图中的一个特定顶点或搜索一条特定边，寻找图中的一条路径（从一个顶点到另一个顶点），寻找两个顶点之间的最短路径，以及环检测。


【图的表示】（三种）
从数据结构的角度来说，有多种方式来表示图。在所有的表示法中，不存在绝对正确的方式。图的正确表示法取决于待解决的问题和图的类型。

1.【邻接矩阵】
图最常见的实现是【邻接矩阵】。
每个节点都和一个整数相关联，该整数将作为数组的索引。用一个二维数组来表示顶点之间的连接。
如果索引为 i 的节点和索引为 j 的节点相邻，则 array[i][j] === 1，否则 array[i][j] === 0，如下图(./res/邻接矩阵.png)所示。
不是强连通的图（【稀疏图】）如果用邻接矩阵来表示，则矩阵中将会有很多 0，这意味着浪费了计算机存储空间来表示根本不存在的边。
例如，找给定顶点的相邻顶点，即使该顶点只有一个相邻顶点，也不得不迭代一整行。
邻接矩阵表示法不够好的另一个理由是，图中顶点的数量可能会改变，而二维数组不太灵活。

2.【邻接表】
也可以使用一种叫作【邻接表】的动态数据结构来表示图。
邻接表由图中每个顶点的相邻顶点列表所组成。存在好几种方式来表示这种数据结构。
可以用列表（数组）、链表，甚至是散列表或是字典来表示相邻顶点列表。下面的示意图(./res/邻接表.png)展示了邻接表数据结构。
尽管邻接表可能对大多数问题来说都是更好的选择，但以上两种表示法都很有用，且它们有着不同的性质（例如，要找出顶点 v 和 w 是否相邻，使用邻接矩阵会比较快）。
会使用邻接表表示法创建 Graph 类。

3.【关联矩阵】
还可以用【关联矩阵】来表示图。
在关联矩阵中，矩阵的行表示顶点，列表示边。如下图(./res/关联矩阵.png)所示，使用二维数组来表示两者之间的连通性，如果顶点 v 是边 e 的入射点，则 array[v][e] === 1；否则，array[v][e] === 0。
关联矩阵通常用于边的数量比顶点多的情况，以节省空间和内存。
*/


// 字典，为了单文件可运行所以复制过来
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


// 图
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


// -------- test --------
var log = console.log.bind(console)
const graph = new Graph()
// 所有想添加到图中的顶点
const myVertices = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']
for (let i = 0; i < myVertices.length; i++) {
    graph.addVertex(myVertices[i])
}
// 添加想要的边
graph.addEdge('A', 'B')
graph.addEdge('A', 'C')
graph.addEdge('A', 'D')
graph.addEdge('C', 'D')
graph.addEdge('C', 'G')
graph.addEdge('D', 'G')
graph.addEdge('D', 'H')
graph.addEdge('B', 'E')
graph.addEdge('B', 'F')
graph.addEdge('E', 'I')
log(graph.toString()) // 图的打印结果如下，表示顶点 A 有这几个相邻顶点：B、C 和 D。
/* graph.toString()
A -> B C D
B -> A E F
C -> A D G
D -> A C G H
E -> B I
F -> B
G -> C D
H -> D
I -> E
*/
