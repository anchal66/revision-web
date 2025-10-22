export const data = {
  title: 'Trees',
  description: 'Trees are hierarchical data structures. Binary trees and Binary Search Trees (BSTs) are fundamental variants that test recursion, traversal, and property validation.',
  patterns:,
      solution: {
        problemTitle: 'Binary Tree Level Order Traversal (BFS)',
        code: `import java.util.*;

class Solution {
    public List<List<Integer>> levelOrder(TreeNode root) {
        List<List<Integer>> result = new ArrayList<>();
        if (root == null) {
            return result;
        }

        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root);

        while (!queue.isEmpty()) {
            int levelSize = queue.size();
            List<Integer> currentLevel = new ArrayList<>();

            for (int i = 0; i < levelSize; i++) {
                TreeNode currentNode = queue.poll();
                currentLevel.add(currentNode.val);

                if (currentNode.left!= null) {
                    queue.offer(currentNode.left);
                }
                if (currentNode.right!= null) {
                    queue.offer(currentNode.right);
                }
            }
            result.add(currentLevel);
        }
        return result;
    }
}
// Time Complexity: O(n)
// Space Complexity: O(w) where w is the max width of the tree`,
        explanation: 'This BFS solution uses a queue to process nodes level by level. The key is capturing the queue size at the start of each level to ensure the inner loop only processes nodes belonging to that specific level.'
      }
    },
    {
      title: 'Lowest Common Ancestor (LCA)',
      description: 'The LCA of two nodes is the deepest node that has both as descendants. The approach differs for a general binary tree versus a more structured Binary Search Tree.',
      exampleProblems:,
      solution: {
        problemTitle: 'Lowest Common Ancestor of a Binary Tree',
        code: `class Solution {
    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        // Base case: if root is null, or is one of the target nodes.
        if (root == null |

| root == p |
| root == q) {
            return root;
        }

        // Recurse on left and right subtrees.
        TreeNode leftSearchResult = lowestCommonAncestor(root.left, p, q);
        TreeNode rightSearchResult = lowestCommonAncestor(root.right, p, q);

        // If both children return a non-null value, the current root is the LCA.
        if (leftSearchResult!= null && rightSearchResult!= null) {
            return root;
        }

        // Otherwise, bubble up the non-null result from one of the children.
        return leftSearchResult!= null? leftSearchResult : rightSearchResult;
    }
}
// Time Complexity: O(n)
// Space Complexity: O(h) where h is the tree height`,
        explanation: 'This recursive DFS solution elegantly finds the LCA. It returns a node if it finds `p` or `q`. The first node to receive non-null results from both its left and right children is the LCA, as it is the split point.'
      }
    }
  ]
};