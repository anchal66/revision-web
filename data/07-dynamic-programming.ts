export const data = {
  title: 'Dynamic Programming',
  description: 'Dynamic Programming (DP) breaks a problem into overlapping subproblems, each solved only once to avoid redundant work:contentReference[oaicite:0]{index=0}:contentReference[oaicite:1]{index=1}. It relies on two properties: *optimal substructure* (optimal solutions built from sub-solutions) and *overlapping subproblems*:contentReference[oaicite:2]{index=2}:contentReference[oaicite:3]{index=3}. There are two main implementation approaches: tabulation (bottom-up) and memoization (top-down). Tabulation iteratively fills a DP table from base cases:contentReference[oaicite:4]{index=4}, while memoization uses recursion with caching:contentReference[oaicite:5]{index=5}.',
  patterns: [
    {
      title: '0-1 Knapsack Pattern',
      description: 'Each item can be either **included** or **excluded** (0 or 1) in the knapsack. The DP state `dp[i][c]` = best value using first `i` items with capacity `c`. The recurrence is `dp[i][c] = max(dp[i-1][c], v[i-1] + dp[i-1][c - w[i-1]])` when the `i`th item (weight `w[i-1]`, value `v[i-1]`) fits. Base cases are `dp[0][*]=0` and `dp[*][0]=0`. This yields an O(n·W) time and O(n·W) space solution (pseudo-polynomial for knapsack):contentReference[oaicite:6]{index=6}.',
      exampleProblems: ['0-1 Knapsack', 'Subset Sum', 'Equal Sum Partition', 'Count of Subsets', 'Minimum Subset Sum Difference', 'Target Sum'],
      solutions: [
        {
          problemTitle: '0-1 Knapsack',
          code: `class Solution {
    public int solveKnapsack(int[] values, int[] weights, int capacity) {
        int n = values.length;
        int[][] dp = new int[n + 1][capacity + 1];
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= capacity; j++) {
                if (weights[i - 1] > j) {
                    dp[i][j] = dp[i - 1][j];
                } else {
                    dp[i][j] = Math.max(
                        dp[i - 1][j], 
                        values[i - 1] + dp[i - 1][j - weights[i - 1]]
                    );
                }
            }
        }
        return dp[n][capacity];
    }
}`,
          explanation: 'This bottom-up solution builds a 2D table `dp[i][j]` = max value using first `i` items and capacity `j`. If the `i`th item does not fit (weight > j), we carry over `dp[i-1][j]`. Otherwise, we take the max of including it or not. The final answer is `dp[n][capacity]`. Time complexity is O(n·W) and space is O(n·W):contentReference[oaicite:7]{index=7}.'
        },
        {
          problemTitle: 'Subset Sum',
          code: `class Solution {
    public boolean canSubsetSum(int[] arr, int target) {
        int n = arr.length;
        boolean[][] dp = new boolean[n + 1][target + 1];
        for (int i = 0; i <= n; i++) dp[i][0] = true;
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= target; j++) {
                if (arr[i - 1] > j) {
                    dp[i][j] = dp[i - 1][j];
                } else {
                    dp[i][j] = dp[i - 1][j] || dp[i - 1][j - arr[i - 1]];
                }
            }
        }
        return dp[n][target];
    }
}`,
          explanation: 'Subset Sum asks if a subset of `arr` sums to `target`. It is a special case of knapsack (values = weights). We let `dp[i][j]` = true if sum `j` is possible with first `i` elements. We initialize `dp[i][0] = true` (sum 0 is possible with empty set). Then we fill the table: exclude the current element or include it if `arr[i-1] <= j`. The answer is `dp[n][target]`. Time complexity: O(n·target).'
        },
        {
          problemTitle: 'Equal Sum Partition',
          code: `class Solution {
    public boolean canPartition(int[] nums) {
        int total = 0;
        for (int x : nums) total += x;
        if (total % 2 != 0) return false;
        int target = total / 2;
        boolean[][] dp = new boolean[nums.length + 1][target + 1];
        for (int i = 0; i <= nums.length; i++) dp[i][0] = true;
        for (int i = 1; i <= nums.length; i++) {
            for (int j = 1; j <= target; j++) {
                if (nums[i - 1] > j) {
                    dp[i][j] = dp[i - 1][j];
                } else {
                    dp[i][j] = dp[i - 1][j] || dp[i - 1][j - nums[i - 1]];
                }
            }
        }
        return dp[nums.length][target];
    }
}`,
          explanation: 'To split an array into two equal-sum subsets, check if the total sum is even. If not, partition is impossible. Otherwise set `target = total/2` and solve Subset Sum for `target`. If `dp[n][target]` is true, a valid partition exists.'
        },
        {
          problemTitle: 'Count of Subsets',
          code: `class Solution {
    public int countSubsets(int[] arr, int target) {
        int n = arr.length;
        int[][] dp = new int[n + 1][target + 1];
        for (int i = 0; i <= n; i++) dp[i][0] = 1;
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= target; j++) {
                if (arr[i - 1] > j) {
                    dp[i][j] = dp[i - 1][j];
                } else {
                    dp[i][j] = dp[i - 1][j] + dp[i - 1][j - arr[i - 1]];
                }
            }
        }
        return dp[n][target];
    }
}`,
          explanation: 'This counts the number of subsets of `arr` that sum to `target`. `dp[i][j]` stores the count of ways using first `i` elements to form sum `j`. If `arr[i-1] > j`, we cannot include it, so `dp[i][j] = dp[i-1][j]`. Otherwise, sum the ways of including it (`dp[i-1][j-arr[i-1]]`) and excluding it (`dp[i-1][j]`). Base case: `dp[i][0]=1`.'
        },
        {
          problemTitle: 'Minimum Subset Sum Difference',
          code: `class Solution {
    public int minSubsetSumDiff(int[] nums) {
        int total = 0;
        for (int x : nums) total += x;
        boolean[] dp = new boolean[total + 1];
        dp[0] = true;
        for (int x : nums) {
            for (int j = total; j >= x; j--) {
                dp[j] = dp[j] || dp[j - x];
            }
        }
        int half = total / 2;
        int minDiff = Integer.MAX_VALUE;
        for (int j = half; j >= 0; j--) {
            if (dp[j]) {
                int s1 = j;
                int s2 = total - j;
                minDiff = Math.min(minDiff, s2 - s1);
            }
        }
        return minDiff;
    }
}`,
          explanation: 'We compute all possible subset sums up to total. Then we look for the achievable sum `j` closest to `total/2`. Let `s1 = j` and `s2 = total - j`. The minimum difference is `s2 - s1`.'
        },
        {
          problemTitle: 'Target Sum',
          code: `class Solution {
    public int findTargetSumWays(int[] nums, int target) {
        int sum = 0;
        for (int x : nums) sum += x;
        if ((target + sum) % 2 != 0 || Math.abs(target) > sum) return 0;
        int newTarget = (sum + target) / 2;
        int[] dp = new int[newTarget + 1];
        dp[0] = 1;
        for (int x : nums) {
            for (int j = newTarget; j >= x; j--) {
                dp[j] += dp[j - x];
            }
        }
        return dp[newTarget];
    }
}`,
          explanation: 'To reach `target` with +/− signs, transform it: sum(P) - sum(N) = target and sum(P)+sum(N)=total. Solve for sum(P) = (total+target)/2. Count subsets summing to this `newTarget` (using DP as above). Return `dp[newTarget]` ways.'
        }
      ]
    },
    {
      title: 'Unbounded Knapsack Pattern',
      description: 'Each item can be chosen **multiple times** (infinite supply). The recurrence changes: `dp[i][c] = max(dp[i-1][c], v[i-1] + dp[i][c - w[i-1]])`. (Notice the use of `dp[i][...]` in the include case, allowing reuse of item `i`.) This still runs in O(n·W) time.',
      exampleProblems: ['Unbounded Knapsack', 'Rod Cutting', 'Coin Change (Ways)', 'Coin Change (Min Coins)', 'Maximum Ribbon Cut'],
      solutions: [
        {
          problemTitle: 'Unbounded Knapsack',
          code: `class Solution {
    public int solveUnboundedKnapsack(int[] values, int[] weights, int capacity) {
        int n = values.length;
        int[][] dp = new int[n + 1][capacity + 1];
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= capacity; j++) {
                if (weights[i - 1] > j) {
                    dp[i][j] = dp[i - 1][j];
                } else {
                    dp[i][j] = Math.max(
                        dp[i - 1][j],
                        values[i - 1] + dp[i][j - weights[i - 1]]
                    );
                }
            }
        }
        return dp[n][capacity];
    }
}`,
          explanation: 'This DP is similar to 0-1 Knapsack, but in the include case we stay on row `i` (`dp[i][..]`) to allow repeated use of item `i`. `dp[i][j]` = max value using first `i` types to achieve capacity `j`.'
        },
        {
          problemTitle: 'Rod Cutting',
          code: `class Solution {
    public int rodCutting(int[] prices, int n) {
        int[] dp = new int[n + 1];
        for (int i = 1; i <= n; i++) {
            int maxVal = 0;
            for (int j = 0; j < i; j++) {
                maxVal = Math.max(maxVal, prices[j] + dp[i - (j + 1)]);
            }
            dp[i] = maxVal;
        }
        return dp[n];
    }
}`,
          explanation: 'We treat each length `i` as an item we can use multiple times. `dp[i]` = max revenue for length `i`. Try every first cut `j+1` with price `prices[j]`, plus optimal `dp[i-(j+1)]`.'
        },
        {
          problemTitle: 'Coin Change (Ways)',
          code: `class Solution {
    public int coinChangeWays(int[] coins, int amount) {
        int[] dp = new int[amount + 1];
        dp[0] = 1;
        for (int coin : coins) {
            for (int j = coin; j <= amount; j++) {
                dp[j] += dp[j - coin];
            }
        }
        return dp[amount];
    }
}`,
          explanation: 'With infinite coins, count ways to form `amount`. `dp[j]` = ways to make sum `j`. For each coin, we add `dp[j-coin]`. This ensures combinations (not permutations).'
        },
        {
          problemTitle: 'Coin Change (Min Coins)',
          code: `class Solution {
    public int coinChangeMin(int[] coins, int amount) {
        int[] dp = new int[amount + 1];
        Arrays.fill(dp, Integer.MAX_VALUE);
        dp[0] = 0;
        for (int i = 1; i <= amount; i++) {
            for (int coin : coins) {
                if (i >= coin && dp[i - coin] != Integer.MAX_VALUE) {
                    dp[i] = Math.min(dp[i], 1 + dp[i - coin]);
                }
            }
        }
        return dp[amount] == Integer.MAX_VALUE ? -1 : dp[amount];
    }
}`,
          explanation: 'Compute minimum coins for each sum up to `amount`. Initialize `dp[0]=0`, others ∞. For each `i` and coin, update `dp[i] = min(dp[i], 1 + dp[i-coin])`. If `dp[amount]` is still ∞, no solution (return -1).'
        },
        {
          problemTitle: 'Maximum Ribbon Cut',
          code: `class Solution {
    public int maxRibbonCut(int n, int[] cuts) {
        int[] dp = new int[n + 1];
        Arrays.fill(dp, Integer.MIN_VALUE);
        dp[0] = 0;
        for (int i = 1; i <= n; i++) {
            for (int cut : cuts) {
                if (i >= cut && dp[i - cut] != Integer.MIN_VALUE) {
                    dp[i] = Math.max(dp[i], 1 + dp[i - cut]);
                }
            }
        }
        return dp[n] < 0 ? 0 : dp[n];
    }
}`,
          explanation: 'Maximize the number of pieces for length `n`. `dp[i]` = max pieces for length `i`. Initialize `dp[0]=0`, others -∞. For each `i` and each allowed `cut`, if `dp[i-cut]` is valid, set `dp[i] = max(dp[i], 1 + dp[i-cut])`.'
        }
      ]
    }
  ]
};
