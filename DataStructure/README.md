## 数据结构

- 栈：是一种遵从后进先出(LIFO)原则的有序集合，新添加或待删除的元素都保存在栈的同一端，称之为栈顶，另一端叫栈底。在栈里，新元素都靠近栈顶，旧元素都接近栈底。

- 队列：是一种遵循先进先出(FIFO)原则的一组有序的项，队列在尾部添加新元素，并从顶部移除元素，最新添加的元素必须排在队列的末尾。

- 链表：链表存储有序的元素集合，但不同于数组，链表中的元素在内存中并不是连续放置的。每个元素由一个存储元素本身的节点和一个指向下一个元素的引用（也称指针或链接）组成。

- 集合：集合是由一组无序且唯一（即不能重复）的项组成的。也可以把集合想象成一个既没有重复元素，也没有顺序概念的数组。

- 字典：字典中存储的是[键，值]对，其中键名是用来查询特定元素的。字典也称作映射、符号表或关联数组。在计算机科学中，字典经常用来保存对象的引用地址。

- 递归：递归是一种解决问题的方法，它从解决问题的各个小部分开始，直到解决最初的大问题。递归通常涉及函数调用自身。

- 树：由 n（n>=1）个有限节点组成一个具有层次关系的集合；把它叫做“树”是因为它看起来像一棵倒挂的树，也就是说它是根朝上，而叶朝下的，基本呈一对多关系，树也可以看做是图的特殊形式。
- 图：图是网络结构的抽象模型；图是一组由边连接的节点（顶点）；任何二元关系都可以用图来表示，常见的比如：道路图、关系图，呈多对多关系。

### 已实现
```tree /f
├─Recursion
│      recursion.js             // 递归
│      factorial.js             // 阶乘
│      fibonacci.js             // 斐波那契
│      
├─Dictionary
│      Dictionary.js            // 字典
│      HashTable.js             // 散列表
│      HashTable2.js            // 其他的散列函数
│      
├─Set
│      Set.js                   // 集合
│      SetOperations.js         // 集合运算
│      ES6Set.js                // ES6 Set
│      
├─LinkedList
│      LinkedList.js            // 链表
│      DoublyLinkedList.js      // 双向链表
│      CircularLinkedList.js    // 循环链表
│      SortedLinkedList.js      // 有序链表
│      StackLinkedList.js       // 双向链表实现栈
│      
├─Queue
│      Queue.js                 // 队列
│      QueueByObject.js         // 用对象实现队列
│      PriorityQueue.js         // 优先队列
│      CircularQueue.js         // 环形队列
│      DoubleEndedQueue.js      // 双向队列
│      解决实际问题.js
│      
└─Stack
        Stack.js                // 栈
        StackByObject.js        // 用对象实现栈
        解决实际问题.js
```

### Reference
- [gitee - 《学习JavaScript数据结构与算法（第3版）》](https://gitee.com/mewcoder/fe-book/raw/master/%E5%AD%A6%E4%B9%A0JavaScript%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95%EF%BC%88%E7%AC%AC3%E7%89%88%EF%BC%89.pdf)
- [blog - JavaScript数据结构和算法](https://wangtunan.github.io/blog/books/javascript/algorithm.html)
- [掘金 - 在 JavaScript 中学习数据结构与算法](https://juejin.cn/post/6844903482432962573#heading-13)
- [blog - 算法通关手册（LeetCode）](https://algo.itcharge.cn/)
