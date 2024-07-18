// -------- Floyd-Warshall 算法 --------
/* Floyd-Warshall 算法介绍
Floyd-Warshall 算法（中文亦称弗洛伊德算法）是一种计算图中所有最短路径的（动态规划）算法。通过该算法可以找出从所有源到所有顶点的最短路径。
对图中的每一个顶点执行 Dijkstra 算法，也可以得到相同的结果。
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

/** Floyd-Warshall 算法
 * @param {Graph} graph 邻接矩阵
 * @returns [] 所有源到所有顶点的最短路径。
 */
const floydWarshall = graph => {
    const distance = []
    const { length } = graph
    // 先把 distance 数组初始化为每个顶点之间的权值。
    for (let i = 0; i < length; i++) {
        distance[i] = []
        for (let j = 0; j < length; j++) {
            if (i === j) {
                // 顶点到自身的距离为 0。
                distance[i][j] = 0
            } else if (graph[i][j] === 0) { // fix: book P234, 改为使用 graph[i][j] === 0 判断，来代替使用 !isFinite(graph[i][j]) 判断
                // 如果两个顶点之间没有边，就将其表示为 Infinity。
                distance[i][j] = Infinity
            } else {
                // 因为 i 到 j 可能的最短距离就是这些顶点间的权值。
                distance[i][j] = graph[i][j]
            }
        }
    }

    // 将顶点 0 到 k 作为中间点，从 i 到 j 的最短路径经过 k。
    for (let k = 0; k < length; k++) {
        for (let i = 0; i < length; i++) {
            for (let j = 0; j < length; j++) {
                // 计算通过顶点 k 的 i 和 j 之间的最短路径。
                if (distance[i][k] != Infinity && distance[k][j] != Infinity && distance[i][k] + distance[k][j] < distance[i][j]) {
                    // 如果一个新的最短路径被找到就保存下来。
                    distance[i][j] = distance[i][k] + distance[k][j]
                }
            }
        }
    }

    return distance
}


// -------- test --------
var log = console.log.bind(console)
const spa = floydWarshall(graph)
log(spa)
/*
[0, 2, 4, 6, 4, 6]
[Infinity, 0, 2, 4, 2, 4]
[Infinity, Infinity, 0, 6, 3, 5]
[Infinity, Infinity, Infinity, 0, Infinity, 2]
[Infinity, Infinity, Infinity, 3, 0, 2]
[Infinity, Infinity, Infinity, Infinity, Infinity, 0]
*/
