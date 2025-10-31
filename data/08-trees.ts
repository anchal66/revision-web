export const data = {
  title: 'Trees',
  description: 'Trees are hierarchical data structures. Binary trees and Binary Search Trees (BSTs) are fundamental variants that test recursion, traversal, and property validation.',
  patterns: [
    {
      title: 'Breadth-First Search (BFS) Traversal',
      description: 'A traversal technique that explores tree nodes level by level, using a queue. It is ideal for finding the shortest path on unweighted graphs or trees.',
      exampleProblems: ['Binary Tree Level Order Traversal', 'Binary Tree Zigzag Level Order Traversal', 'Minimum Depth of Binary Tree'],
      solutions: [{
        problemTitle: 'Binary Tree Level Order Traversal (BFS)',
        code: `import java.util.*;

class Solution {
    public List<List<Integer>> levelOrder(TreeNode root) {
        List<List<Integer>> result = new ArrayList<>();
        if (root == null) return result;

        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root);

        while (!queue.isEmpty()) {
            int levelSize = queue.size();
            List<Integer> currentLevel = new ArrayList<>();
            for (int i = 0; i < levelSize; i++) {
                TreeNode currentNode = queue.poll();
                currentLevel.add(currentNode.val);
                if (currentNode.left!= null) queue.offer(currentNode.left);
                if (currentNode.right!= null) queue.offer(currentNode.right);
            }
            result.add(currentLevel);
        }
        return result;
    }
}
// Time Complexity: O(n)
// Space Complexity: O(w) where w is the max width of the tree`,
        explanation: 'This BFS solution uses a queue to process nodes level by level. The key is capturing the queue size at the start of each level to ensure the inner loop only processes nodes belonging to that specific level.'
      }]
    },
    {
      title: 'Path Sum Variations',
      description: 'A common category of tree problems involving finding paths that sum to a target value. These are typically solved with a recursive DFS approach, passing the current path sum down through the recursive calls.',
      exampleProblems: ['Path Sum', 'Path Sum II', 'Path Sum III', 'Binary Tree Maximum Path Sum'],
      solutions: [{
        problemTitle: 'Path Sum',
        code: `class Solution {
    public boolean hasPathSum(TreeNode root, int targetSum) {
        if (root == null) {
            return false;
        }
        // Check if it's a leaf node and the sum is correct
        if (root.left == null && root.right == null && targetSum - root.val == 0) {
            return true;
        }
        // Recurse on left and right children with updated target sum
        return hasPathSum(root.left, targetSum - root.val) || hasPathSum(root.right, targetSum - root.val);
    }
}
// Time Complexity: O(n)
// Space Complexity: O(h) where h is tree height`,
        explanation: 'This recursive DFS solution checks for a root-to-leaf path. At each node, it subtracts the node\'s value from the target sum and recurses on its children. The base case is a leaf node, where it checks if the remaining sum is zero.'
      }]
    },
    {
      title: 'Lowest Common Ancestor (LCA)',
      description: 'The LCA of two nodes is the deepest node that has both as descendants. The approach differs for a general binary tree versus a more structured Binary Search Tree.',
      exampleProblems: ['Lowest Common Ancestor of a Binary Tree', 'Lowest Common Ancestor of a Binary Search Tree'],
      solutions: [{
        problemTitle: 'Lowest Common Ancestor of a Binary Tree',
        code: `class Solution {
    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        if (root == null || root == p || root == q) {
            return root;
        }
        TreeNode leftSearchResult = lowestCommonAncestor(root.left, p, q);
        TreeNode rightSearchResult = lowestCommonAncestor(root.right, p, q);

        if (leftSearchResult!= null && rightSearchResult!= null) {
            return root;
        }
        return leftSearchResult!= null? leftSearchResult : rightSearchResult;
    }
}
// Time Complexity: O(n)
// Space Complexity: O(h) where h is the tree height`,
        explanation: 'This recursive DFS solution finds the LCA by returning a node if it finds `p` or `q`. The first node to receive non-null results from both its left and right children is the LCA, as it is the split point where the paths to `p` and `q` diverge.'
      }]
    },
    {
      title: 'BST Validation and Manipulation',
      description: 'Problems involving the properties of a Binary Search Tree, such as validating its structure or performing insertions and deletions while maintaining the BST invariant.',
      exampleProblems: ['Validate Binary Search Tree', 'Insert into a Binary Search Tree', 'Delete Node in a BST'],
      solutions: [{
        problemTitle: 'Validate Binary Search Tree',
        code: `class Solution {
    public boolean isValidBST(TreeNode root) {
        return isValid(root, null, null);
    }

    private boolean isValid(TreeNode node, Integer lower, Integer upper) {
        if (node == null) {
            return true;
        }
        if (lower!= null && node.val <= lower) return false;
        if (upper!= null && node.val >= upper) return false;

        return isValid(node.left, lower, node.val) && isValid(node.right, node.val, upper);
    }
}
// Time Complexity: O(n)
// Space Complexity: O(h) where h is tree height`,
        explanation: 'A simple comparison with the immediate parent is insufficient. This robust recursive solution passes down valid range constraints (`lower` and `upper` bounds) for each node. A node is valid only if its value is within this range and its subtrees are also valid with updated bounds.'
      }]
    },
    {
      title: 'Serialization and Deserialization',
      description: 'The process of converting a tree into a string representation and vice-versa. A common method is to use a preorder traversal, storing null children with a special marker.',
      exampleProblems: ['Serialize and Deserialize Binary Tree', 'Serialize and Deserialize BST'],
      solutions: [{
        problemTitle: 'Serialize and Deserialize Binary Tree',
        code: `public class Codec {
    public String serialize(TreeNode root) {
        StringBuilder sb = new StringBuilder();
        serializeHelper(root, sb);
        return sb.toString();
    }

    private void serializeHelper(TreeNode node, StringBuilder sb) {
        if (node == null) {
            sb.append("N,");
            return;
        }
        sb.append(node.val).append(",");
        serializeHelper(node.left, sb);
        serializeHelper(node.right, sb);
    }

    public TreeNode deserialize(String data) {
        Queue<String> nodes = new LinkedList<>(Arrays.asList(data.split(",")));
        return deserializeHelper(nodes);
    }

    private TreeNode deserializeHelper(Queue<String> nodes) {
        String val = nodes.poll();
        if (val.equals("N")) {
            return null;
        }
        TreeNode node = new TreeNode(Integer.parseInt(val));
        node.left = deserializeHelper(nodes);
        node.right = deserializeHelper(nodes);
        return node;
    }
}
// Time Complexity: O(n) for both operations
// Space Complexity: O(n) for both operations`,
        explanation: 'This solution uses a preorder DFS traversal. `serialize` builds a string with "N" for null nodes. `deserialize` uses a queue of the split string values to reconstruct the tree in the same preorder fashion, ensuring the structure is perfectly preserved.'
      }]
    }
  ]
};