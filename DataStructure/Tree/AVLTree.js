// -------- 自平衡树(AVL) --------
/* 自平衡树(AVL)的一些概念
BST 存在一个问题：取决于你添加的节点数，树的一条边可能会非常深；也就是说，树的一条分支会有很多层，而其他的分支却只有几层，比如 tree1
tree1
                11
        7               15
    5       9       13      20
 3    6  8    10 12   14 18    25
                                    27
                                        30
                                            46
                                                70
这会在需要在某条边上添加、移除和搜索某个节点时引起一些性能问题。
为了解决这个问题，有一种树叫作 Adelson-Velskii-Landi 树（AVL 树）。
AVL 树是一种自平衡二叉搜索树，意思是任何一个节点左右两侧子树的高度之差最多为 1。
在 AVL 树中插入或移除节点和 BST 完全相同。
1.【节点的高度和平衡因子】
然而，AVL 树的不同之处在于需要检验它的平衡因子，如果有需要，会将其逻辑应用于树的自平衡。
在 AVL 树中，需要对每个节点计算右子树高度（hr）和左子树高度（hl）之间的差值，该值（hr－hl）应为 0、1 或 -1。
如果结果不是这三个值之一，则需要平衡该 AVL 树（tree2）。这就是平衡因子的概念。
tree2
            3
    2               6
                5       7
            4    

2.【平衡操作，AVL 旋转】
在对 AVL 树添加或移除节点后，要计算节点的高度并验证树是否需要进行平衡。
向 AVL 树插入节点时，可以执行单旋转或双旋转两种平衡操作，分别对应四种场景。
左-左（LL）：向右的单旋转
右-右（RR）：向左的单旋转
左-右（LR）：向右的双旋转（先 LL 旋转，再 RR 旋转）
右-左（RL）：向左的双旋转（先 RR 旋转，再 LL 旋转）
2.1 【左-左（LL）：向右的单旋转】
这种情况出现于节点的左侧子节点的高度大于右侧子节点的高度时，并且左侧子节点也是平衡或左侧较重的，如下（tree3）
tree3
            50              LL              30
        30  Y  70           =>          10      50
    10  X   40                      5       40      70
5   Z
假设向 AVL 树（tree3）插入节点 5，这会造成树失衡（节点 50-Y 高度为+2），需要恢复树的平衡。
下面是执行的操作：
- 与平衡操作相关的节点有三个（30-X、50-Y、10-Z），将节点 X 置于节点 Y（平衡因子为 +2）所在的位置（行{1}）；
- 节点 X 的左子树保持不变；
- 将节点 Y 的左子节点置为节点 X 的右子节点 Z（行{2}）；
- 将节点 X 的右子节点置为节点 Y（行{3}）。
下面的代码举例说明了整个过程。
rotationLL(node) {
    const tmp = node.left
    node.left = tmp.right
    tmp.right = node
    return tmp
}
2.2 【右-右（RR）：向左的单旋转】
和左-左的情况相反
rotationRR(node) {
    const tmp = node.right
    node.right = tmp.left
    tmp.left = node
    return tmp
}
2.3 【左-右（LR）：向右的双旋转】
这种情况出现于左侧子节点的高度大于右侧子节点的高度，并且左侧子节点右侧较重。
在这种情况下，可以对左侧子节点进行左旋转来修复，这样会形成左左的情况，然后再对不平衡的节点进行一个右旋转来修复，如下（tree4）
tree4
            3                LL             3                RR             2
        1       c4           =>         2       c4           =>         1       3
    c1      2                       1       c3                      c1    c2 c3   c4
        c2      c3              c1      c2
tree5
        70               LR             72
    50  Y   80           =>         70      80
        72  Z   90              50      75      90
        X   75
假设向 AVL 树（tree5）插入节点 75，这会造成树失衡（节点 70-Y 高度为 -2），需要恢复树的平衡。下面是执行的操作：
- 将节点 72-X 置于节点 70-Y（平衡因子为2）所在的位置；
- 将节点 80-Z 的左子节点置为节点 72-X 的右子节点；
- 将节点 70-Y 的右子节点置为节点 72-X 的左子节点；
- 将节点 72-X 的右子节点置为节点 70-Y；
- 将节点 72-X 的左子节点置为节点 80-Z。
基本上，就是先做一次 LL 旋转，再做一次 RR 旋转。下面的代码举例说明了整个过程。
rotationLR(node) {
    node.left = this.rotationRR(node.left)
    return this.rotationLL(node)
}
2.4 【右-左（RL）：向左的双旋转】
右-左的情况和左-右的情况相反。
rotationRL(node) {
    node.right = this.rotationLL(node.right)
    return this.rotationRR(node)
}
*/

function defaultCompare (a, b) {
    if (a === b) {
        return 0
    }
    return a < b ? -1 : 1
}

const Compare = {
    LESS_THAN: -1,
    BIGGER_THAN: 1,
}

// 平衡因子的数值
const BalanceFactor = {
    UNBALANCED_RIGHT: 1,
    SLIGHTLY_UNBALANCED_RIGHT: 2,
    BALANCED: 3,
    SLIGHTLY_UNBALANCED_LEFT: 4,
    UNBALANCED_LEFT: 5,
}

// 表示二叉树中的每个节点
class Node {
    constructor(key) {
        this.key = key
        this.left = null
        this.right = null
    }
}

// 自平衡树(AVL)
class AVLTree {
    constructor(compareFn=defaultCompare) {
        this.compareFn = compareFn // 用来比较节点值
        this.root = null // Node 类型的根节点
    }
    // 节点的高度，是从节点到其任意子节点的边的最大值。
    getNodeHeight(node) {
        if (node == null) {
            return -1
        }
        return Math.max(this.getNodeHeight(node.left), this.getNodeHeight(node.right)) + 1
    }
    // 计算一个节点的平衡因子并返回其值。
    getBalanceFactor(node) {
        const heightDifference = this.getNodeHeight(node.left) - this.getNodeHeight(node.right)
        switch (heightDifference) {
            case -2:
                return BalanceFactor.UNBALANCED_RIGHT
            case -1:
                return BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT
            case 1:
                return BalanceFactor.SLIGHTLY_UNBALANCED_LEFT
            case 2:
                return BalanceFactor.UNBALANCED_LEFT
            default:
                return BalanceFactor.BALANCED
        }
    }
    // 左-左（LL）：向右的单旋转
    rotationLL(node) {
        const tmp = node.left
        node.left = tmp.right
        tmp.right = node
        return tmp
    }
    // 右-右（RR）：向左的单旋转
    rotationRR(node) {
        const tmp = node.right
        node.right = tmp.left
        tmp.left = node
        return tmp
    }
    // 左-右（LR）：向右的双旋转
    rotationLR(node) {
        node.left = this.rotationRR(node.left)
        return this.rotationLL(node)
    }
    // 右-左（RL）：向左的双旋转
    rotationRL(node) {
        node.right = this.rotationLL(node.right)
        return this.rotationRR(node)
    }
    // 【插入节点】
    // 和 BST 一样。但是在插入节点之后，还要验证插入后树是否还是平衡的，如果不是，就要进行必要的旋转操作。
    insert(key) {
        this.root = this.insertNode(this.root, key)
    }
    insertNode(node, key) {
        // 像在 BST 树中一样插入节点
        if (node == null) {
            return new Node(key)
        } else if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
            node.left = this.insertNode(node.left, key)
        } else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
            node.right = this.insertNode(node.right, key)
        } else {
            return node // 重复的键
        }
        // 插入节点后，要检查树是否要进行平衡，要使用递归计算以每个插入树的节点为根的节点的平衡因子，然后对每种情况应用正确的旋转。
        const balanceFactor = this.getBalanceFactor(node)
        // 如果向左侧子树插入节点后树不平衡了
        if (balanceFactor === BalanceFactor.UNBALANCED_LEFT) {
            // 如果插入的键小于左侧子节点的键，要进行 LL 旋转。
            if (this.compareFn(key, node.left.key) === Compare.LESS_THAN) {
                node = this.rotationLL(node)
            } else {
                // 否则，要进行 LR 旋转。
                return this.rotationLR(node)
            }
        }
        // 如果向右侧子树插入节点后树不平衡了
        if (balanceFactor === BalanceFactor.UNBALANCED_RIGHT) {
            // 如果插入的键小于右侧子节点的键，要进行 RR 旋转。
            if (this.compareFn(key, node.right.key) === Compare.BIGGER_THAN) {
                node = this.rotationRR(node)
            } else {
                // 否则，要进行 RL 旋转。
                return this.rotationRL(node)
            }
        }
        return node
    }
    // 【移除节点】
    // 和 BST 一样。但是在移除节点之后，还要验证插入后树是否还是平衡的，如果不是，就要进行必要的旋转操作。
    remove(key) {
        this.root = this.removeNode(this.root, key)
    }
    removeNode(node, key) {
        node = this.removeNodeInBST(node, key)
        if (node == null) {
            return node // null，不需要进行平衡
        }
        // 移除节点后，要检查树是否要进行平衡，要使用递归计算以每个插入树的节点为根的节点的平衡因子，然后对每种情况应用正确的旋转。
        const balanceFactor = this.getBalanceFactor(node)
        // 如果从左侧子树移除节点后树不平衡了
        if (balanceFactor === BalanceFactor.UNBALANCED_LEFT) {
            // 计算左侧子树的平衡因子。
            const balanceFactorLeft = this.getBalanceFactor(node.left)
            // 如果左侧子树向左不平衡，要进行 LL 旋转。
            if (balanceFactorLeft === BalanceFactor.BALANCED || balanceFactorLeft === BalanceFactor.SLIGHTLY_UNBALANCED_LEFT) {
                return this.rotationLL(node)
            }
            // 如果左侧子树向右不平衡，要进行 LR 旋转。
            if (balanceFactorLeft === BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT) {
                return this.rotationLR(node.left)
            }
        }
        // 如果从右侧子树移除节点后树不平衡了，要计算右侧子树的平衡因子。
        if (balanceFactor === BalanceFactor.UNBALANCED_RIGHT) {
            // 计算右侧子树的平衡因子。
            const balanceFactorRight = this.getBalanceFactor(node.right)
            // 如果右侧子树向右不平衡，要进行 RR 旋转。
            if (balanceFactorRight === BalanceFactor.BALANCED || balanceFactorRight === BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT) {
                return this.rotationRR(node)
            }
            // 如果右侧子树向左不平衡，要进行 LR 旋转。
            if (balanceFactorRight === BalanceFactor.SLIGHTLY_UNBALANCED_LEFT) {
                return this.rotationRL(node.right)
            }
        }
        return node
    }


    // 下面是 BST 的方法，没有变化
    // BST 中【移除一个节点】
    // 把 BST 的 removeNode 换个名字，改为 removeNodeInBST
    removeNodeInBST(node, key) {
        if (node === null) {
            return null
        }
        // 如果不为 null，需要在树中找到要移除的键。
        if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
            node.left = this.removeNode(node.left, key)
            return node
        } else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
            node.right = this.removeNode(node.right, key)
            return node
        } else {
            // 键等于 node.key (找到了要找的键)
            // 第一种情况
            // 该节点是一个没有左侧或右侧子节点的叶节点，要给这个节点赋值 null 来移除它
            if (node.left === null && node.right === null) {
                node = null
                // 但是仅赋值 null 是不够的，还需要处理引用（指针）。
                // 这个节点没有任何子节点，但有一个父节点，要通过返回 null 将对应的父节点指针赋值 null 。
                // 现在节点的值已经是 null 了，父节点指向它的指针也会接收到这个值，这也是为什么要在函数中返回节点的值。
                return node
            }
            // 第二种情况
            // 移除有一个左子节点或右子节点的节点。这种情况要跳过这个节点，直接将父节点指向它的指针指向子节点。
            if (node.left === null) {
                // 如果这个节点没有左侧子节点，也就是说它有一个右侧子节点。
                // 因此把对它的引用改为对它右侧子节点的引用，并返回更新后的节点。
                node = node.right
                return node
            } else if (node.right === null) {
                // 如果这个节点没有右侧子节点，也一样，把对它的引用改为对它左侧子节点的引用，并返回更新后的节点。
                node = node.left
                return node
            }
            // 第三种情况
            // 最复杂的情况，要移除的节点有两个子节点，左侧子节点和右侧子节点。
            // (1) 当找到了要移除的节点后，需要找到它右边子树中最小的节点。
            const aux = this.minNode(node.right)
            // (2) 然后，用它右侧子树中最小节点的键去更新这个节点的值。通过这一步，改变了这个节点的键，也就是说它被移除了。
            node.key = aux.key
            // (3) 但是，这样在树中就有两个拥有相同键的节点了，这是不行的。要继续把右侧子树中的最小节点移除，它已经被移至要移除的节点的位置了。
            node.right = this.removeNode(node.right, aux.key)
            // (4) 最后，向它的父节点返回更新后节点的引用。
            return node
        }
    }
    // 【树的遍历】
    // 访问树的所有节点有三种方式：中序、先序和后序。
    // 【中序遍历】
    // 是一种以上行顺序（从最小到最大的顺序）访问 BST 所有节点的遍历方式。中序遍历的一种应用就是对树进行排序操作。
    inOrderTraverse(callback) {
        this.inOrderTraverseNode(this.root, callback)
    }
    inOrderTraverseNode(node, callback) {
        if (node !== null) {
            this.inOrderTraverseNode(node.left, callback)
            callback(node.key)
            this.inOrderTraverseNode(node.right, callback)
        }
    }
    // 【先序遍历】
    // 是以优先于后代节点的顺序访问每个节点的。先序遍历的一种应用是打印一个结构化的文档。
    preOrderTraverse(callback) {
        this.preOrderTraverseNode(this.root, callback)
    }
    preOrderTraverseNode(node, callback) {
        if (node !== null) {
            callback(node.key)
            this.preOrderTraverseNode(node.left, callback)
            this.preOrderTraverseNode(node.right, callback)
        }
    }
    // 【后序遍历】
    // 是先访问节点的后代节点，再访问节点本身。后序遍历的一种应用是计算一个目录及其子目录中所有文件所占空间的大小。
    postOrderTraverse(callback) {
        this.postOrderTraverseNode(this.root, callback)
    }
    postOrderTraverseNode(node, callback) {
        if (node !== null) {
            this.postOrderTraverseNode(node.left, callback)
            this.postOrderTraverseNode(node.right, callback)
            callback(node.key)
        }
    }
    // 【搜索树中的值】
    // 在树中，有三种经常执行的搜索类型：搜索最小值、搜索最大值、搜索特定的值
    // 【搜索最小值】
    min() {
        return this.minNode(this.root)
    }
    minNode(node) {
        let current = node
        while (current != null && current.left != null) {
            current = current.left
        }
        return current
    }
    // 【搜索最大值】
    max() {
        return this.maxNode(this.root);
    }
    maxNode(node) {
        let current = node;
        while (current != null && current.right != null) {
            current = current.right;
        }
        return current;
    }
    // 【搜索一个特定的值】
    search(key) {
        return this.searchNode(this.root, key)
    }
    searchNode(node, key) {
        if (node == null) {
            return false
        }
        if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
            return this.searchNode(node.left, key)
        } else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
            return this.searchNode(node.right, key)
        } else {
            return true
        }
    }
}


// -------- test --------
var log = console.log.bind(console)
const tree = new AVLTree()
tree.insert(11)
tree.insert(7)
tree.insert(14)
tree.insert(20)
tree.insert(18)
tree.insert(25)
tree.insert(15)
log('tree', tree)
const printNode = (value) => log(value)
log("先序遍历：")
tree.preOrderTraverse(printNode) // 18 11 7 14 15 20 25
/* tree
                18
        11               15
    7       14      20       25
*/
tree.remove(15)
tree.remove(20)
tree.remove(25)
log("先序遍历：")
tree.preOrderTraverse(printNode) // 11 7 18 14
/* tree
        11
 7              18
            14
*/
