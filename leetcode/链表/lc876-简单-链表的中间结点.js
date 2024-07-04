/*
876. 链表的中间结点
https://leetcode.cn/problems/middle-of-the-linked-list/
简单
给你单链表的头结点 head ，请你找出并返回链表的中间结点。
如果有两个中间结点，则返回第二个中间结点。

示例 1：
输入：head = [1,2,3,4,5]
输出：[3,4,5]
解释：链表只有一个中间结点，值为 3 。

示例 2：
输入：head = [1,2,3,4,5,6]
输出：[4,5,6]
解释：该链表有两个中间结点，值分别为 3 和 4 ，返回第二个结点。
 
提示：
链表的结点数范围是 [1, 100]
1 <= Node.val <= 100
*/

var log = console.log.bind(console)
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var middleNode = function(head) {
    let step1 = head
    let step2 = head
    while(step2 && step2.next) {
        step1 = step1.next
        if (step2.next.next) {
            step2 = step2.next.next
        } else {
            step2 = null
            break
        }
    }
    return step1
};

// [1,2,3,4,5]
// 1 1
// 2 3
// 3 5
// [1,2,3,4,5,6]
// 1 1
// 2 3
// 3 5
// 4 null
// [1,2]
// 1 1
// 2 null

// 官方题解，单指针法
var middleNode = function(head) {
    n = 0;
    cur = head;
    while (cur != null) {
        ++n;
        cur = cur.next;
    }
    k = 0;
    cur = head;
    while (k < Math.trunc(n / 2)) { // Math.trunc 取整
        ++k;
        cur = cur.next;
    }
    return cur;
};
