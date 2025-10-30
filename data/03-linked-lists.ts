export const data = {
  title: 'Linked List Patterns',
  description: `Linked lists are a fundamental data structure, and many coding interview problems center around common patterns in linked list manipulation. Here we organize key **patterns** for solving linked list problems and how to recognize them. From basic operations to advanced techniques (two-pointer approaches, in-place reversal, partitioning, merging, using extra pointers, etc.), this summary covers the major approaches. It includes examples from LeetCode (and similar platforms) with Java solutions and explanations for each pattern. This should serve as a comprehensive revision resource for linked list problems.`,
  patterns: [
    {
      title: 'Basic Operations & Structure',
      description: `This covers the basics of singly and doubly linked lists, including traversal and modifications at various positions (head, tail, middle). It also touches on circular linked lists (which connect the tail back to the head) and even skip lists. The core idea is understanding pointer manipulation: to insert or delete a node, you typically keep track of the current node and its previous node. Special techniques like using a dummy (sentinel) node are often employed to simplify edge cases at the head or tail:contentReference[oaicite:0]{index=0}. In a doubly linked list, having a \`prev\` pointer makes deletions easier (you can remove a node in O(1) if you have a direct reference). For circular linked lists, remember that the traversal must stop when you reach the starting point again (to avoid infinite loops).`,
      exampleProblems: [
        'Design Linked List (LeetCode 707)',
        'Remove Linked List Elements (LeetCode 203)',
        'Insert into a Sorted Circular Linked List (LeetCode 708)'
      ],
      solution: {
        problemTitle: 'Remove Linked List Elements (LeetCode 203)',
        code: `
public ListNode removeElements(ListNode head, int val) {
    // Use a dummy node to handle deletions at the head easily
    ListNode dummy = new ListNode(0);
    dummy.next = head;
    ListNode current = dummy;
    // Traverse the list
    while (current.next != null) {
        if (current.next.val == val) {
            // Delete the node by skipping it
            current.next = current.next.next;
        } else {
            current = current.next;
        }
    }
    // Return the new head (dummy.next, since dummy was before the original head)
    return dummy.next;
}
        `,
        explanation: `We create a dummy head node that points to the start of the list to simplify deletion logic (particularly for cases where the head node itself needs to be removed):contentReference[oaicite:1]{index=1}. Then we iterate through the list with a pointer \`current\`. If \`current.next\` has the target value, we bypass that node by pointing \`current.next\` to \`current.next.next\`, effectively removing it. Otherwise, we simply move \`current\` forward. Using the dummy node ensures that even if the original head contains the value to be removed, our loop can handle it uniformly. The result is returned via \`dummy.next\` (which will be the updated head of the list). This runs in O(n) time with O(1) extra space.`
      }
    },
    {
      title: 'Two-pointer Technique (Fast & Slow)',
      description: `Many linked list problems can be solved efficiently using two-pointer techniques:contentReference[oaicite:2]{index=2}. In the classic *fast-and-slow pointer* pattern (also known as Tortoise and Hare), one pointer moves one step at a time while another moves two steps. This helps find the middle of the list, or detect cycles (if the two pointers meet, there is a cycle:contentReference[oaicite:3]{index=3}). For example, to check if a list is a palindrome, you can find the middle with this method, then reverse the second half and compare it to the first half:contentReference[oaicite:4]{index=4}. Another use is to find the k-th node from the end: you can advance one pointer k steps ahead, then move both until the lead pointer hits the end:contentReference[oaicite:5]{index=5}, leaving the trailing pointer on the k-th from last node. There are also problems where two pointers start at the heads of two lists – for instance, to find the intersection of two linked lists, you can traverse each list and then switch to the other list when you reach the end; both pointers will meet at the intersection point (if any):contentReference[oaicite:6]{index=6}. Recognize the two-pointer pattern when a problem asks for a *middle element*, *cycle detection*, *relative positions from the end*, or anything that hints at one pointer chasing another or synchronization between two lists.`,
      exampleProblems: [
        'Middle of the Linked List (LeetCode 876)',
        'Remove Nth Node From End of List (LeetCode 19)',
        'Linked List Cycle II (LeetCode 142)',
        'Palindrome Linked List (LeetCode 234)',
        'Intersection of Two Linked Lists (LeetCode 160)'
      ],
      solution: {
        problemTitle: 'Linked List Cycle II (LeetCode 142)',
        code: `
public ListNode detectCycle(ListNode head) {
    if (head == null) return null;
    ListNode slow = head;
    ListNode fast = head;
    // 1. Detect cycle using fast and slow pointers
    while (fast != null && fast.next != null) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow == fast) {  // fast and slow meet, cycle detected
            // 2. Find the starting node of the cycle
            slow = head;
            while (slow != fast) {
                slow = slow.next;
                fast = fast.next;
            }
            return slow;  // both pointers meet at the cycle start
        }
    }
    return null;  // no cycle
}
        `,
        explanation: `We use Floyd’s Cycle Detection algorithm. First, we move one pointer (\`slow\`) one step at a time and another pointer (\`fast\`) two steps at a time. If there is a cycle, these pointers will eventually meet inside the loop:contentReference[oaicite:7]{index=7}. Once a meeting point is found, we know a cycle exists. To find the exact starting node of the cycle, we reset one pointer to the head of the list while leaving the other at the meeting point, then move both one step at a time. They will meet again at the beginning of the loop. (This works because the distance from head to the start of the cycle equals the distance from the meeting point to the start of the cycle in terms of number of nodes.) In code, after detecting the cycle, we set \`slow\` back to head and then advance \`slow\` and \`fast\` together until they meet, returning that node. The algorithm runs in O(n) time and uses O(1) space.`
      }
    },
    {
      title: 'In-place Reversal Pattern',
      description: `In-place reversal of a linked list is a common pattern for problems where you need to reverse all or part of a list without using extra space:contentReference[oaicite:8]{index=8}. The basic technique uses a few pointers to reverse the direction of the links as you traverse the list. Typically, you maintain a \`prev\` pointer (initially null) and a \`curr\` pointer (initially at the head), and iteratively move through the list adjusting pointers: at each step, point \`curr.next\` to \`prev\`, then advance \`prev\` and \`curr\`. This effectively reverses the list one node at a time. This pattern underlies solutions for reversing an entire linked list, reversing a sub-section of a list, or reversing nodes in groups of k. It can also be adapted to certain rotation problems (though rotation usually involves a couple of extra steps like connecting the end to the head). If a problem statement asks you to "reverse" a list or a part of it, or to "rotate" a list, it's a strong hint to apply this in-place reversal approach (either iteratively or recursively).`,
      exampleProblems: [
        'Reverse Linked List (LeetCode 206)',
        'Swap Nodes in Pairs (LeetCode 24)',
        'Reverse Nodes in k-Group (LeetCode 25)',
        'Reverse Linked List II (LeetCode 92)',
        'Rotate List (LeetCode 61)'
      ],
      solution: {
        problemTitle: 'Reverse Linked List (LeetCode 206)',
        code: `
public ListNode reverseList(ListNode head) {
    ListNode prev = null;
    ListNode curr = head;
    while (curr != null) {
        // store the next node
        ListNode nextNode = curr.next;
        // reverse the link
        curr.next = prev;
        // move prev and curr one step forward
        prev = curr;
        curr = nextNode;
    }
    // prev will be the new head at the end of iteration
    return prev;
}
        `,
        explanation: `We maintain two pointers, \`prev\` and \`curr\`, and iterate through the list, reversing the links as we go:contentReference[oaicite:9]{index=9}. Initially, \`prev = null\` and \`curr = head\`. On each iteration, we store \`curr.next\` in a temporary variable (to not lose track of the remainder of the list), then set \`curr.next = prev\` (this is the actual reversal of the pointer for the current node). Next, we advance \`prev\` to \`curr\`, and \`curr\` to the saved next node. By the time \`curr\` becomes null (end of list), \`prev\` points to the new head (the original tail). This algorithm is O(n) in time and O(1) in space. The same idea can be extended: for example, to reverse nodes in k-group, you would apply this reversal in segments of length k (using loops or recursion to handle each segment).`
      }
    },
    {
      title: 'Partitioning and Reordering',
      description: `This pattern involves rearranging nodes based on certain conditions or positions. A common example is **partitioning** around a value x: we divide the list into two sublists – one with nodes less than x and one with nodes greater or equal to x – and then concatenate them:contentReference[oaicite:10]{index=10}. This approach maintains the original relative order within each partition (stable partition). To implement, you can iterate through the original list and append nodes to either a "before" list or an "after" list, then link them together. Similarly, to **segregate even and odd** valued nodes, you build two lists (even-valued nodes and odd-valued nodes) and join them. For a problem like sorting a list of 0s, 1s and 2s, one can use a three-list approach or simply count the occurrences and rewrite the values. Another type of reordering is the **Reorder List** problem (LC 143) where the list has to be re-arranged in alternating order from ends – typically solved by splitting the list in half, reversing the second half, and merging the two halves alternately. In all these scenarios, the key is to recognize that the problem wants you to **re-link nodes in a new order** rather than just sorting values, and then apply pointer manipulations (often with the help of temporary lists or dummy nodes) to achieve the desired order.`,
      exampleProblems: [
        'Partition List (LeetCode 86)',
        'Odd Even Linked List (LeetCode 328)',
        'Segregate Even and Odd Nodes (GeeksforGeeks)',
        'Sort Linked List of 0s, 1s and 2s (GeeksforGeeks)',
        'Reorder List (LeetCode 143)'
      ],
      solution: {
        problemTitle: 'Partition List (LeetCode 86)',
        code: `
public ListNode partition(ListNode head, int x) {
    // Initialize dummy heads for two lists: 'before' and 'after'
    ListNode beforeHead = new ListNode(0);
    ListNode afterHead = new ListNode(0);
    ListNode before = beforeHead;
    ListNode after = afterHead;
    ListNode current = head;
    // Partition the list into two halves
    while (current != null) {
        if (current.val < x) {
            before.next = current;
            before = current;
        } else {
            after.next = current;
            after = current;
        }
        current = current.next;
    }
    // End the 'after' list
    after.next = null;
    // Connect 'before' list with 'after' list
    before.next = afterHead.next;
    return beforeHead.next;
}
        `,
        explanation: `We use two temporary dummy heads (\`beforeHead\` and \`afterHead\`) to build two lists: one for nodes with values less than x, and one for nodes with values greater or equal to x:contentReference[oaicite:11]{index=11}. We traverse the original list once (\`current\` goes through each node). If a node’s value is < x, we attach it to the end of the "before" list; otherwise, we attach it to the "after" list. Dummy head nodes simplify the logic by avoiding special cases for inserting the first node into either list. After the partition loop, we terminate the "after" list by setting its tail’s next to null (to mark the end of the final list). Then we link the two lists by connecting \`before\` list’s tail to \`afterHead.next\` (which is the start of the "after" list). Finally, \`beforeHead.next\` gives the head of the partitioned list. This algorithm runs in O(n) time and uses O(1) extra space (aside from the dummy nodes).`
      }
    },
    {
      title: 'Merging and Sorting',
      description: `Another frequent pattern is merging multiple linked lists, especially when they are sorted. A quintessential example is **Merge Two Sorted Lists**:contentReference[oaicite:12]{index=12}: by using two pointers (one for each list), you compare the current nodes and attach the smaller one to the result, advancing that pointer. This pattern extends to merging k sorted lists (using a min-heap or iterative merging) and is also used in **sorting a linked list** via merge sort (recursively split the list and then merge sorted halves, since linked lists are well-suited for merge sort). The time complexity of merging two lists is O(n + m) for lists of lengths n and m. **Sorting a linked list** using merge sort takes O(n log n) time and O(log n) space (for recursion). Another related problem is **flattening** a linked list: if you have multiple levels (for example, each node has a child pointer to another list), you can flatten it by merging those sublists (either recursively or using an iterative approach). In all such problems, recognizing that the list is already sorted (or needs to be sorted) and that you can combine solutions using a merge procedure is the key insight.`,
      exampleProblems: [
        'Merge Two Sorted Lists (LeetCode 21)',
        'Merge k Sorted Lists (LeetCode 23)',
        'Sort List (LeetCode 148)',
        'Flattening a Linked List (GeeksforGeeks)'
      ],
      solution: {
        problemTitle: 'Merge Two Sorted Lists (LeetCode 21)',
        code: `
public ListNode mergeTwoLists(ListNode list1, ListNode list2) {
    ListNode dummy = new ListNode(0);
    ListNode tail = dummy;
    ListNode a = list1;
    ListNode b = list2;
    // Traverse both lists and merge them in sorted order
    while (a != null && b != null) {
        if (a.val <= b.val) {
            tail.next = a;
            a = a.next;
        } else {
            tail.next = b;
            b = b.next;
        }
        tail = tail.next;
    }
    // Attach the remaining part (if any) of the non-exhausted list
    if (a != null) {
        tail.next = a;
    } else if (b != null) {
        tail.next = b;
    }
    return dummy.next;
}
        `,
        explanation: `This is a classic two-pointer merge routine for sorted lists. We maintain a \`tail\` pointer for the resulting list, and pointers \`a\` and \`b\` for traversing \`list1\` and \`list2\` respectively. At each step, we compare \`a.val\` and \`b.val\`, choose the smaller value, and append that node to the result, advancing the corresponding pointer. This process continues until one list is exhausted, at which point we attach the remaining nodes from the other list (since they are already sorted). Using a dummy head node simplifies the code by handling the head of the result list consistently. Merging two lists is an O(n + m) operation for lists of length n and m:contentReference[oaicite:13]{index=13}. This merging logic is not only useful on its own, but also forms the backbone of a merge sort algorithm on linked lists (where the list is recursively divided and then merged), and it can be adapted to flatten multiple sorted lists by merging them one by one or with a priority queue.`
      }
    },
    {
      title: 'Linked List as Numbers (Arithmetic Operations)',
      description: `Linked lists are often used to represent large numbers where each node contains a single digit. In these problems, such as **Add Two Numbers**, you simulate digit-by-digit arithmetic with a carry, just as you would on paper. If the digits are stored in reverse order (least significant digit at the head, as in LeetCode 2), the addition can proceed from head to tail straightforwardly:contentReference[oaicite:14]{index=14}. If they are stored in forward order (most significant digit at head, e.g. LeetCode 445 or the "Plus One" problem), you may need to handle the carry propagation from the end: common approaches include reversing the list, using a stack, or using recursion to add from the least significant side. Key points to recognize: if you're asked to add or increment numbers in linked list format, you'll be managing carries and possibly different list lengths. Ensure to handle the case where one list is shorter than the other (treat missing digits as 0):contentReference[oaicite:15]{index=15}, and remember to add a final carry node if needed. These problems typically run in O(n) time (where n is the length of the longer list) and O(1) space (not counting the output list).`,
      exampleProblems: [
        'Add Two Numbers (LeetCode 2)',
        'Add Two Numbers II (LeetCode 445)',
        'Plus One Linked List (LeetCode 369)'
      ],
      solution: {
        problemTitle: 'Add Two Numbers (LeetCode 2)',
        code: `
public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
    ListNode dummy = new ListNode(0);
    ListNode curr = dummy;
    int carry = 0;
    ListNode a = l1;
    ListNode b = l2;
    // Loop through lists until both are exhausted and no carry remains
    while (a != null || b != null || carry != 0) {
        int x = (a != null ? a.val : 0);
        int y = (b != null ? b.val : 0);
        int sum = x + y + carry;
        carry = sum / 10;
        // Create a new node with the digit (sum mod 10)
        curr.next = new ListNode(sum % 10);
        curr = curr.next;
        // Move to the next nodes in the input lists
        if (a != null) a = a.next;
        if (b != null) b = b.next;
    }
    return dummy.next;
}
        `,
        explanation: `We use two pointers (\`a\` for \`l1\` and \`b\` for \`l2\`) to traverse the two input numbers, and an integer \`carry\` to keep track of carry-over. On each iteration, we take the current digit from each list (using 0 if we've reached the end of one list) and add them along with the carry:contentReference[oaicite:16]{index=16}. The result's ones place becomes the value of a new node (using \`sum % 10\`), and \`carry\` is updated to \`sum / 10\` (0 or 1, since we’re adding single digits). We then advance in each list. The loop continues as long as there are digits left in either list or a non-zero carry remains. By using a dummy head, we simplify the code for building the result list. In the end, the dummy’s next pointer points to the head of the new linked list representing the sum. This runs in O(max(m, n)) time for input lengths m and n. (For the variant where digits are stored in forward order, one would typically reverse the lists first or use a stack/recursion to handle the addition from the least significant side.)`
      }
    },
    {
      title: 'Advanced Pointers & Structures',
      description: `Some linked list problems involve extra pointers or more complex structures. One example is a list where each node has a **random pointer** (pointing to an arbitrary node or null). Copying such a list (e.g., **Copy List with Random Pointer**) efficiently requires handling these random pointers. A common optimal approach is to interweave the original and copied nodes in one list, then separate them, which avoids extra space for a hash map:contentReference[oaicite:17]{index=17}:contentReference[oaicite:18]{index=18}. Another example is a **multilevel linked list** where nodes may have a child list (as in Flatten a Multilevel Doubly Linked List); you can flatten it using a depth-first traversal (recursively or with a stack) to connect all nodes into a single list:contentReference[oaicite:19]{index=19}. We also have **skip lists**, an advanced probabilistic structure: essentially a hierarchy of linked lists where higher levels skip over nodes in lower levels, achieving average O(log n) search time:contentReference[oaicite:20]{index=20}. (LeetCode's "Design Skiplist" problem is an example where you implement such a structure.) In design problems like **LRU Cache**, a doubly linked list is used alongside a hash map to allow O(1) removals and insertions. When you see a problem with multiple pointers (like next, random, child) or a need for complex traversal, think about using additional data structures (e.g., hash maps to map original nodes to copies) or algorithms like DFS to manage the pointers. The key is carefully managing pointers so that you preserve the structure and avoid losing references.`,
      exampleProblems: [
        'Copy List with Random Pointer (LeetCode 138)',
        'Flatten a Multilevel Doubly Linked List (LeetCode 430)',
        'Design Skiplist (LeetCode 1206)',
        'LRU Cache (LeetCode 146)'
      ],
      solution: {
        problemTitle: 'Copy List with Random Pointer (LeetCode 138)',
        code: `
class Node {
    int val;
    Node next;
    Node random;
    Node(int x) { this.val = x; }
}
public Node copyRandomList(Node head) {
    if (head == null) return null;
    // 1. Insert copied node after each original node
    Node curr = head;
    while (curr != null) {
        Node copy = new Node(curr.val);
        copy.next = curr.next;
        curr.next = copy;
        curr = copy.next;
    }
    // 2. Assign random pointers for the copies
    curr = head;
    while (curr != null) {
        if (curr.random != null) {
            curr.next.random = curr.random.next;
        }
        curr = curr.next.next;
    }
    // 3. Detach the copy list from the original list
    curr = head;
    Node dummyHead = new Node(0);
    Node copyCurr = dummyHead;
    while (curr != null) {
        copyCurr.next = curr.next;        // take the copy
        curr.next = curr.next.next;       // restore original list
        curr = curr.next;                 // move to next original node
        copyCurr = copyCurr.next;         // advance in the copied list
    }
    return dummyHead.next;
}
        `,
        explanation: `This solution performs a deep copy in O(n) time and O(1) extra space by **interweaving** the original and cloned nodes. In the first pass, we create a copy of each node and insert it immediately after the original node in the list:contentReference[oaicite:21]{index=21}. After this, for every original node \`curr\`, \`curr.next\` is the cloned node. In the second pass, we set the random pointer of each cloned node: if an original node \`curr\` has a random pointer to \`curr.random\`, then \`curr.next.random\` (the copy's random) should point to \`curr.random.next\` (the copy of the random target):contentReference[oaicite:22]{index=22}. Finally, we restore the original list and extract the cloned list in one pass: we separate the intertwined lists by fixing the \`next\` pointers. The dummy head \`dummyHead\` is used to easily build the new list. The result is a completely separate cloned linked list with the same structure as the original. (An alternative approach uses a hash map to store a mapping from original nodes to new nodes:contentReference[oaicite:23]{index=23}, then assigns pointers in a second pass — simpler to implement, but uses O(n) extra space.)`
      }
    }
  ]
};
