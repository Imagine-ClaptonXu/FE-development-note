/*
206. 反转链表
https://leetcode.cn/problems/reverse-linked-list/solutions/551596/fan-zhuan-lian-biao-by-leetcode-solution-d1k2/
简单
给你单链表的头节点 head ，请你反转链表，并返回反转后的链表。
 
示例 1：
输入：head = [1,2,3,4,5]
输出：[5,4,3,2,1]

示例 2：
输入：head = [1,2]
输出：[2,1]

示例 3：
输入：head = []
输出：[]
 
提示：
链表中节点的数目范围是 [0, 5000]
-5000 <= Node.val <= 5000
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
var reverseList = function(head) {
    let prev = null
    let curr = head
    while (curr) {
        const next = curr.next
        // 在遍历链表时，将当前节点的 next 指针改为指向前一个节点。
        // 头结点，反转后是末尾节点，所以指向 prev = null
        curr.next = prev
        // 由于节点没有引用其前一个节点，因此必须事先存储其前一个节点。
        prev = curr
        // 在更改引用之前，还需要存储后一个节点。
        curr = next
    }
    // 最后返回新的头引用。
    return prev
}
