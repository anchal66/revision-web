export const data = {
  title: 'Dynamic Programming Part 1',
  description: 'Dynamic Programming (DP) is a technique to optimize recursive solutions by storing intermediate results to avoid repeated work. It is applied to problems with overlapping subproblems and optimal substructure, meaning solutions to subproblems can be reused and combined for the overall solution. Part 1 covers fundamental DP patterns including basic recurrences and knapsack problems.',
  patterns: [
    {
      title: 'Basic Recurrence (Fibonacci)',
      description: 'This pattern introduces DP with simple problems like computing Fibonacci numbers or climbing stairs. A naive recursive solution recalculates many subproblems, leading to exponential time. DP (via memoization or bottom-up tabulation) saves results and runs in linear time.',
      exampleProblems: ['Nth Fibonacci Number', 'Climbing Stairs'],
      solution: {
        problemTitle: 'Climbing Stairs',
        code: `class Solution {
    public int climbStairs(int n) {
        if (n <= 2) {
            return n;
        }
        int[] dp = new int[n + 1];
        dp[1] = 1;
        dp[2] = 2;
        for (int i = 3; i <= n; i++) {
            dp[i] = dp[i - 1] + dp[i - 2];
        }
        return dp[n];
    }
}
// Time Complexity: O(n)
// Space Complexity: O(n)`,
        explanation: 'This solution uses a bottom-up DP approach for the climbing stairs problem. Instead of naive recursion (which would recompute subproblems), it builds up an array `dp` where each entry represents the number of ways to reach that step. The recurrence `dp[i] = dp[i-1] + dp[i-2]` mirrors the fact that one can arrive at step `i` from either step `i-1` or `i-2`. By filling this table iteratively, we compute the result in O(n) time without redundant calculations.'
      }
    },
    {
      title: '0/1 Knapsack Pattern',
      description: 'Many subset selection problems follow the 0/1 Knapsack pattern, where each item (or choice) can be taken or not taken (binary decision). Using DP, we can determine the optimal combination to achieve a target (like maximizing value within weight capacity or finding a subset sum). Overlapping subproblems are solved by filling a DP table of subproblem solutions (e.g., solutions for first i items and various weight capacities).',
      exampleProblems: ['0/1 Knapsack Problem', 'Subset Sum Problem', 'Equal Sum Partition', 'Count of Subsets with Given Sum', 'Minimum Subset Sum Difference', 'Count of Subsets with Given Difference', 'Target Sum'],
      solution: {
        problemTitle: '0/1 Knapsack Problem',
        code: `class Solution {
    public int knapSack(int[] weights, int[] values, int capacity) {
        int n = weights.length;
        // dp[i][w] will hold the max value for using up to i-th item with capacity w
        int[][] dp = new int[n + 1][capacity + 1];
        // Initialize dp[0][w] = 0 for all w (no items yields 0 value)
        // Initialize dp[i][0] = 0 for all i (zero capacity yields 0 value)
        for (int i = 1; i <= n; i++) {
            for (int w = 1; w <= capacity; w++) {
                if (weights[i - 1] <= w) {
                    // include the item and see if it gives more value than excluding it
                    dp[i][w] = Math.max(values[i - 1] + dp[i - 1][w - weights[i - 1]], 
                                        dp[i - 1][w]);
                } else {
                    // can't include the item (exceeds capacity)
                    dp[i][w] = dp[i - 1][w];
                }
            }
        }
        return dp[n][capacity];
    }
}
// Time Complexity: O(n * capacity)
// Space Complexity: O(n * capacity)`,
        explanation: 'This bottom-up DP solution uses a 2D table where `dp[i][w]` represents the best (maximum) value achievable using the first `i` items within weight `w`. The transition considers either including the i-th item (if it fits, adding its value and using the solution for the remaining capacity) or excluding it. The table is built iteratively, and `dp[n][capacity]` yields the optimal knapsack value. Variations like subset-sum or partition problems use a similar DP table setup but often track booleans or counts instead of max values.'
      }
    },
    {
      title: 'Unbounded Knapsack Pattern',
      description: 'In unbounded knapsack problems, you can reuse items infinitely. This pattern covers scenarios like coin change or rod cutting, where each item/choice can be picked multiple times. The DP approach usually iterates over capacities and considers the effect of taking each item repeatedly, leading to solutions for maximizing or minimizing objectives under given constraints.',
      exampleProblems: ['Unbounded Knapsack Problem', 'Rod Cutting', 'Coin Change (Max Ways)', 'Coin Change (Min Coins)'],
      solution: {
        problemTitle: 'Coin Change (Minimum Coins)',
        code: `import java.util.Arrays;
class Solution {
    public int coinChange(int[] coins, int amount) {
        int max = amount + 1;
        int[] dp = new int[amount + 1];
        Arrays.fill(dp, max);
        dp[0] = 0;
        for (int coin : coins) {
            for (int x = coin; x <= amount; x++) {
                dp[x] = Math.min(dp[x], 1 + dp[x - coin]);
            }
        }
        return dp[amount] == max ? -1 : dp[amount];
    }
}
// Time Complexity: O(amount * number_of_coins)
// Space Complexity: O(amount)`,
        explanation: 'This solution finds the minimum number of coins needed to make up a given amount. It employs an unbounded knapsack approach using a one-dimensional DP array where `dp[x]` represents the minimum coins to achieve amount `x`. By iterating through coin denominations and then through possible amounts, the algorithm allows unlimited use of each coin (since we don’t reset per coin iteration). The result is built up to `dp[amount]`. If `dp[amount]` remains an initialized large value, it means the amount cannot be formed by any combination of coins (and -1 is returned).'
      }
    }
  ]
};
