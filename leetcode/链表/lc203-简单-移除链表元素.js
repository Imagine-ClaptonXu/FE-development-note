/*
203. 移除链表元素
简单
给你一个链表的头节点 head 和一个整数 val，请你删除链表中所有满足 Node.val == val 的节点，并返回 新的头节点。

示例 1：
输入：head = [1,2,6,3,4,5,6], val = 6
输出：[1,2,3,4,5]

示例 2：
输入：head = [], val = 1
输出：[]

示例 3：
输入：head = [7,7,7,7], val = 7
输出：[]
 
提示：
列表中的节点数目在范围 [0, 104] 内
1 <= Node.val <= 50
0 <= val <= 50
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
 * @param {number} val
 * @return {ListNode}
 */
var removeElements = function(head, val) {
    let newHead = head
    let cur = head
    while (newHead && cur) {
        if (newHead.val === val) {
            newHead = cur.next
            cur = newHead
            log('in newHead.val === val', newHead.val)
            continue
        }
        if (cur.val === val) {
            cur = cur.next
            // head = cur
            continue
        }
        let next = cur.next
        if (next && next.val === val) {
            // cur.next = next.next
            // cur.next = next.next
            cur = next.next
            continue
        }
        cur = cur.next
        // console.log('cur', cur.val)
    }
    return newHead
};

// head = [1,2,6,3,4,5,6], val = 6
// [1,2,3,4,5]
// init cur=1 cur.next=2 next=2 next.next=6
// cur=2 cur.next=2 next=6 next.next=3  =>  cur=2 cur=next.next=3
// 
