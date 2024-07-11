// -------- 红黑树 --------
/* 红黑树的一些概念
和 AVL 树一样，红黑树也是一个自平衡二叉搜索树。
对 AVL 树插入和移除节点可能会造成旋转，所以需要一个包含多次插入和删除的自平衡树，红黑树。
如果插入和删除频率较低（更需要多次进行搜索操作），那么 AVL 树比红黑树更好。
在红黑树中，每个节点都遵循以下规则：
(1) 顾名思义，每个节点不是红的就是黑的；
(2) 树的根节点是黑的；
(3) 所有叶节点都是黑的（用 NULL 引用表示的节点）；
(4) 如果一个节点是红的，那么它的两个子节点都是黑的；
(5) 不能有两个相邻的红节点，一个红节点不能有红的父节点或子节点；
(6) 从给定的节点到它的后代节点（NULL 叶节点）的所有路径包含相同数量的黑色节点。

【在插入节点后验证红黑树属性】
要验证红黑树是否还是平衡的以及满足它的所有要求，要使用两个概念：【重新填色和旋转】。
在向树中插入节点后，新节点将会是红色。这不会影响黑色节点数量的规则（规则 6），但会影响规则 5：两个后代红节点不能共存。
如果插入节点的父节点是黑色，那没有问题。但是如果插入节点的父节点是红色，那么会违反规则 5。
要解决这个冲突，只需要改变父节点、祖父节点和叔节点（因为同样改变了父节点的颜色）。
详见 fixTreeProperties 方法。

【红黑树旋转】
在插入算法中，只使用了右-右旋转和左-左旋转。
逻辑和 AVL 树是一样，但是由于保存了父节点的引用，需要将引用更新为旋转后的新父节点。
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

const Colors = {
    RED: '红',
    BLACK: '黑',
}

// 表示二叉树中的每个节点
class Node {
    constructor(key) {
        this.key = key
        this.left = null
        this.right = null
    }
}

// 红黑树节点
// 对红黑树来说，节点和之前比起来需要一些额外的属性：节点的颜色和指向父节点的引用。
class RedBlackNode extends Node {
    constructor(key) {
        super(key)
        this.key = key
        this.color = Colors.RED
        this.parent = null
    }
    isRed() {
        return this.color === Colors.RED
    }
}

// 红黑树
class RedBlackTree {
    constructor(compareFn=defaultCompare) {
        this.compareFn = compareFn // 用来比较节点值
        this.root = null // RedBlackNode 类型的根节点
    }
    // 【插入节点】
    // 红黑树插入节点和二叉搜索树是一样的。除了插入的代码，还要在插入后给节点一种颜色，并且验证树是否满足红黑树的条件以及是否还是自平衡的。
    insert(key) {
        if (this.root == null) {
            this.root = new RedBlackNode(key)
            this.root.color = Colors.BLACK
        } else {
            const newNode = this.insertNode(this.root, key)
            this.fixTreeProperties(newNode)
        }
    }
    // 逻辑和二叉搜索树中的一样。
    // 不同之处在于保存了指向被插入节点父节点的引用，并且返回了节点的引用，这可以在后面验证树的属性。
    insertNode(node, key) {
        if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
            if (node.left == null) {
                node.left = new RedBlackNode(key)
                node.left.parent = node
                return node.left
            } else {
                return this.insertNode(node.left, key)
            }
        } else if (node.right == null) {
            node.right = new RedBlackNode(key)
            node.right.parent = node
            return node.right
        } else {
            return this.insertNode(node.right, key)
        }
    }
    // 在插入节点后验证红黑树属性
    fixTreeProperties(node) {
        // 从插入的节点开始，要验证它的父节点是否是红色，以及这个节点是否不是黑色。
        while (node && node.parent && node.parent.isRed() && node.color !== Colors.BLACK) {
            // 为了保证代码的可读性，要保存父节点和祖父节点（的引用）
            let parent = node.parent
            const grandParent = parent.parent
            // 情形 A：父节点是左侧子节点
            if (grandParent && grandParent.left === parent) {
                const uncle = grandParent.right // {6} 
                // 情形 1A：叔节点也是红色——只需要重新填色
                // 由于也需要改变叔节点的颜色，需要一个指向它的引用（行{6}和行{9}）。
                // 如果叔节点的颜色是红色（行{7}和行{10}），
                // 就改变祖父节点、父节点和叔节点的颜色，并且将当前节点的引用指向祖父节点（行{8}），继续检查树是否有其他冲突
                if (uncle && uncle.color === Colors.RED) { // {7} 
                    grandParent.color = Colors.RED
                    parent.color = Colors.BLACK
                    uncle.color = Colors.BLACK
                    node = grandParent // {8}
                } else {
                    // 在节点的叔节点颜色为黑时，也就是说仅仅重新填色是不够的，树是不平衡的，需要进行旋转操作。
                    // 情形 2A：节点是右侧子节点——左旋转
                    // 左-右（LR）：父节点是祖父节点的左侧子节点，节点是父节点的右侧子节点。
                    // 右-右（RR）：父节点是祖父节点的右侧子节点，节点是父节点的右侧子节点。
                    // 右-左（RL）：父节点是祖父节点的右侧子节点，节点是父节点的左侧子节点。
                    // 如果父节点是左侧子节点并且节点是右侧子节点，要进行两次旋转，
                    // 首先是右-右旋转（行{12}），并更新节点（行{13}）和父节点（行{10}）的引用。
                    if (node === parent.right) {
                        this.rotationRR(parent) // {12}
                        node = parent // {13}
                        parent = node.parent // {14}
                    }
                    // 情形 3A：节点是左侧子节点——右旋转
                    // 左-左（LL）：父节点是祖父节点的左侧子节点，节点是父节点的左侧子节点。
                    // 在第一次旋转后，要再次旋转，以祖父节点为基准（行{15}），
                    // 并在旋转过程中更新父节点（行{16}）和祖父节点（行{17}）的颜色。
                    // 最后，更新当前节点的引用（行{18}），以便继续检查树的其他冲突。
                    this.rotationLL(grandParent) // {15}
                    parent.color = Colors.BLACK // {16}
                    grandParent.color = Colors.RED // {17}
                    node = parent // {18}
                }
            } else { // 情形 B：父节点是右侧子节点
                const uncle = grandParent.left // {9}
                // 情形 1B：叔节点是红色——只需要重新填色
                if (uncle && uncle.color === Colors.RED) { // {10}
                    grandParent.color = Colors.RED
                    parent.color = Colors.BLACK
                    uncle.color = Colors.BLACK
                    node = grandParent
                } else {
                    // 在节点的叔节点颜色为黑时，也就是说仅仅重新填色是不够的，树是不平衡的，需要进行旋转操作。
                    // 逻辑和上面是一样的，不同之处在于选择会这样进行：先进行左-左旋转（行{18}），再进行右-右旋转（行{20}）。
                    // 情形 2B：节点是左侧子节点——右旋转
                    if (node === parent.left) {
                        this.rotationLL(parent) // {19}
                        node = parent
                        parent = node.parent
                    }
                    // 情形 3B：节点是右侧子节点——左旋转
                    this.rotationRR(grandParent) // {20}
                    parent.color = Colors.BLACK
                    grandParent.color = Colors.RED
                    node = parent
                }
            }
        }
        // 为了保证根节点的颜色始终是黑色（规则 2），在代码最后设置根节点的颜色。
        this.root.color = Colors.BLACK
    }
    // 左-左旋转（右旋转），增加更新父节点注释
    rotationLL(node) {
        const tmp = node.left
        node.left = tmp.right
        if (tmp.right && tmp.right.key) {
            tmp.right.parent = node // 更新父节点
        }
        tmp.parent = node.parent // 更新父节点
        if (!node.parent) { // 更新父节点
            this.root = tmp // 更新父节点
        } else {
            if (node === node.parent.left) {
                node.parent.left = tmp // 更新父节点
            } else {
                node.parent.right = tmp // 更新父节点
            }
        }
        tmp.right = node
        node.parent = tmp // 更新父节点
    }
    // 右-右旋转（左旋转），增加更新父节点注释
    rotationRR(node) {
        const tmp = node.right
        node.right = tmp.left
        if (tmp.left && tmp.left.key) {
            tmp.left.parent = node // 更新父节点
        }
        tmp.parent = node.parent // 更新父节点
        if (!node.parent) { // 更新父节点
            this.root = tmp // 更新父节点
        } else {
            if (node === node.parent.left) {
                node.parent.left = tmp // 更新父节点
            } else {
                node.parent.right = tmp // 更新父节点
            }
        }
        tmp.left = node
        node.parent = tmp // 更新父节点
    }


    // 下面是 BST 的方法，没有变化
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
    // 【移除一个节点】
    remove(key) {
        this.root = this.removeNode(this.root, key)
    }
    removeNode(node, key) {
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
}


// -------- test --------
var log = console.log.bind(console)
const tree = new RedBlackTree()
tree.insert(11)
tree.insert(7)
tree.insert(14)
tree.insert(20)
tree.insert(18)
tree.insert(25)
tree.insert(15)
tree.insert(28)
tree.insert(30)
log('tree', tree)
const printNode = (value) => log(value)
log("先序遍历：")
tree.preOrderTraverse(printNode) // 18 11 7 14 15 25 20 28 30
/* tree
                    18
        11                      25
    7       14              20       28
                15                       30
*/
