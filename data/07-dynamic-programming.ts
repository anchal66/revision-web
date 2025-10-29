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
        return dp[amount] > amount ? -1 : dp[amount];
    }
}
// Time Complexity: O(S * C) where S is amount, C is number of coins
// Space Complexity: O(S)`,
        explanation: 'This bottom-up DP solution builds a table `dp` where `dp[i]` is the minimum coins for amount `i`. For each amount, it tries every coin and updates the table based on the optimal solution for the remaining amount (`dp[i - coin]`).'
      }
    },
    {
      title: '2D DP (Grid/Matrix or Two-Sequence Problems)',
      description: 'For problems involving two parameters, two sequences, or a 2D grid, a 2D DP table `dp[i][j]` is used. The transition often depends on adjacent cells like `dp[i-1][j]`, `dp[i][j-1]`, and `dp[i-1][j-1]`.',
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
    },
    {
      title: '0-1 Knapsack Pattern',
      description: 'A fundamental DP pattern where for each item, you have two choices: include it or exclude it. This binary choice structure is the core of many DP problems.',
      exampleProblems: ['0-1 Knapsack', 'Partition Equal Subset Sum', 'Target Sum'],
      solution: {
        problemTitle: '0-1 Knapsack',
        explanation: 'Given weights and values of n items, put these items in a knapsack of capacity W to get the maximum total value. For each item, we have two choices: include it (if its weight is within the remaining capacity) or exclude it. We take the maximum value from these two choices.',
        code: `// --- 0-1 Knapsack ---

// **Top-Down (Memoization) Solution:**
class KnapsackMemoization {
    public int solve(int[] weights, int[] values, int capacity) {
        int n = weights.length;
        int[][] memo = new int[n][capacity + 1];
        for (int[] row : memo) {
            java.util.Arrays.fill(row, -1);
        }
        return knapSack(n - 1, capacity, weights, values, memo);
    }

    private int knapSack(int index, int capacity, int[] weights, int[] values, int[][] memo) {
        if (index < 0 || capacity == 0) {
            return 0;
        }
        if (memo[index][capacity] != -1) {
            return memo[index][capacity];
        }

        int exclude = knapSack(index - 1, capacity, weights, values, memo);
        int include = 0;
        if (weights[index] <= capacity) {
            include = values[index] + knapSack(index - 1, capacity - weights[index], weights, values, memo);
        }

        return memo[index][capacity] = Math.max(exclude, include);
    }
}
// Time: O(N*W), Space: O(N*W) + O(N)

// **Bottom-Up (Tabulation) Solution:**
class KnapsackTabulation {
    public int solve(int[] weights, int[] values, int capacity) {
        int n = weights.length;
        int[][] dp = new int[n + 1][capacity + 1];

        for (int i = 1; i <= n; i++) {
            for (int w = 1; w <= capacity; w++) {
                int currentWeight = weights[i - 1];
                int currentValue = values[i - 1];

                dp[i][w] = dp[i - 1][w]; // Exclude

                if (currentWeight <= w) { // Include
                    dp[i][w] = Math.max(dp[i][w], currentValue + dp[i - 1][w - currentWeight]);
                }
            }
        }
        return dp[n][capacity];
    }
}
// Time: O(N*W), Space: O(N*W)`
      }
    },
    {
      title: 'Knapsack Variant: Subset Sum',
      description: 'This is a variation of 0-1 Knapsack. Given a set of non-negative integers and a value `sum`, determine if there is a subset of the given set with a sum equal to the given `sum`. Here, the `weights` of the items are the numbers in the array, and the `values` are the same as the weights. The "knapsack capacity" is the target `sum`. The goal is not to maximize value, but to see if a value equal to `sum` can be achieved.',
      exampleProblems: ['Partition Equal Subset Sum'],
      solution: {
        problemTitle: 'Subset Sum',
        explanation: 'We need to determine if a subset with a target sum exists. The recursive function `canPartition(index, target)` will return `true` if a subset summing to `target` can be formed from elements `0` to `index`. For each element, we can either include it (and reduce the target) or exclude it. If either choice leads to a solution, we return `true`.',
        code: `// --- Subset Sum ---

// **Top-Down (Memoization) Solution:**
class SubsetSumMemoization {
    public boolean canPartition(int[] nums, int sum) {
        int n = nums.length;
        int[][] memo = new int[n][sum + 1];
        for (int[] row : memo) {
            java.util.Arrays.fill(row, -1);
        }
        return solve(n - 1, sum, nums, memo);
    }

    private boolean solve(int index, int target, int[] nums, int[][] memo) {
        if (target == 0) return true;
        if (index < 0 || target < 0) return false;

        if (memo[index][target] != -1) {
            return memo[index][target] == 1;
        }

        boolean exclude = solve(index - 1, target, nums, memo);
        boolean include = solve(index - 1, target - nums[index], nums, memo);

        memo[index][target] = (exclude || include) ? 1 : 0;
        return exclude || include;
    }
}
// Time Complexity: O(N * Sum)
// Space Complexity: O(N * Sum) + O(N)

// **Bottom-Up (Tabulation) Solution:**
class SubsetSumTabulation {
    public boolean canPartition(int[] nums, int sum) {
        int n = nums.length;
        boolean[][] dp = new boolean[n + 1][sum + 1];

        for (int i = 0; i <= n; i++) {
            dp[i][0] = true;
        }

        for (int i = 1; i <= n; i++) {
            for (int s = 1; s <= sum; s++) {
                dp[i][s] = dp[i - 1][s];
                if (nums[i - 1] <= s) {
                    dp[i][s] = dp[i][s] || dp[i - 1][s - nums[i - 1]];
                }
            }
        }
        return dp[n][sum];
    }
}
// Time Complexity: O(N * Sum)
// Space Complexity: O(N * Sum)`
      }
    },
    {
      title: 'Knapsack Variant: Count of Subset Sum',
      description: 'Instead of returning a boolean, this variant asks for the *number* of subsets that sum up to a given target. The logic is very similar to the Subset Sum problem. The recursive function will return the count of ways. The choice of "include" and "exclude" are no longer combined with an OR (`||`), but with an addition (`+`) to count all possible ways.',
      exampleProblems: ['Target Sum'],
      solution: {
        problemTitle: 'Count of Subset Sum',
        explanation: 'The state transition changes from boolean logic to arithmetic. `count(index, target)` is the sum of `count(index-1, target)` (excluding the current element) and `count(index-1, target - nums[index])` (including the current element).',
        code: `// --- Count of Subset Sum ---

// **Bottom-Up (Tabulation) Solution:**
class CountSubsetSumTabulation {
    public int countSubsets(int[] nums, int sum) {
        int n = nums.length;
        int[][] dp = new int[n + 1][sum + 1];

        // A sum of 0 is possible in one way (empty set).
        for (int i = 0; i <= n; i++) {
            dp[i][0] = 1;
        }

        for (int i = 1; i <= n; i++) {
            for (int s = 0; s <= sum; s++) { // s=0 is needed for cases with 0-value items
                // Exclude the current number.
                dp[i][s] = dp[i - 1][s];

                // Include the current number (if it fits).
                if (nums[i - 1] <= s) {
                    dp[i][s] += dp[i - 1][s - nums[i - 1]];
                }
            }
        }
        return dp[n][sum];
    }
}
// Time Complexity: O(N * Sum)
// Space Complexity: O(N * Sum)`
      }
    }
  ]
};