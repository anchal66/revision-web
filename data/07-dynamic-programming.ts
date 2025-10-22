export const data = {
  title: 'Dynamic Programming',
  description: 'DP is an optimization technique for problems with optimal substructure and overlapping subproblems. By solving each subproblem once and storing its result, DP avoids redundant computations.',
  patterns: [
    {
      title: '1D DP (Sequence Problems)',
      description: 'The state `dp[i]` typically depends on a few preceding states like `dp[i-1]` or `dp[i-2]`. This is common in problems involving sequences or linear progression.',
      exampleProblems: ['Climbing Stairs', 'Coin Change', 'House Robber', 'Longest Increasing Subsequence'],
      solution: {
        problemTitle: 'Coin Change',
        code: `import java.util.Arrays;

class Solution {
    public int coinChange(int[] coins, int amount) {
        // dp[i] will store the minimum number of coins for amount 'i'.
        int[] dp = new int[amount + 1];
        // Initialize with a value larger than any possible answer.
        Arrays.fill(dp, amount + 1);

        // Base case: 0 coins are needed for an amount of 0.
        dp[0] = 0;

        // Tabulation: Build the dp table from amount 1 up to the target.
        for (int i = 1; i <= amount; i++) {
            for (int coin : coins) {
                if (coin <= i) {
                    // State transition:
                    dp[i] = Math.min(dp[i], dp[i - coin] + 1);
                }
            }
        }

        // If dp[amount] is still our initial large value, it's impossible.
        return dp[amount] > amount? -1 : dp[amount];
    }
}
// Time Complexity: O(S * C) where S is amount, C is number of coins
// Space Complexity: O(S)`,
        explanation: 'This bottom-up DP solution builds a table `dp` where `dp[i]` is the minimum coins for amount `i`. For each amount, it tries every coin and updates the table based on the optimal solution for the remaining amount (`dp[i - coin]`).'
      }
    },
    {
      title: '2D DP (Grid/Matrix Problems)',
      description: 'For problems involving two parameters or a 2D grid, a 2D DP table `dp[i][j]` is used. The transition often depends on adjacent cells like `dp[i-1][j]`, `dp[i][j-1]`, and `dp[i-1][j-1]`.',
      exampleProblems: ['Unique Paths', 'Longest Common Subsequence', 'Edit Distance'],
      solution: {
        problemTitle: 'Longest Common Subsequence',
        code: `class Solution {
    public int longestCommonSubsequence(String text1, String text2) {
        int m = text1.length();
        int n = text2.length();
        int[][] dp = new int[m + 1][n + 1];

        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (text1.charAt(i - 1) == text2.charAt(j - 1)) {
                    dp[i][j] = 1 + dp[i - 1][j - 1];
                } else {
                    dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
                }
            }
        }
        return dp[m][n];
    }
}
// Time Complexity: O(m * n)
// Space Complexity: O(m * n)`,
        explanation: 'This tabulation solution uses a 2D array where `dp[i][j]` stores the LCS length for `text1[0..i-1]` and `text2[0..j-1]`. If characters match, the length increases by 1 from the diagonal. If not, it takes the max from the top or left cell.'
      }
    }
  ]
};