## leetcode


## 目录
- [ ] [链表](#链表)
    - [单链表](#单链表)
    - [双链表](#双链表)
- [ ] [树](#树)
    - [遍历](#遍历)
    - [构造](#构造)
    - [路径_深度_翻转](#路径_深度_翻转)
    - [二叉搜索树](#二叉搜索树)
    - [前缀树](#前缀树)
    - [线段树](#线段树)
- [ ] [栈](#栈)
    - [栈基础](#栈基础)
    - [单调栈](#单调栈)
- [ ] [堆](#堆)
    - [堆基础](#堆基础)
- [ ] [二分查找](#二分查找)
- [ ] [位运算](#位运算)
- [ ] [双指针与滑动窗口](#双指针与滑动窗口)
- [ ] [矩阵](#矩阵)
- [ ] [动态规划](#动态规划)
    - [一维](#一维)
    - [二维](#二维)
- [ ] [图论](#图论)
    - [DFS](#DFS)
    - [BFS](#BFS)
    - [Dijkstra](#Dijkstra)
    - [拓扑排序](#拓扑排序)
- [ ] [并查集](#并查集)
- [ ] [设计](#设计)
- [ ] [贪心](#贪心)
- [ ] [回溯](#回溯)
- [ ] [克隆](#克隆)
- [ ] [数学](#数学)
- [ ] [极大极小化](#极大极小化)
- [ ] [几何](#几何)

## 链表

#### 单链表：

###### 简单：

- [√] [206. 反转链表](https://leetcode.cn/problems/reverse-linked-list/)
- [√] [141. 环形链表](https://leetcode.cn/problems/linked-list-cycle/)
- [√] [83. 删除排序链表中的重复元素](https://leetcode.cn/problems/remove-duplicates-from-sorted-list/)
- [√] [234. 回文链表](https://leetcode.cn/problems/palindrome-linked-list/)
- [√] [203. 移除链表元素](https://leetcode.cn/problems/remove-linked-list-elements/)
- [√] [876. 链表的中间结点](https://leetcode.cn/problems/middle-of-the-linked-list/)

###### 中等

- [√] [237. 删除链表中的节点](https://leetcode.cn/problems/delete-node-in-a-linked-list/)
- [√] [92. 反转链表 II](https://leetcode.cn/problems/reverse-linked-list-ii/)
- [ ] [143. 重排链表](https://leetcode.cn/problems/reorder-list/)
- [ ] [82. 删除排序链表中的重复元素 II](https://leetcode.cn/problems/remove-duplicates-from-sorted-list-ii/)
- [ ] [19. 删除链表的倒数第 N 个结点](https://leetcode.cn/problems/remove-nth-node-from-end-of-list/)
- [ ] [148. 排序链表](https://leetcode.cn/problems/sort-list/)
- [ ] [86. 分隔链表](https://leetcode.cn/problems/partition-list/)
- [ ] [61. 旋转链表](https://leetcode.cn/problems/rotate-list/)
- [ ] [142. 环形链表 II](https://leetcode.cn/problems/linked-list-cycle-ii/)
- [ ] [147. 对链表进行插入排序](https://leetcode.cn/problems/insertion-sort-list/)
- [ ] [138. 复制带随机指针的链表](https://leetcode.cn/problems/copy-list-with-random-pointer/)
- [ ] [24. 两两交换链表中的节点](https://leetcode.cn/problems/swap-nodes-in-pairs/)
- [ ] [328. 奇偶链表](https://leetcode.cn/problems/odd-even-linked-list/)
- [ ] [707. 设计链表](https://leetcode.cn/problems/design-linked-list/)
- [ ] [109. 有序链表转换二叉搜索树](https://leetcode.cn/problems/convert-sorted-list-to-binary-search-tree/)
- [ ] [430. 扁平化多级双向链表](https://leetcode.cn/problems/flatten-a-multilevel-doubly-linked-list/)
- [ ] [725. 分隔链表](https://leetcode.cn/problems/split-linked-list-in-parts/)

###### 困难
- [ ] [25. K 个一组翻转链表](https://leetcode.cn/problems/reverse-nodes-in-k-group/)

#### 双链表：

###### 简单：

- [ ] [21. 合并两个有序链表](https://leetcode.cn/problems/merge-two-sorted-lists/)
- [ ] [160. 相交链表](https://leetcode.cn/problems/intersection-of-two-linked-lists/)

###### 中级

- [ ] [2. 两数相加](https://leetcode.cn/problems/add-two-numbers/)
- [ ] [445. 两数相加 II](https://leetcode.cn/problems/add-two-numbers-ii/)
- [ ] [1669. 合并两个链表](https://leetcode.cn/problems/merge-in-between-linked-lists/)

###### 困难

- [ ] [23. 合并 K 个升序链表](https://leetcode.cn/problems/merge-k-sorted-lists/)

## 树

#### 遍历

###### 简单

- [ ] [145. 二叉树的后序遍历](https://leetcode.cn/problems/binary-tree-postorder-traversal/)
- [ ] [94. 二叉树的中序遍历](https://leetcode.cn/problems/binary-tree-inorder-traversal/)
- [ ] [589. N 叉树的前序遍历](https://leetcode.cn/problems/n-ary-tree-preorder-traversal/)
- [ ] [144. 二叉树的前序遍历](https://leetcode.cn/problems/binary-tree-preorder-traversal/)
- [ ] [590. N 叉树的后序遍历](https://leetcode.cn/problems/n-ary-tree-postorder-traversal/)

###### 中等

- [ ] [102. 二叉树的层序遍历](https://leetcode.cn/problems/binary-tree-level-order-traversal/)
- [ ] [103. 二叉树的锯齿形层序遍历](https://leetcode.cn/problems/binary-tree-zigzag-level-order-traversal/)
- [ ] [107. 二叉树的层序遍历 II](https://leetcode.cn/problems/binary-tree-level-order-traversal-ii/)

#### 构造

###### 简单
- [ ] [108. 将有序数组转换为二叉搜索树](https://leetcode.cn/problems/convert-sorted-array-to-binary-search-tree/)

###### 中等
- [ ] [105. 从前序与中序遍历序列构造二叉树](https://leetcode.cn/problems/construct-binary-tree-from-preorder-and-inorder-traversal/)
- [ ] [106. 从中序与后序遍历序列构造二叉树](https://leetcode.cn/problems/construct-binary-tree-from-inorder-and-postorder-traversal/)
- [ ] [114. 二叉树展开为链表](https://leetcode.cn/problems/flatten-binary-tree-to-linked-list/)
- [ ] [889. 根据前序和后序遍历构造二叉树](https://leetcode.cn/problems/construct-binary-tree-from-preorder-and-postorder-traversal/)
- [ ] [1008. 前序遍历构造二叉搜索树](https://leetcode.cn/problems/construct-binary-search-tree-from-preorder-traversal/)

###### 困难
- [ ] [297. 二叉树的序列化与反序列化](https://leetcode.cn/problems/serialize-and-deserialize-binary-tree/)

#### 路径_深度_翻转

###### 简单

- [ ] [104. 二叉树的最大深度](https://leetcode.cn/problems/maximum-depth-of-binary-tree/)
- [ ] [101. 对称二叉树](https://leetcode.cn/problems/symmetric-tree/)
- [ ] [226. 翻转二叉树](https://leetcode.cn/problems/invert-binary-tree/)
- [ ] [543. 二叉树的直径](https://leetcode.cn/problems/diameter-of-binary-tree/)
- [ ] [257. 二叉树的所有路径](https://leetcode.cn/problems/binary-tree-paths/)
- [ ] [110. 平衡二叉树](https://leetcode.cn/problems/balanced-binary-tree/)
- [ ] [617. 合并二叉树](https://leetcode.cn/problems/merge-two-binary-trees/)
- [ ] [100. 相同的树](https://leetcode.cn/problems/same-tree/)
- [ ] [112. 路径总和](https://leetcode.cn/problems/path-sum/)
- [ ] [111. 二叉树的最小深度](https://leetcode.cn/problems/minimum-depth-of-binary-tree/)

###### 中等

- [ ] [236. 二叉树的最近公共祖先](https://leetcode.cn/problems/lowest-common-ancestor-of-a-binary-tree/)
- [ ] [222. 完全二叉树的节点个数](https://leetcode.cn/problems/count-complete-tree-nodes/)
- [ ] [113. 路径总和 II](https://leetcode.cn/problems/path-sum-ii/)
- [ ] [437. 路径总和 III](https://leetcode.cn/problems/path-sum-iii/)
- [ ] [129. 求根节点到叶节点数字之和](https://leetcode.cn/problems/sum-root-to-leaf-numbers/)
- [ ] [662. 二叉树最大宽度](https://leetcode.cn/problems/maximum-width-of-binary-tree/)
- [ ] [114. 二叉树展开为链表](https://leetcode.cn/problems/flatten-binary-tree-to-linked-list/)
- [ ] [199. 二叉树的右视图](https://leetcode.cn/problems/binary-tree-right-side-view/)
- [ ] [116. 填充每个节点的下一个右侧节点指针](https://leetcode.cn/problems/populating-next-right-pointers-in-each-node/)
- [ ] [515. 在每个树行中找最大值](https://leetcode.cn/problems/find-largest-value-in-each-tree-row/)

###### 困难

- [ ] [124. 二叉树中的最大路径和](https://leetcode.cn/problems/binary-tree-maximum-path-sum/)
- [ ] [297. 二叉树的序列化与反序列化](https://leetcode.cn/problems/serialize-and-deserialize-binary-tree/)

#### 二叉搜索树

###### 简单

- [ ] [108. 将有序数组转换为二叉搜索树](https://leetcode.cn/problems/convert-sorted-array-to-binary-search-tree/)

###### 中等

- [ ] [98. 验证二叉搜索树](https://leetcode.cn/problems/validate-binary-search-tree/)
- [ ] [96. 不同的二叉搜索树](https://leetcode.cn/problems/unique-binary-search-trees/)
- [ ] [95. 不同的二叉搜索树 II](https://leetcode.cn/problems/unique-binary-search-trees-ii/)
- [ ] [173. 二叉搜索树迭代器](https://leetcode.cn/problems/binary-search-tree-iterator/)
- [ ] [230. 二叉搜索树中第 K 小的元素](https://leetcode.cn/problems/kth-smallest-element-in-a-bst/)
- [ ] [99. 恢复二叉搜索树](https://leetcode.cn/problems/recover-binary-search-tree/)

#### 字典树

###### 简单

- [ ] [720. 词典中最长的单词](https://leetcode.cn/problems/longest-word-in-dictionary/)

###### 中等

- [ ] [208. 实现 Trie (前缀树)](https://leetcode.cn/problems/implement-trie-prefix-tree/)
- [ ] [692. 前 K 个高频单词](https://leetcode.cn/problems/top-k-frequent-words/)
- [ ] [421. 数组中两个数的最大异或值](https://leetcode.cn/problems/maximum-xor-of-two-numbers-in-an-array/)

###### 困难

- [ ] [212. 单词搜索 II](https://leetcode.cn/problems/word-search-ii/)

#### 线段树

###### 中等

- [ ] [1353. 最多可以参加的会议数目](https://leetcode.cn/problems/maximum-number-of-events-that-can-be-attended/)
- [ ] [307. 区域和检索 - 数组可修改](https://leetcode.cn/problems/range-sum-query-mutable/)

###### 困难

- [ ] [315. 计算右侧小于当前元素的个数](https://leetcode.cn/problems/count-of-smaller-numbers-after-self/)
- [ ] [493. 翻转对](https://leetcode.cn/problems/reverse-pairs/)
- [ ] [218. 天际线问题](https://leetcode.cn/problems/the-skyline-problem/)
- [ ] [715. Range 模块](https://leetcode.cn/problems/range-module/)
- [ ] [850. 矩形面积 II](https://leetcode.cn/problems/rectangle-area-ii/)
- [ ] [1157. 子数组中占绝大多数的元素](https://leetcode.cn/problems/online-majority-element-in-subarray/)
- [ ] [699. 掉落的方块](https://leetcode.cn/problems/falling-squares/)
- [ ] [327. 区间和的个数](https://leetcode.cn/problems/count-of-range-sum/)


## 栈

#### 栈基础

###### 简单

- [ ] [20. 有效的括号](https://leetcode.cn/problems/valid-parentheses/)
- [ ] [1047. 删除字符串中的所有相邻重复项](https://leetcode.cn/problems/remove-all-adjacent-duplicates-in-string/)
- [ ] [232. 用栈实现队列](https://leetcode.cn/problems/implement-queue-using-stacks/)
- [ ] [155. 最小栈](https://leetcode.cn/problems/min-stack/)
- [ ] [225. 用队列实现栈](https://leetcode.cn/problems/implement-stack-using-queues/)
- [ ] [1021. 删除最外层的括号](https://leetcode.cn/problems/remove-outermost-parentheses/)
- [ ] [682. 棒球比赛](https://leetcode.cn/problems/baseball-game/)
- [ ] [844. 比较含退格的字符串](https://leetcode.cn/problems/backspace-string-compare/)

###### 中等

- [ ] [1190. 反转每对括号间的子串](https://leetcode.cn/problems/reverse-substrings-between-each-pair-of-parentheses/)
- [ ] [394. 字符串解码](https://leetcode.cn/problems/decode-string/)
- [ ] [456. 132 模式](https://leetcode.cn/problems/132-pattern/)
- [ ] [227. 基本计算器 II](https://leetcode.cn/problems/basic-calculator-ii/)
- [ ] [150. 逆波兰表达式求值](https://leetcode.cn/problems/evaluate-reverse-polish-notation/)
- [ ] [503. 下一个更大元素 II](https://leetcode.cn/problems/next-greater-element-ii/)
- [ ] [71. 简化路径](https://leetcode.cn/problems/simplify-path/)
- [ ] [856. 括号的分数](https://leetcode.cn/problems/score-of-parentheses/)
- [ ] [907. 子数组的最小值之和](https://leetcode.cn/problems/sum-of-subarray-minimums/)
- [ ] [385. 迷你语法分析器](https://leetcode.cn/problems/mini-parser/)
- [ ] [1249. 移除无效的括号](https://leetcode.cn/problems/minimum-remove-to-make-valid-parentheses/)
- [ ] [636. 函数的独占时间](https://leetcode.cn/problems/exclusive-time-of-functions/)
- [ ] [341. 扁平化嵌套列表迭代器](https://leetcode.cn/problems/flatten-nested-list-iterator/)

###### 困难

- [ ] [224. 基本计算器](https://leetcode.cn/problems/basic-calculator/)
- [ ] [726. 原子的数量](https://leetcode.cn/problems/number-of-atoms/)


#### 单调栈

###### 简单

- [ ] [496. 下一个更大元素 I](https://leetcode.cn/problems/next-greater-element-i/)

###### 中等

- [ ] [739. 每日温度](https://leetcode.cn/problems/daily-temperatures/)
- [ ] [402. 移掉 K 位数字](https://leetcode.cn/problems/remove-k-digits/)
- [ ] [316. 去除重复字母](https://leetcode.cn/problems/remove-duplicate-letters/)
- [ ] [1124. 表现良好的最长时间段](https://leetcode.cn/problems/longest-well-performing-interval/)

###### 困难

- [ ] [42. 接雨水](https://leetcode.cn/problems/trapping-rain-water/)
- [ ] [84. 柱状图中最大的矩形](https://leetcode.cn/problems/largest-rectangle-in-histogram/)
- [ ] [85. 最大矩形](https://leetcode.cn/problems/maximal-rectangle/)
- [ ] [321. 拼接最大数](https://leetcode.cn/problems/create-maximum-number/)


## 堆

#### 堆基础

###### 简单

- [ ] [1046. 最后一块石头的重量](https://leetcode.cn/problems/last-stone-weight/)
- [ ] [703. 数据流中的第 K 大元素](https://leetcode.cn/problems/kth-largest-element-in-a-stream/)

###### 中等

- [ ] [215. 数组中的第 K 个最大元素](https://leetcode.cn/problems/kth-largest-element-in-an-array/)
- [ ] [347. 前 K 个高频元素](https://leetcode.cn/problems/top-k-frequent-elements/)
- [ ] [692. 前K个高频单词](https://leetcode.cn/problems/top-k-frequent-words/)
- [ ] [378. 有序矩阵中第 K 小的元素](https://leetcode.cn/problems/kth-smallest-element-in-a-sorted-matrix/)
- [ ] [451. 根据字符出现频率排序](https://leetcode.cn/problems/sort-characters-by-frequency/)
- [ ] [743. 网络延迟时间](https://leetcode.cn/problems/network-delay-time/)
- [ ] [787. K 站中转内最便宜的航班](https://leetcode.cn/problems/cheapest-flights-within-k-stops/)
- [ ] [973. 最接近原点的 K 个点](https://leetcode.cn/problems/k-closest-points-to-origin/)

###### 困难

- [ ] [239. 滑动窗口最大值](https://leetcode.cn/problems/sliding-window-maximum/)
- [ ] [295. 数据流的中位数](https://leetcode.cn/problems/find-median-from-data-stream/)
- [ ] [218. 天际线问题](https://leetcode.cn/problems/the-skyline-problem/)


## 二分查找

###### 简单

- [ ] [69. x 的平方根](https://leetcode.cn/problems/sqrtx/)
- [ ] [704. 二分查找](https://leetcode.cn/problems/binary-search/)
- [ ] [35. 搜索插入位置](https://leetcode.cn/problems/search-insert-position/)
- [ ] [349. 两个数组的交集](https://leetcode.cn/problems/intersection-of-two-arrays/)
- [ ] [167. 两数之和 II - 输入有序数组](https://leetcode.cn/problems/two-sum-ii-input-array-is-sorted/)
- [ ] [278. 第一个错误的版本](https://leetcode.cn/problems/first-bad-version/)

###### 中等

- [ ] [300. 最长递增子序列](https://leetcode.cn/problems/longest-increasing-subsequence/)
- [ ] [74. 搜索二维矩阵](https://leetcode.cn/problems/search-a-2d-matrix/)
- [ ] [34. 在排序数组中查找元素的第一个和最后一个位置](https://leetcode.cn/problems/find-first-and-last-position-of-element-in-sorted-array/)
- [ ] [81. 搜索旋转排序数组 II](https://leetcode.cn/problems/search-in-rotated-sorted-array-ii/)
- [ ] [33. 搜索旋转排序数组](https://leetcode.cn/problems/search-in-rotated-sorted-array/)
- [ ] [454. 四数相加 II](https://leetcode.cn/problems/4sum-ii/)
- [ ] [240. 搜索二维矩阵 II](https://leetcode.cn/problems/search-a-2d-matrix-ii/)
- [ ] [718. 最长重复子数组](https://leetcode.cn/problems/maximum-length-of-repeated-subarray/)
- [ ] [50. Pow(x, n)](https://leetcode.cn/problems/powx-n/)
- [ ] [29. 两数相除](https://leetcode.cn/problems/divide-two-integers/)
- [ ] [287. 寻找重复数](https://leetcode.cn/problems/find-the-duplicate-number/)
- [ ] [209. 长度最小的子数组](https://leetcode.cn/problems/minimum-size-subarray-sum/)
- [ ] [153. 寻找旋转排序数组中的最小值](https://leetcode.cn/problems/find-minimum-in-rotated-sorted-array/)
- [ ] [162. 寻找峰值](https://leetcode.cn/problems/find-peak-element/)
- [ ] [378. 有序矩阵中第 K 小的元素](https://leetcode.cn/problems/kth-smallest-element-in-a-sorted-matrix/)
- [ ] [230. 二叉搜索树中第K小的元素](https://leetcode.cn/problems/kth-smallest-element-in-a-bst/)

###### 困难

- [ ] [4. 寻找两个正序数组的中位数](https://leetcode.cn/problems/median-of-two-sorted-arrays/)
- [ ] [887. 鸡蛋掉落](https://leetcode.cn/problems/super-egg-drop/)
- [ ] [410. 分割数组的最大值](https://leetcode.cn/problems/split-array-largest-sum/)
- [ ] [154. 寻找旋转排序数组中的最小值 II](https://leetcode.cn/problems/find-minimum-in-rotated-sorted-array-ii/)

## 位运算

###### 简单

- [ ] [136. 只出现一次的数字](https://leetcode.cn/problems/single-number/)
- [ ] [191. 位1的个数](https://leetcode.cn/problems/number-of-1-bits/)
- [ ] [169. 多数元素](https://leetcode.cn/problems/majority-element/)
- [ ] [190. 颠倒二进制位](https://leetcode.cn/problems/reverse-bits/)
- [ ] [231. 2的幂](https://leetcode.cn/problems/power-of-two/)
- [ ] [389. 找不同](https://leetcode.cn/problems/find-the-difference/)
- [ ] [461. 汉明距离](https://leetcode.cn/problems/hamming-distance/)
- [ ] [405. 数字转换为十六进制数](https://leetcode.cn/problems/convert-a-number-to-hexadecimal/)
- [ ] [268. 丢失的数字](https://leetcode.cn/problems/missing-number/)

###### 中等

- [ ] [78. 子集](https://leetcode.cn/problems/subsets/)
- [ ] [338. 比特位计数](https://leetcode.cn/problems/counting-bits/)
- [ ] [1318. 或运算的最小翻转次数](https://leetcode.cn/problems/minimum-flips-to-make-a-or-b-equal-to-c/)
- [ ] [89. 格雷编码](https://leetcode.cn/problems/gray-code/)
- [ ] [260. 只出现一次的数字 III](https://leetcode.cn/problems/single-number-iii/)
- [ ] [371. 两整数之和](https://leetcode.cn/problems/sum-of-two-integers/)
- [ ] [137. 只出现一次的数字 II](https://leetcode.cn/problems/single-number-ii/)
- [ ] [421. 数组中两个数的最大异或值](https://leetcode.cn/problems/maximum-xor-of-two-numbers-in-an-array/)

## 双指针与滑动窗口

###### 简单

- [ ] [387. 字符串中的第一个唯一字符](https://leetcode.cn/problems/first-unique-character-in-a-string/)
- [ ] [349. 两个数组的交集](https://leetcode.cn/problems/intersection-of-two-arrays/)
- [ ] [409. 最长回文串](https://leetcode.cn/problems/longest-palindrome/)
- [ ] [217. 存在重复元素](https://leetcode.cn/problems/contains-duplicate/)
- [ ] [204. 计数质数](https://leetcode.cn/problems/count-primes/)
- [ ] [88. 合并两个有序数组](https://leetcode.cn/problems/merge-sorted-array/)
- [ ] [283. 移动零](https://leetcode.cn/problems/move-zeroes/)
- [ ] [125. 验证回文串](https://leetcode.cn/problems/valid-palindrome/)
- [ ] [344. 反转字符串](https://leetcode.cn/problems/reverse-string/)
- [ ] [27. 移除元素](https://leetcode.cn/problems/remove-element/)
- [ ] [977. 有序数组的平方](https://leetcode.cn/problems/squares-of-a-sorted-array/)

###### 中等

- [ ] [3. 无重复字符的最长子串](https://leetcode.cn/problems/longest-substring-without-repeating-characters/)
- [ ] [781. 森林中的兔子](https://leetcode.cn/problems/rabbits-in-forest/)
- [√] [49. 字母异位词分组](https://leetcode.cn/problems/group-anagrams/)
- [ ] [18. 四数之和](https://leetcode.cn/problems/4sum/)
- [ ] [560. 和为 K 的子数组](https://leetcode.cn/problems/subarray-sum-equals-k/)
- [ ] [454. 四数相加 II](https://leetcode.cn/problems/4sum-ii/)
- [ ] [11. 盛最多水的容器](https://leetcode.cn/problems/container-with-most-water/)
- [ ] [16. 最接近的三数之和](https://leetcode.cn/problems/3sum-closest/)
- [ ] [18. 四数之和](https://leetcode.cn/problems/4sum/)
- [ ] [424. 替换后的最长重复字符](https://leetcode.cn/problems/longest-repeating-character-replacement/)
- [ ] [713. 乘积小于K的子数组](https://leetcode.cn/problems/subarray-product-less-than-k/)

###### 困难

- [ ] [76. 最小覆盖子串](https://leetcode.cn/problems/minimum-window-substring/)
- [ ] [992. K 个不同整数的子数组](https://leetcode.cn/problems/subarrays-with-k-different-integers/)

## 矩阵

###### 简单

- [ ] [867. 转置矩阵](https://leetcode.cn/problems/transpose-matrix/)
- [ ] [832. 翻转图像](https://leetcode.cn/problems/flipping-an-image/)

###### 中等

- [ ] [54. 螺旋矩阵](https://leetcode.cn/problems/spiral-matrix/)
- [ ] [59. 螺旋矩阵 II](https://leetcode.cn/problems/spiral-matrix-ii/)
- [ ] [73. 矩阵置零](https://leetcode.cn/problems/set-matrix-zeroes/)
- [ ] [48. 旋转图像](https://leetcode.cn/problems/rotate-image/)

## 动态规划

### 一维

###### 简单

- [ ] [70. 爬楼梯](https://leetcode.cn/problems/climbing-stairs/)
- [ ] [53. 最大子序和](https://leetcode.cn/problems/maximum-subarray/)
- [ ] [121. 买卖股票的最佳时机](https://leetcode.cn/problems/best-time-to-buy-and-sell-stock/)
- [ ] [746. 使用最小花费爬楼梯](https://leetcode.cn/problems/min-cost-climbing-stairs/)

###### 中等

- [ ] [337. 打家劫舍 III](https://leetcode.cn/problems/house-robber-iii/)
- [ ] [322. 零钱兑换](https://leetcode.cn/problems/coin-change/)
- [ ] [300. 最长递增子序列](https://leetcode.cn/problems/longest-increasing-subsequence/)
- [ ] [139. 单词拆分](https://leetcode.cn/problems/word-break/)
- [ ] [152. 乘积最大子数组](https://leetcode.cn/problems/maximum-product-subarray/)
- [ ] [338. 比特位计数](https://leetcode.cn/problems/counting-bits/)
- [ ] [309. 最佳买卖股票时机含冷冻期](https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-with-cooldown/)
- [ ] [264. 丑数 II](https://leetcode.cn/problems/ugly-number-ii/)
- [ ] [279. 完全平方数](https://leetcode.cn/problems/perfect-squares/)

###### 困难

- [ ] [32. 最长有效括号](https://leetcode.cn/problems/longest-valid-parentheses/)
- [ ] [354. 俄罗斯套娃信封问题](https://leetcode.cn/problems/russian-doll-envelopes/)
- [ ] [123. 买卖股票的最佳时机 III](https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-iii/)

### 二维

###### 中等

- [ ] [5. 最长回文子串](https://leetcode.cn/problems/longest-palindromic-substring/)
- [ ] [1143. 最长公共子序列](https://leetcode.cn/problems/longest-common-subsequence/)
- [ ] [131. 分割回文串](https://leetcode.cn/problems/palindrome-partitioning/)
- [ ] [62. 不同路径](https://leetcode.cn/problems/unique-paths/)
- [ ] [64. 最小路径和](https://leetcode.cn/problems/minimum-path-sum/)
- [ ] [221. 最大正方形](https://leetcode.cn/problems/maximal-square/)
- [ ] [416. 分割等和子集](https://leetcode.cn/problems/partition-equal-subset-sum/)
- [ ] [718. 最长重复子数组](https://leetcode.cn/problems/maximum-length-of-repeated-subarray/)
- [ ] [494. 目标和](https://leetcode.cn/problems/target-sum/)

###### 困难

- [ ] [10. 正则表达式匹配](https://leetcode.cn/problems/regular-expression-matching/)
- [ ] [72. 编辑距离](https://leetcode.cn/problems/edit-distance/)
- [ ] [887. 鸡蛋掉落](https://leetcode.cn/problems/super-egg-drop/)
- [ ] [132. 分割回文串 II](https://leetcode.cn/problems/palindrome-partitioning-ii/)
- [ ] [44. 通配符匹配](https://leetcode.cn/problems/wildcard-matching/)
- [ ] [410. 分割数组的最大值](https://leetcode.cn/problems/split-array-largest-sum/)

## 图论

### DFS

###### 中等

- [ ] [394. 字符串解码](https://leetcode.cn/problems/decode-string/)
- [ ] [721. 账户合并](https://leetcode.cn/problems/accounts-merge/)
- [ ] [547. 省份数量](https://leetcode.cn/problems/number-of-provinces/)
- [ ] [494. 目标和](https://leetcode.cn/problems/target-sum/)
- [ ] [695. 岛屿的最大面积](https://leetcode.cn/problems/max-area-of-island/)
- [ ] [130. 被围绕的区域](https://leetcode.cn/problems/surrounded-regions/)
- [ ] [1631. 最小体力消耗路径](https://leetcode.cn/problems/path-with-minimum-effort/) 
- [ ] [207. 课程表](https://leetcode.cn/problems/course-schedule/)
- [ ] [417. 太平洋大西洋水流问题](https://leetcode.cn/problems/pacific-atlantic-water-flow/)

###### 困难

- [ ] [679. 24 点游戏](https://leetcode.cn/problems/24-game/)

### BFS

###### 简单

- [ ] [690. 员工的重要性](https://leetcode.cn/problems/employee-importance/)

###### 中等

- [ ] [279. 完全平方数](https://leetcode.cn/problems/perfect-squares/)
- [ ] [130. 被围绕的区域](https://leetcode.cn/problems/surrounded-regions/)
- [ ] [1319. 连通网络的操作次数](https://leetcode.cn/problems/number-of-operations-to-make-network-connected/)
- [ ] [934. 最短的桥](https://leetcode.cn/problems/shortest-bridge/)
- [ ] [785. 判断二分图](https://leetcode.cn/problems/is-graph-bipartite/)
- [ ] [994. 腐烂的橘子](https://leetcode.cn/problems/rotting-oranges/)
- [ ] [752. 打开转盘锁](https://leetcode.cn/problems/open-the-lock/)
- [ ] [1162. 地图分析](https://leetcode.cn/problems/as-far-from-land-as-possible/)
- [ ] [529. 扫雷游戏](https://leetcode.cn/problems/minesweeper/)

###### 困难

- [ ] [815. 公交路线](https://leetcode.cn/problems/bus-routes/)
- [ ] [127. 单词接龙](https://leetcode.cn/problems/word-ladder/)
- [ ] [1293. 网格中的最短路径](https://leetcode.cn/problems/shortest-path-in-a-grid-with-obstacles-elimination/)
- [ ] [773. 滑动谜题](https://leetcode.cn/problems/sliding-puzzle/)
- [ ] [827. 最大人工岛](https://leetcode.cn/problems/making-a-large-island/)

### Dijkstra

- [ ] [787. K 站中转内最便宜的航班](https://leetcode.cn/problems/cheapest-flights-within-k-stops/)

### 拓扑排序

###### 中等

- [ ] [207. 课程表](https://leetcode.cn/problems/course-schedule/)
- [ ] [210. 课程表 II](https://leetcode.cn/problems/course-schedule-ii/)

###### 困难

- [ ] [329. 矩阵中的最长递增路径](https://leetcode.cn/problems/longest-increasing-path-in-a-matrix/)
- [ ] [1203. 项目管理](https://leetcode.cn/problems/sort-items-by-groups-respecting-dependencies/)

## 并查集

###### 中等

- [ ] [200. 岛屿数量](https://leetcode.cn/problems/number-of-islands/)
- [ ] [721. 账户合并](https://leetcode.cn/problems/accounts-merge/)
- [ ] [547. 省份数量](https://leetcode.cn/problems/number-of-provinces/)
- [ ] [130. 被围绕的区域](https://leetcode.cn/problems/surrounded-regions/)
- [ ] [1631. 最小体力消耗路径](https://leetcode.cn/problems/path-with-minimum-effort/)
- [ ] [399. 除法求值](https://leetcode.cn/problems/evaluate-division/)
- [ ] [1319. 连通网络的操作次数](https://leetcode.cn/problems/number-of-operations-to-make-network-connected/)
- [ ] [684. 冗余连接](https://leetcode.cn/problems/redundant-connection/)

###### 困难

- [√] [128. 最长连续序列](https://leetcode.cn/problems/longest-consecutive-sequence/)
- [ ] [765. 情侣牵手](https://leetcode.cn/problems/couples-holding-hands/)

## 设计

###### 简单

- [ ] [1603. 设计停车系统](https://leetcode.cn/problems/design-parking-system/)
- [ ] [705. 设计哈希集合](https://leetcode.cn/problems/design-hashset/)
- [ ] [706. 设计哈希映射](https://leetcode.cn/problems/design-hashmap/)
- [ ] [703. 数据流中的第 K 大元素](https://leetcode.cn/problems/kth-largest-element-in-a-stream/)

###### 中等

- [ ] [146. LRU 缓存机制](https://leetcode.cn/problems/lru-cache/)
- [ ] [341. 扁平化嵌套列表迭代器](https://leetcode.cn/problems/flatten-nested-list-iterator/)
- [ ] [208. 实现 Trie (前缀树)](https://leetcode.cn/problems/implement-trie-prefix-tree/)
- [ ] [173. 二叉搜索树迭代器](https://leetcode.cn/problems/binary-search-tree-iterator/)
- [ ] [622. 设计循环队列](https://leetcode.cn/problems/design-circular-queue/)
- [ ] [380. O(1) 时间插入、删除和获取随机元素](https://leetcode.cn/problems/insert-delete-getrandom-o1/)

###### 困难

- [ ] [295. 数据流的中位数](https://leetcode.cn/problems/find-median-from-data-stream/)
- [ ] [460. LFU 缓存](https://leetcode.cn/problems/lfu-cache/)

## 贪心

###### 中等

- [ ] [264. 丑数 II](https://leetcode.cn/problems/ugly-number-ii/)
- [ ] [946. 验证栈序列](https://leetcode.cn/problems/validate-stack-sequences/)
- [ ] [767. 重构字符串](https://leetcode.cn/problems/reorganize-string/)
- [ ] [373. 查找和最小的 K 对数字](https://leetcode.cn/problems/find-k-pairs-with-smallest-sums/)
- [ ] [313. 超级丑数](https://leetcode.cn/problems/super-ugly-number/)


## 回溯

###### 中等

- [ ] [46. 全排列](https://leetcode.cn/problems/permutations/)
- [ ] [22. 括号生成](https://leetcode.cn/problems/generate-parentheses/)
- [ ] [93. 复原 IP 地址](https://leetcode.cn/problems/restore-ip-addresses/)
- [ ] [78. 子集](https://leetcode.cn/problems/subsets/)
- [ ] [17. 电话号码的字母组合](https://leetcode.cn/problems/letter-combinations-of-a-phone-number/)
- [ ] [79. 单词搜索](https://leetcode.cn/problems/word-search/)
- [ ] [90. 子集 II](https://leetcode.cn/problems/subsets-ii/)
- [ ] [39. 组合总和](https://leetcode.cn/problems/combination-sum/)
- [ ] [77. 组合](https://leetcode.cn/problems/combinations/)
- [ ] [40. 组合总和 II](https://leetcode.cn/problems/combination-sum-ii/)
- [ ] [47. 全排列 II](https://leetcode.cn/problems/permutations-ii/)
- [ ] [842. 将数组拆分成斐波那契序列](https://leetcode.cn/problems/split-array-into-fibonacci-sequence/)
- [ ] [216. 组合总和 III](https://leetcode.cn/problems/combination-sum-iii/)
- [ ] [89. 格雷编码](https://leetcode.cn/problems/gray-code/)

###### 困难

- [ ] [51. N 皇后](https://leetcode.cn/problems/n-queens/)
- [ ] [37. 解数独](https://leetcode.cn/problems/sudoku-solver/)
- [ ] [126. 单词接龙 II](https://leetcode.cn/problems/word-ladder-ii/)
- [ ] [1659. 最大化网格幸福感](https://leetcode.cn/problems/maximize-grid-happiness/)

## 克隆

###### 中等

- [ ] [133. 克隆图](https://leetcode.cn/problems/clone-graph/)
- [ ] [138. 复制带随机指针的链表](https://leetcode.cn/problems/copy-list-with-random-pointer/)

## 数学

##### 简单

- [ ] [204. 计数质数](https://leetcode.cn/problems/count-primes/)
- [ ] [628. 三个数的最大乘积](https://leetcode.cn/problems/maximum-product-of-three-numbers/)
- [ ] [976. 三角形的最大周长](https://leetcode.cn/problems/largest-perimeter-triangle/)
- [√] [202. 快乐数](https://leetcode.cn/problems/happy-number/)
- [ ] [1232. 缀点成线](https://leetcode.cn/problems/check-if-it-is-a-straight-line/)

###### 中等

- [ ] [29. 两数相除](https://leetcode.cn/problems/divide-two-integers/)
- [ ] [343. 整数拆分](https://leetcode.cn/problems/integer-break/)
- [ ] [166. 分数到小数](https://leetcode.cn/problems/fraction-to-recurring-decimal/)

###### 困难

- [ ] [149. 直线上最多的点数](https://leetcode.cn/problems/max-points-on-a-line/)


## 极大极小化

###### 简单

- [ ] [292. Nim 游戏](https://leetcode.cn/problems/nim-game/)

###### 中等

- [ ] [375. 猜数字大小 II](https://leetcode.cn/problems/guess-number-higher-or-lower-ii/)
- [ ] [486. 预测赢家](https://leetcode.cn/problems/predict-the-winner/)
- [ ] [464. 我能赢吗](https://leetcode.cn/problems/can-i-win/)
- [ ] [877. 石子游戏](https://leetcode.cn/problems/stone-game/)

## 几何

###### 简单

- [ ] [1232. 缀点成线](https://leetcode.cn/problems/check-if-it-is-a-straight-line/)
- [ ] [1266. 访问所有点的最小时间](https://leetcode.cn/problems/minimum-time-visiting-all-points/)
- [ ] [892. 三维形体的表面积](https://leetcode.cn/problems/surface-area-of-3d-shapes/)

###### 中等

- [ ] [1401. 圆和矩形是否有重叠](https://leetcode.cn/problems/circle-and-rectangle-overlapping/)
- [ ] [963. 最小面积矩形 II](https://leetcode.cn/problems/minimum-area-rectangle-ii/)

###### 困难

- [ ] [587. 安装栅栏](https://leetcode.cn/problems/erect-the-fence/)
- [ ] [1515. 服务中心的最佳位置](https://leetcode.cn/problems/best-position-for-a-service-centre/)


##### Reference
- [leetcode - 面试经典 150 题](https://leetcode.cn/studyplan/top-interview-150/)
- [leetcode - 热题 100](https://leetcode.cn/studyplan/top-100-liked/)
- [leetcode - 剑指 offer Interview 75](https://leetcode.cn/studyplan/coding-interviews/)
- [blog - 算法通关手册(LeetCode)](https://algo.itcharge.cn/01.Array/)
- [github - leetcode-javascript)](https://github.com/sl1673495/leetcode-javascript)
- [krahets-LeetBook - 图解算法数据结构](https://github.com/krahets/LeetCode-Book?tab=readme-ov-file)
