// -------- 二叉树和二叉搜索树 --------
// 二叉树: 二叉树中的节点最多只能有两个子节点: 一个是左侧子节点，另一个是右侧子节点，这个定义有助于写出更高效地在树中插入、查找和删除节点的算法。
// 二叉搜索树(BST): 是二叉树中的一种，但是只允许在左侧节点存储（比父节点）小的值，在右侧节点存储（比父节点）大的值。
/** 常见的操作(方法)
 *  insert(key): 向树中插入一个新的键。
 *  search(key): 在树中查找一个键。如果节点存在，则返回 true；如果不存在，则返回 false。
 *  inOrderTraverse(): 通过中序遍历方式遍历所有节点。
 *  preOrderTraverse(): 通过先序遍历方式遍历所有节点。
 *  postOrderTraverse(): 通过后序遍历方式遍历所有节点。
 *  min(): 返回树中最小的值/键。
 *  max(): 返回树中最大的值/键。
 *  remove(key): 从树中移除某个键。
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

// 表示二叉树中的每个节点
class Node {
    constructor(key) {
        this.key = key
        this.left = null
        this.right = null
    }
}

// 二叉搜索树(BST)
class BinarySearchTree {
    constructor(compareFn=defaultCompare) {
        this.compareFn = compareFn // 用来比较节点值
        this.root = null // Node 类型的根节点
    }
    // 向树中插入一个新的节点（或键）
    insert(key) {
        // 特殊情况，插入的树节点是第一个节点，要创建一个 Node 类的实例并将它赋值给 root 属性来将 root 指向这个新节点
        if (this.root === null) {
            this.root = new Node(key)
        } else {
            // 将节点添加到根节点以外的其他位置，使用辅助方法
            this.insertNode(this.root, key)
        }
    }
    // 辅助方法，找到新节点应该插入的正确位置。要传入树的根节点和要插入的节点。
    insertNode(node, key) {
        // 如果新节点的键小于当前节点的键，那么需要检查当前节点的左侧子节点。
        if (this.compareFn(key, node.key) === -1) {
            // 如果没有左侧子节点，就插入新的节点。
            if (node.left === null) {
                node.left = new Node(key)
            } else {
                // 如果有左侧子节点，递归调用 insertNode 方法继续找到树的下一层。下次要比较的节点是当前节点的左侧子节点。
                this.insertNode(node.left, key)
            }
        } else {
            // 如果节点的键比当前节点的键大，那么需要检查当前节点的右侧子节点。
            // 当前节点没有右侧子节点，就插入新的节点。
            if (node.right === null) {
                node.right = new Node(key)
            } else {
                // 如果有右侧子节点，同样需要递归调用 insertNode 方法，用来和新节点比较的节点是右侧子节点。
                this.insertNode(node.right, key)
            }
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
const tree = new BinarySearchTree()
tree.insert(11)
tree.insert(7)
tree.insert(15)
tree.insert(5)
tree.insert(3)
tree.insert(9)
tree.insert(8)
tree.insert(10)
tree.insert(13)
tree.insert(12)
tree.insert(14)
tree.insert(20)
tree.insert(18)
tree.insert(25)
tree.insert(6)
// log('tree', tree)
/* tree
                11
        7               15
    5       9       13      20
 3    6  8    10 12   14 18    25   
*/
log("中序遍历：")
const printNode = (value) => log(value)
tree.inOrderTraverse(printNode) // 3 5 6 7 8 9 10 11 12 13 14 15 18 20 25
log("先序遍历：")
tree.preOrderTraverse(printNode) // 11 7 5 3 6 9 8 10 15 13 12 14 20 18 25
log("后序遍历：")
tree.postOrderTraverse(printNode) // 3 6 5 8 10 9 7 12 14 13 18 25 20 15 11 

const minNode = tree.min()
log('最小值：', minNode.key) // 3
const maxNode = tree.max()
log('最大值：', maxNode.key) // 25

log('搜索一个特定的值：')
log(tree.search(1) ? 'Key 1 found.' : 'Key 1 not found.') // Key 1 not found.
log(tree.search(8) ? 'Key 8 found.' : 'Key 8 not found.') // Key 8 found.

log('移除节点：')
log('移除移除一个叶节点, remove(6)')
tree.remove(6)
log(tree.search(6) ? 'Key 6 found.' : 'Key 6 not found.') // Key 6 not found.
/* tree
                11
        7               15
    5       9       13      20
 3       8    10 12   14 18    25   
*/
log('移除只有一个左侧子节点的节点, remove(5)')
tree.remove(5)
log(tree.search(5) ? 'Key 5 found.' : 'Key 5 not found.') // Key 5 not found.
/* tree
                11
        7               15
    3       9       13      20
         8    10 12   14 18    25   
*/
log('移除有两个子节点的节点, remove(15)')
tree.remove(15)
log(tree.search(15) ? 'Key 15 found.' : 'Key 15 not found.') // Key 15 not found.
/* tree
                11
        7               18
    3       9       13      20
         8    10 12   14       25   
*/
log('打印一下现在的树看看：')
tree.inOrderTraverse(printNode) // 3 7 8 9 10 11 12 13 14 18 20 25
