export const data = {
  title: 'Dynamic Programming Part 3',
  description: 'Part 3 covers advanced dynamic programming topics including problems that involve partitioning (divide-and-conquer strategies with DP), as well as DP applied to trees and grid-based problems. These are typically more complex and involve multiple dimensions or creative state definitions, solidifying a deep understanding of DP techniques.',
  patterns: [
    {
      title: 'Matrix Chain Multiplication & Partition DP',
      description: 'This pattern involves breaking problems into two parts and trying all possible partition points. Matrix Chain Multiplication (MCM) is a classic example: it determines the most efficient way to parenthesize matrix multiplications. The recursive solution tries every split point, and DP is used to avoid recomputation. Many hard problems follow this pattern, such as minimizing palindrome partition cuts, evaluating boolean expressions with different parenthesizations, scrambled string checks, and the egg dropping problem.',
      exampleProblems: ['Matrix Chain Multiplication', 'Palindrome Partitioning (Minimum Cuts)', 'Boolean Parenthesization', 'Scrambled String', 'Egg Dropping Problem'],
      solution: {
        problemTitle: 'Matrix Chain Multiplication',
        code: `class Solution {
    public int matrixChainMultiplication(int[] dimensions) {
        int n = dimensions.length;
        // dp[i][j] will hold the minimum cost to multiply matrices from i to j (1-indexed for convenience)
        int[][] dp = new int[n][n];
        // cost is zero when multiplying one matrix (i == j)
        for (int i = 1; i < n; i++) {
            dp[i][i] = 0;
        }
        // L is chain length (number of matrices in subproblem)
        for (int L = 2; L < n; L++) {
            for (int i = 1; i <= n - L; i++) {
                int j = i + L - 1;
                dp[i][j] = Integer.MAX_VALUE;
                for (int k = i; k < j; k++) {
                    int cost = dp[i][k] + dp[k+1][j] + dimensions[i-1] * dimensions[k] * dimensions[j];
                    dp[i][j] = Math.min(dp[i][j], cost);
                }
            }
        }
        // result for full chain from matrix 1 to matrix n-1
        return dp[1][n-1];
    }
}
// Time Complexity: O(n^3)
// Space Complexity: O(n^2)`,
        explanation: 'This solution computes the minimum multiplication cost for a chain of matrices using the Matrix Chain Multiplication DP approach. Using `dimensions` (where matrix i has dimensions `dimensions[i-1] x dimensions[i]`), it fills a table `dp[i][j]` for the minimum cost of multiplying matrices i through j. The code tries every possible split k between i and j, using the costs of solving subchains [i..k] and [k+1..j], plus the cost of multiplying the two results. By building up for chains of length 2 to n-1, the algorithm finds the optimal cost for the full chain. Similar partitioning strategies are applied in Palindrome Partitioning (where splits are at cut positions in a string), Boolean Parenthesization (splitting expression at operators), Scrambled String, and Egg Dropping (where splits represent dropping an egg from a floor).'
      }
    },
    {
      title: 'Dynamic Programming on Trees',
      description: 'Tree DP problems use recursion (post-order traversal) to solve subtrees and combine their results. Since each subtree can be considered a subproblem, storing or computing values for each node\'s children allows us to solve problems such as finding diameters, path sums, or other tree-based calculations. The recursion ensures overlapping computations are avoided by naturally dividing the problem at each node.',
      exampleProblems: ['Diameter of Binary Tree', 'Maximum Path Sum in Binary Tree'],
      solution: {
        problemTitle: 'Diameter of Binary Tree',
        code: `class Solution {
    private int diameter;
    public int diameterOfBinaryTree(TreeNode root) {
        diameter = 0;
        height(root);
        return diameter;
    }
    private int height(TreeNode node) {
        if (node == null) return 0;
        int leftH = height(node.left);
        int rightH = height(node.right);
        // update the diameter at this node 
        diameter = Math.max(diameter, leftH + rightH);
        // return height of this subtree
        return Math.max(leftH, rightH) + 1;
    }
}
// Time Complexity: O(n)
// Space Complexity: O(n)`,
        explanation: 'This solution uses a DFS-based dynamic programming approach on a binary tree to compute its diameter (longest path between any two nodes). The helper function returns the height of a subtree, and while unwinding the recursion it updates the global `diameter` using the sum of the left and right subtree heights (this represents the longest path through that node). By computing heights for each subtree only once, we effectively use DP on the tree structure. Similarly, a maximum path sum problem would accumulate path sums and use a global tracker in a comparable manner.'
      }
    },
    {
      title: 'Dynamic Programming on Grids',
      description: 'Grid-based DP applies when solving problems on a 2D grid or matrix, where each cell\'s solution can be built from neighboring cells (typically from the top or left). Classic examples include counting paths or finding minimum costs to reach a cell. The state usually involves coordinates, and transitions rely on moves (like from left to right, or top to bottom).',
      exampleProblems: ['Unique Paths', 'Minimum Path Sum'],
      solution: {
        problemTitle: 'Unique Paths (Grid Traversal)',
        code: `class Solution {
    public int uniquePaths(int m, int n) {
        int[][] dp = new int[m][n];
        // first row and first column are all 1s (only one way straight across or down)
        for (int i = 0; i < m; i++) {
            dp[i][0] = 1;
        }
        for (int j = 0; j < n; j++) {
            dp[0][j] = 1;
        }
        for (int i = 1; i < m; i++) {
            for (int j = 1; j < n; j++) {
                dp[i][j] = dp[i-1][j] + dp[i][j-1];
            }
        }
        return dp[m-1][n-1];
    }
}
// Time Complexity: O(m * n)
// Space Complexity: O(m * n)`,
        explanation: 'This solution calculates the number of distinct paths in an m x n grid moving only down or right. It uses a DP table where `dp[i][j]` represents the number of ways to reach cell (i, j) from the start (0,0). The recurrence `dp[i][j] = dp[i-1][j] + dp[i][j-1]` comes from the fact that one can arrive at (i, j) either from above or from the left. The first row and first column are initialized to 1 because there is exactly one way to reach any cell in the top row (all moves right) or leftmost column (all moves down). This grid DP pattern also applies to computing minimum path sums (with addition instead of count) or other grid navigation problems.'
      }
    }
  ]
};
