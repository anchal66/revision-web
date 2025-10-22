export const data = {
  title: 'Linked Lists',
  description: 'Linked lists test a candidate\'s ability to manipulate pointers and manage memory references carefully. Solutions often involve clever pointer manipulation rather than index-based access.',
  patterns: [
    {
      title: 'Fast & Slow Pointers (Floyd\'s Cycle-Finding)',
      description: 'This pattern uses two pointers that move at different speeds to detect cycles, find the middle of a list, or solve other problems where relative positions matter.',
      exampleProblems: ['Linked List Cycle', 'Middle of the Linked List', 'Linked List Cycle II'],
      solution: {
        problemTitle: 'Linked List Cycle II',
        code: `class ListNode {
    int val;
    ListNode next;
    ListNode(int x) {
        val = x;
        next = null;
    }
}

public class Solution {
    public ListNode detectCycle(ListNode head) { 
        if (head == null || head.next == null) {
            return null;
        }

        ListNode slow = head;
        ListNode fast = head;
        boolean hasCycle = false;

        // Phase 1: Detect if a cycle exists.
        while (fast!= null && fast.next!= null) {
            slow = slow.next;
            fast = fast.next.next;
            if (slow == fast) {
                hasCycle = true;
                break;
            }
        }

        if (!hasCycle) {
            return null;
        }

        // Phase 2: Find the start of the cycle.
        ListNode ptr1 = head;
        ListNode ptr2 = slow;
        while (ptr1!= ptr2) {
            ptr1 = ptr1.next;
            ptr2 = ptr2.next;
        }

        return ptr1;
    }
}
// Time Complexity: O(n)
// Space Complexity: O(1)`,
        explanation: 'This solution first detects a cycle by finding a meeting point for the fast and slow pointers. In the second phase, it resets one pointer to the head and moves both pointers one step at a time. Their new meeting point is the start of the cycle.'
      }
    },
    {
      title: 'In-place Reversal',
      description: 'This fundamental pattern involves reversing a linked list or a sublist without allocating additional memory. It is achieved by iteratively re-wiring the `next` pointers of the nodes using `prev`, `curr`, and `next` pointers.',
      exampleProblems: ['Reverse Linked List', 'Reverse Linked List II', 'Palindrome Linked List'],
      solution: {
        problemTitle: 'Reverse Linked List', // `prev` is the new head
        code: `class Solution {
    public ListNode reverseList(ListNode head) {
        ListNode prev = null;
        ListNode curr = head;
        while (curr!= null) {
            ListNode nextTemp = curr.next; // Store the next node
            curr.next = prev;             // Reverse the current node's pointer
            prev = curr;                  // Move prev one step forward
            curr = nextTemp;              // Move curr one step forward
        }
        return prev;
    }
}
// Time Complexity: O(n)
// Space Complexity: O(1)`,
        explanation: 'This iterative solution uses three pointers to reverse the list in-place. `prev` tracks the new reversed list, `curr` is the node being processed, and `nextTemp` saves the link to the rest of the original list before it is broken.'
      }
    }
  ]
};