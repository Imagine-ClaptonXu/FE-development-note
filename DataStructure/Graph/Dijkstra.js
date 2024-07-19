// -------- Dijkstra 算法 --------
/* Dijkstra 算法介绍
是由荷兰计算机科学家狄杰斯特拉于 1959 年提出的，因此又叫狄克斯特拉算法。
是一种计算从单个源到所有其他源的最短路径（贪心）算法，这意味着可以用它来计算从图的一个顶点到其余各顶点的最短路径。考虑这个图(./res/Dijkstra.png)。
来看看如何找到顶点 A 和其余顶点之间的最短路径。
但首先需要声明表示上图(./res/Dijkstra.png)的邻接矩阵，如下 graph 所示。
*/


// 邻接矩阵
const graph = [
//   A  B  C  D  E  F
    [0, 2, 4, 0, 0, 0], // A
    [0, 0, 2, 4, 2, 0], // B // fix: book P233, 图(./res/Dijkstra.png)中 B -> C 是 2, 故把 [0, 0, 1, 4, 2, 0] 调整为 [0, 0, 2, 4, 2, 0]
    [0, 0, 0, 0, 3, 0], // C
    [0, 0, 0, 0, 0, 2], // D
    [0, 0, 0, 3, 0, 2], // E
    [0, 0, 0, 0, 0, 0], // F
]

const INFINITY = Number.MAX_SAFE_INTEGER // 或 const INFINITY = Infinity

/** Dijkstra 算法
 * @param {Array} graph 邻接矩阵
 * @param {number} src 源顶点
 * @returns { distance, path } 增加了对算法的修改，将源顶点（src）到图中其他顶点的最短路径的值和路径一同返回。
 */
const dijkstra = (graph, src=0) => {
    // 要计算顶点间的 minDistance，就要搜索 distance 数组中的最小值，返回它在数组中的索引。
    const minDistance = (distance, visited) => {
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

    const distance = []
    const path = []
    const visited = []
    const { length } = graph
    // 先把所有的距离（distance）初始化为无限大（JavaScript 最大的数 INFINITY = Number.MAX_SAFE_INTEGER）
    // 将所有的路径初始化为 -1（无法到达）
    // 将 visited[] 初始化为 false。
    for (let i = 0; i < length; i++) {
        distance[i] = INFINITY
        path[i] = [-1]
        visited[i] = false
    }

    // 然后把源顶点到自己的距离设为 0。
    distance[src] = 0
    // 把从源顶点开始的路径设为自己。
    path[src] = [src]
    
    // 接下来要找出到其余顶点的最短路径。
    for (let i = 0; i < length - 1; i++) {
        // 所以需要从尚未处理的顶点中选出距离最近的顶点。
        const u = minDistance(distance, visited)
        // 把选出的顶点标为 visited（true），以免重复计算。
        visited[u] = true
        for (let v = 0; v < length; v++) {
            // 如果找到更短的路径，则更新最短路径，再更新最短路径的值
            if (!visited[v] && graph[u][v] !== 0 && distance[u] !== INFINITY && distance[u] + graph[u][v] < distance[v]) {
                path[v] = [...path[u], v]
                distance[v] = distance[u] + graph[u][v]
            }
        }
    }

    // 处理完所有顶点后，返回从源顶点（src）到图中其他顶点最短路径的值和路径。
    return {
        distance,
        path,
    }
}


// -------- test --------
var log = console.log.bind(console)
const spa = dijkstra(graph, 0)
const distance = spa.distance
const path = spa.path
log(spa) // [0, 2, 4, 6, 4, 6]
log(path)
/* path = [
    [0],
    [0, 1],
    [0, 2],
    [0, 1, 3],
    [0, 1, 4],
    [0, 1, 4, 5],
]
*/
