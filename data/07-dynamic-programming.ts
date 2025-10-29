export const data = {
  title: 'Dynamic Programming',
  description: 'DP is a paradigm for solving optimization and counting problems by breaking them into overlapping subproblems. It relies on two key principles: optimal substructure (optimal solution composed of optimal subsolutions) and overlapping subproblems (redundant computations are stored and reused). We typically use a bottom-up tabulation approach (building a table from base cases) or a top-down memoized recursion (caching results of recursive calls) to efficiently compute the solution.',
  patterns: [
    {
      title: '0-1 Knapsack Pattern',
      description: 'In this pattern, each item can be taken at most once (0-1). We build a DP table dp[i][c] for the first i items and capacity c. The transition compares two choices: excluding the current item (dp[i-1][c]) or including it (value + dp[i-1][c-weight]) if it fits. We solve this with bottom-up tabulation (filling the table iteratively) or top-down memoization (recursively with caching) to compute the optimal value.',
      exampleProblems: ['0-1 Knapsack', 'Subset Sum', 'Equal Sum Partition', 'Count of Subset Sum', 'Min Subset Sum Difference', 'Target Sum'],
      solution: {
        problemTitle: '0-1 Knapsack',
        code: `class Solution {
    public int knapsack(int[] values, int[] weights, int W) {
        int n = values.length;
        // dp[i][w] = max value with first i items and capacity w
        int[][] dp = new int[n + 1][W + 1];
        for (int i = 1; i <= n; i++) {
            for (int w = 1; w <= W; w++) {
                if (weights[i - 1] <= w) {
                    dp[i][w] = Math.max(dp[i - 1][w], values[i - 1] + dp[i - 1][w - weights[i - 1]]);
                } else {
                    dp[i][w] = dp[i - 1][w];
                }
            }
        }
        return dp[n][W];
    }
}
// Time Complexity: O(N * W)`,
        explanation: 'This tabulation solution builds a 2D dp table where dp[i][w] holds the maximum value using the first i items with capacity w. For each item and capacity, if the item fits we take the max of including it (values[i-1] + dp[i-1][w-weights[i-1]]) or excluding it (dp[i-1][w]). The final answer is dp[n][W]. A top-down memoized solution would solve the same subproblems recursively with caching.'
      }
    },
    {
      title: 'Unbounded Knapsack Pattern',
      description: 'In this pattern, each item can be taken unlimited times. The DP state dp[i][c] uses items up to i with capacity c. The transition compares excluding the item (dp[i-1][c]) vs including it (value + dp[i][c-weight]) staying on the same item since it can be reused. We typically solve it with bottom-up tabulation (or top-down memoization) similarly. Common problems include rod cutting and coin change variants.',
      exampleProblems: ['Rod Cutting', 'Coin Change (Ways)', 'Coin Change (Min Coins)', 'Maximum Ribbon Cut'],
      solution: {
        problemTitle: 'Rod Cutting',
        code: `class Solution {
    public int rodCutting(int[] prices, int n) {
        // dp[i] = max value for rod of length i
        int[] dp = new int[n + 1];
        for (int i = 1; i <= n; i++) {
            for (int j = 0; j < i; j++) {
                dp[i] = Math.max(dp[i], prices[j] + dp[i - j - 1]);
            }
        }
        return dp[n];
    }
}
// Time Complexity: O(n^2)`,
        explanation: 'Here dp[i] is the maximum value for a rod of length i. We build it bottom-up: for each length i, we try all first-cut positions j (1 to i) and update dp[i] = max(dp[i], prices[j-1] + dp[i-j]). This effectively tries all ways to cut the rod. The final result is dp[n], which mirrors the unbounded knapsack logic since we can reuse cuts.'
      }
    }
  ]
};
