export const data = {
  title: 'Stacks & Queues',
  description: 'Stacks (LIFO) and Queues (FIFO) are fundamental linear data structures. In advanced problems, they are not just used for storage but as mechanisms to enforce order and process elements in specific sequences.',
  patterns: [
    {
      title: 'Monotonic Stack',
      description: 'A stack where elements are always in a sorted order (increasing or decreasing). It is highly effective for problems involving finding the next/previous greater/smaller element.',
      exampleProblems: ['Daily Temperatures', 'Next Greater Element I/II', 'Largest Rectangle in Histogram'],
      solution: {
        problemTitle: 'Daily Temperatures',
        code: `import java.util.Stack;

class Solution {
    public int[] dailyTemperatures(int[] temperatures) {
        int n = temperatures.length;
        int result = new int[n];
        // The stack will store indices of the temperatures array.
        // It is maintained in a monotonically decreasing order of temperatures.
        Stack<Integer> stack = new Stack<>();

        for (int i = 0; i < n; i++) {
            // While the stack is not empty and the current temperature is warmer than
            // the temperature at the index on top of the stack...
            while (!stack.isEmpty() && temperatures[i] > temperatures[stack.peek()]) {
                //...we have found a warmer day for the day at stack.peek().
                int prevIndex = stack.pop();
                // Calculate the number of waiting days.
                result[prevIndex] = i - prevIndex;
            }
            // Push the current index onto the stack.
            stack.push(i);
        }
        return result;
    }
}
// Time Complexity: O(n)
// Space Complexity: O(n)`,
        explanation: 'This solution uses a monotonic (decreasing) stack to store the indices of days. When a warmer day is found, indices are popped from the stack, and the waiting days are calculated. This ensures each index is processed in linear time.'
      }
    },
    {
      title: 'Queue for Level-Order Traversal (BFS)',
      description: 'A queue is the cornerstone of the Breadth-First Search (BFS) algorithm. In trees and graphs, a queue is used to explore nodes level by level, which is fundamental for finding the shortest path in unweighted graphs.',
      exampleProblems: ['Binary Tree Level Order Traversal', 'Rotting Oranges', 'Minimum Depth of Binary Tree'],
      solution: {
        problemTitle: 'Generic BFS Traversal with a Queue',
        code: `import java.util.*;

class GraphTraversal {
    public void bfs(int startNode, int numNodes, Map<Integer, List<Integer>> adj) {
        Queue<Integer> queue = new LinkedList<>();
        boolean visited = new boolean[numNodes];

        queue.offer(startNode);
        visited[startNode] = true;

        while (!queue.isEmpty()) {
            int node = queue.poll();
            // Process the node (e.g., print it)
            System.out.print(node + " ");

            for (int neighbor : adj.getOrDefault(node, new ArrayList<>())) {
                if (!visited[neighbor]) {
                    visited[neighbor] = true;
                    queue.offer(neighbor);
                }
            }
        }
    }
}
// Time Complexity: O(V + E) where V is vertices, E is edges
// Space Complexity: O(V)`,
        explanation: 'This generic BFS implementation uses a Queue to store nodes to visit next and a `visited` array to prevent cycles. The FIFO nature of the queue ensures that nodes are processed level by level.'
      }
    }
  ]
};