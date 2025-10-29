export const data = {
  title: 'Dynamic Programming',
  description: 'DP is an optimization technique for problems with optimal substructure and overlapping subproblems. By solving each subproblem once and storing its result, DP avoids redundant computations.',
  patterns: [
    {
      title: '0/1 Knapsack',
      description: 'In this pattern, for each item, we have two choices: either include it in the knapsack or exclude it. We cannot include a fractional part of an item or include an item multiple times. This leads to a decision at each step, forming the basis of many optimization problems.',
      problems: [
        {
          problemTitle: '0/1 Knapsack',
          explanation: 'Given the weights and profits of N items, put these items in a knapsack of capacity C to get the maximum total profit. In other words, given two integer arrays `profits[0..N-1]` and `weights[0..N-1]` representing profits and weights associated with N items, find a subset of these items that will give the maximum profit and whose total weight is not more than a given capacity C.',
          memoizationSolution: {
            explanation: 'The recursive solution with memoization uses a 2D array `dp[i][c]` to store the maximum profit for capacity `c` using items from index `i` to `n-1`. This top-down approach avoids re-computation of overlapping subproblems.',
            code: `class Knapsack {
    // Memoization (Top-Down)
    public int solveKnapsack(int[] profits, int[] weights, int capacity) {
        int n = profits.length;
        Integer[][] dp = new Integer[n][capacity + 1];
        return this.knapsackRecursive(dp, profits, weights, capacity, 0);
    }

    private int knapsackRecursive(Integer[][] dp, int[] profits, int[] weights, int capacity, int currentIndex) {
        // Base checks
        if (capacity <= 0 || currentIndex >= profits.length) {
            return 0;
        }

        // If we have already solved a similar problem, return the result from memory
        if (dp[currentIndex][capacity] != null) {
            return dp[currentIndex][capacity];
        }

        // Recursive call after choosing the element at the currentIndex
        int profit1 = 0;
        if (weights[currentIndex] <= capacity) {
            profit1 = profits[currentIndex] + knapsackRecursive(dp, profits, weights,
                    capacity - weights[currentIndex], currentIndex + 1);
        }

        // Recursive call after excluding the element at the currentIndex
        int profit2 = knapsackRecursive(dp, profits, weights, capacity, currentIndex + 1);

        dp[currentIndex][capacity] = Math.max(profit1, profit2);
        return dp[currentIndex][capacity];
    }
}
// Time Complexity: O(N * C) where N is the number of items and C is the capacity.
// Space Complexity: O(N * C) for the memoization table, plus O(N) for the recursion stack.`
          },
          tabulationSolution: {
            explanation: 'The bottom-up approach iteratively fills a 2D table `dp[i][c]`, representing the maximum profit for the first `i` items with capacity `c`. This method avoids recursion overhead and can be space-optimized because each row only depends on the previous row.',
            code: `class Knapsack {
    // Bottom-Up DP (Tabulation)
    public int solveKnapsack(int[] profits, int[] weights, int capacity) {
        int n = profits.length;
        if (capacity <= 0 || n == 0 || weights.length != n) {
            return 0;
        }

        int[][] dp = new int[n][capacity + 1];

        // Populate capacity 0 columns, with 0 profit
        for (int i = 0; i < n; i++) {
            dp[i][0] = 0;
        }

        // If we have only one weight, we will take it if it is not more than the capacity
        for (int c = 0; c <= capacity; c++) {
            if (weights[0] <= c) {
                dp[0][c] = profits[0];
            }
        }

        // Process all sub-arrays for all the capacities
        for (int i = 1; i < n; i++) {
            for (int c = 1; c <= capacity; c++) {
                int profit1 = 0, profit2 = 0;
                // Include the item, if it is not more than the capacity
                if (weights[i] <= c) {
                    profit1 = profits[i] + dp[i - 1][c - weights[i]];
                }
                // Exclude the item
                profit2 = dp[i - 1][c];
                // Take maximum
                dp[i][c] = Math.max(profit1, profit2);
            }
        }

        return dp[n - 1][capacity];
    }
}
// Time Complexity: O(N * C)
// Space Complexity: O(N * C)`
          }
        },
        {
          problemTitle: 'Subset Sum',
          explanation: 'Given a set of non-negative integers and a target sum, determine if there exists a subset of the given set whose elements sum up to the target. This is a variation of the 0-1 Knapsack problem where the "value" of each item is equal to its "weight". The knapsack capacity is the target sum. The goal is to see if the knapsack can be filled exactly to its capacity.',
          memoizationSolution: {
            explanation: 'The recursive solution checks for each number whether to include it in the subset or not. `dp[i][sum]` stores a boolean indicating if a sum is possible using the first `i` numbers. Memoization prevents re-calculating the same state.',
            code: `import java.util.Arrays;

class SubsetSum {
    public boolean canPartition(int[] num, int sum) {
        int n = num.length;
        Boolean[][] dp = new Boolean[n][sum + 1];
        return this.canPartitionRecursive(dp, num, sum, 0);
    }

    private boolean canPartitionRecursive(Boolean[][] dp, int[] num, int sum, int currentIndex) {
        if (sum == 0) {
            return true;
        }
        if (num.length == 0 || currentIndex >= num.length) {
            return false;
        }
        if (dp[currentIndex][sum] != null) {
            return dp[currentIndex][sum];
        }
        if (num[currentIndex] <= sum) {
            if (canPartitionRecursive(dp, num, sum - num[currentIndex], currentIndex + 1)) {
                dp[currentIndex][sum] = true;
                return true;
            }
        }
        dp[currentIndex][sum] = canPartitionRecursive(dp, num, sum, currentIndex + 1);
        return dp[currentIndex][sum];
    }
}
// Time Complexity: O(N * S) where N is the number of elements and S is the target sum.
// Space Complexity: O(N * S)`
          },
          tabulationSolution: {
            explanation: 'A 2D boolean table `dp[i][s]` is built, where `dp[i][s]` is true if a sum `s` can be formed using the first `i` numbers. The state transition is `dp[i][s] = dp[i-1][s] || dp[i-1][s - num[i-1]]`, representing the choice to either exclude or include the current number.',
            code: `class SubsetSum {
    public boolean canPartition(int[] num, int sum) {
        int n = num.length;
        boolean[][] dp = new boolean[n][sum + 1];

        for (int i = 0; i < n; i++) {
            dp[i][0] = true;
        }

        for (int s = 1; s <= sum; s++) {
            dp[0][s] = (num[0] == s ? true : false);
        }

        for (int i = 1; i < n; i++) {
            for (int s = 1; s <= sum; s++) {
                if (dp[i - 1][s]) {
                    dp[i][s] = dp[i - 1][s];
                } else if (s >= num[i]) {
                    dp[i][s] = dp[i - 1][s - num[i]];
                }
            }
        }
        return dp[n - 1][sum];
    }
}
// Time Complexity: O(N * S)
// Space Complexity: O(N * S), can be optimized to O(S).`
          }
        },
        {
          problemTitle: 'Equal Sum Partition',
          explanation: 'Given a non-empty array of positive integers, determine if the array can be partitioned into two subsets with equal sums. This is a direct application of the Subset Sum problem. A partition is possible only if the total sum of the array is even. If it is, the problem reduces to finding if there is a subset that sums to `(total_sum) / 2`.',
          memoizationSolution: {
            explanation: 'First, calculate the total sum. If it is odd, return false. Otherwise, set the target sum to `total_sum / 2` and solve the Subset Sum problem using the standard memoized recursion.',
            code: `class EqualSumPartition {
    public boolean canPartition(int[] num) {
        int sum = 0;
        for (int i = 0; i < num.length; i++) {
            sum += num[i];
        }

        if (sum % 2 != 0) {
            return false;
        }

        Boolean[][] dp = new Boolean[num.length][sum / 2 + 1];
        return this.canPartitionRecursive(dp, num, sum / 2, 0);
    }

    private boolean canPartitionRecursive(Boolean[][] dp, int[] num, int sum, int currentIndex) {
        if (sum == 0) {
            return true;
        }
        if (num.length == 0 || currentIndex >= num.length) {
            return false;
        }
        if (dp[currentIndex][sum] != null) {
            return dp[currentIndex][sum];
        }
        if (num[currentIndex] <= sum) {
            if (canPartitionRecursive(dp, num, sum - num[currentIndex], currentIndex + 1)) {
                dp[currentIndex][sum] = true;
                return true;
            }
        }
        dp[currentIndex][sum] = canPartitionRecursive(dp, num, sum, currentIndex + 1);
        return dp[currentIndex][sum];
    }
}
// Time Complexity: O(N * S) where S is the total sum of all numbers.
// Space Complexity: O(N * S)`
          },
          tabulationSolution: {
            explanation: 'Calculate the total sum. If odd, return false. Otherwise, use the tabulation method for the Subset Sum problem with a target sum of `total_sum / 2`.',
            code: `class EqualSumPartition {
    public boolean canPartition(int[] num) {
        int sum = 0;
        for (int i = 0; i < num.length; i++) {
            sum += num[i];
        }

        if (sum % 2 != 0) {
            return false;
        }

        int targetSum = sum / 2;
        boolean[] dp = new boolean[targetSum + 1];
        dp[0] = true;

        for (int value : num) {
            for (int j = targetSum; j >= value; j--) {
                dp[j] = dp[j] || dp[j - value];
            }
        }

        return dp[targetSum];
    }
}
// Time Complexity: O(N * S)
// Space Complexity: O(S)`
          }
        },
        {
          problemTitle: 'Count of Subset Sum',
          explanation: 'Given an array of integers and a target sum, count the number of different subsets that add up to the target sum. This is a counting variation of the Subset Sum problem. Instead of using a logical OR to combine choices (include or exclude), we use addition to count all possible ways.',
          memoizationSolution: {
            explanation: 'The recursive function `countSubsets(i, target)` returns the number of subsets. The recurrence is `countSubsets(i, target) = countSubsets(i-1, target) + countSubsets(i-1, target - arr[i-1])`. A 2D array `dp[i][target]` stores the computed counts.',
            code: `class CountSubsetSum {
    public int countSubsets(int[] num, int sum) {
        int n = num.length;
        Integer[][] dp = new Integer[n][sum + 1];
        return this.countSubsetsRecursive(dp, num, sum, 0);
    }

    private int countSubsetsRecursive(Integer[][] dp, int[] num, int sum, int currentIndex) {
        if (sum == 0) {
            return 1;
        }
        if (num.length == 0 || currentIndex >= num.length) {
            return 0;
        }
        if (dp[currentIndex][sum] != null) {
            return dp[currentIndex][sum];
        }
        
        int sum1 = 0;
        if (num[currentIndex] <= sum) {
            sum1 = countSubsetsRecursive(dp, num, sum - num[currentIndex], currentIndex + 1);
        }
        
        int sum2 = countSubsetsRecursive(dp, num, sum, currentIndex + 1);
        
        dp[currentIndex][sum] = sum1 + sum2;
        return dp[currentIndex][sum];
    }
}
// Time Complexity: O(N * S)
// Space Complexity: O(N * S)`
          },
          tabulationSolution: {
            explanation: 'The DP state `dp[i][j]` stores the number of ways to achieve sum `j` using the first `i` elements. The recurrence is `dp[i][j] = dp[i-1][j] + dp[i-1][j - num[i-1]]`. The base case is that there is one way to make a sum of 0 (the empty set).',
            code: `class CountSubsetSum {
    public int countSubsets(int[] num, int sum) {
        int n = num.length;
        int[][] dp = new int[n][sum + 1];

        for (int i = 0; i < n; i++) {
            dp[i][0] = 1;
        }

        for (int s = 1; s <= sum; s++) {
            dp[0][s] = (num[0] == s ? 1 : 0);
        }

        for (int i = 1; i < n; i++) {
            for (int s = 1; s <= sum; s++) {
                dp[i][s] = dp[i - 1][s];
                if (s >= num[i]) {
                    dp[i][s] += dp[i - 1][s - num[i]];
                }
            }
        }
        return dp[n - 1][sum];
    }
}
// Time Complexity: O(N * S)
// Space Complexity: O(N * S), can be optimized to O(S).`
          }
        },
        {
          problemTitle: 'Minimum Subset Sum Difference',
          explanation: 'Given an array of integers, partition it into two subsets, S1 and S2, such that the absolute difference between their sums, `|sum(S1) - sum(S2)|`, is minimized. This problem uses the results of the Subset Sum problem. We want to find a subset sum `S1` that is as close as possible to `total_sum / 2`. The last row of the Subset Sum DP table tells us all achievable sums. We can iterate from `total_sum / 2` downwards to find the largest achievable sum `S1`, and then calculate the minimum difference as `total_sum - 2 * S1`.',
          memoizationSolution: {
            explanation: 'A recursive approach can be used to find all possible subset sums, but it is inefficient. A memoized approach would store the results for `(index, current_sum)` to avoid re-computation, but the tabulation approach is more direct for this problem.',
            code: `// The tabulation approach is more direct for this problem.
// A memoized solution would involve a recursive function that explores all possible sums
// and would be less efficient than the DP approach that builds the table of all possible sums.
class MinSubsetSumDiff {
    public int canPartition(int[] num) {
        int sum = 0;
        for (int i = 0; i < num.length; i++)
            sum += num[i];

        int n = num.length;
        // Using a Boolean DP table for memoization is tricky for this specific problem.
        // The state needs to track the minimum difference, not just possibility.
        // A full DP table of possible sums (like in tabulation) is a better approach.
        return this.canPartitionRecursive(num, 0, 0, sum);
    }

    private int canPartitionRecursive(int[] num, int currentIndex, int sum1, int totalSum) {
        if (currentIndex == num.length) {
            int sum2 = totalSum - sum1;
            return Math.abs(sum1 - sum2);
        }

        // Recursive call after including the number at the currentIndex in the first set
        int diff1 = canPartitionRecursive(num, currentIndex + 1, sum1 + num[currentIndex], totalSum);

        // Recursive call after including the number at the currentIndex in the second set
        int diff2 = canPartitionRecursive(num, currentIndex + 1, sum1, totalSum);

        return Math.min(diff1, diff2);
    }
}
// Time Complexity: O(2^N) without proper memoization. With memoization, it becomes O(N * S).
// Space Complexity: O(N * S)`
          },
          tabulationSolution: {
            explanation: 'First, build the boolean DP table for the Subset Sum problem for a target sum up to `total_sum`. Then, search the last row of this table from `total_sum / 2` down to 0. The first `j` for which `dp[n-1][j]` is true gives the optimal `S1`. The minimum difference is `total_sum - 2 * j`.',
            code: `class MinSubsetSumDiff {
    public int canPartition(int[] num) {
        int sum = 0;
        for (int i = 0; i < num.length; i++) {
            sum += num[i];
        }

        int n = num.length;
        boolean[][] dp = new boolean[n][sum + 1];

        for (int i = 0; i < n; i++) {
            dp[i][0] = true;
        }

        for (int s = 1; s <= sum; s++) {
            dp[0][s] = (num[0] == s ? true : false);
        }

        for (int i = 1; i < n; i++) {
            for (int s = 1; s <= sum; s++) {
                if (dp[i - 1][s]) {
                    dp[i][s] = dp[i - 1][s];
                } else if (s >= num[i]) {
                    dp[i][s] = dp[i - 1][s - num[i]];
                }
            }
        }

        int minDifference = Integer.MAX_VALUE;
        for (int s1 = 0; s1 <= sum / 2; s1++) {
            if (dp[n - 1][s1] == true) {
                minDifference = Math.min(minDifference, sum - 2 * s1);
            }
        }
        return minDifference;
    }
}
// Time Complexity: O(N * S)
// Space Complexity: O(N * S), can be optimized to O(S).`
          }
        },
        {
          problemTitle: 'Target Sum (# of Subsets with Given Difference)',
          explanation: 'Given an array of integers and a target, find the number of ways to assign `+` or `-` to each integer such that their sum equals the target. This problem can be transformed into a "Count of Subset Sum" problem. Let S1 be the sum of numbers with `+` and S2 be the sum of numbers with `-`. We have `S1 - S2 = target` and `S1 + S2 = total_sum`. Solving these gives `S1 = (target + total_sum) / 2`. The problem is now to find the count of subsets that sum to this new target `S1`.',
          memoizationSolution: {
            explanation: 'Calculate `total_sum`. If `(target + total_sum)` is odd or negative, return 0. Calculate the new target `s1_sum = (target + total_sum) / 2`. Then, use the memoized recursion for "Count of Subset Sum" with this new target.',
            code: `class TargetSum {
    public int findTargetSumWays(int[] nums, int S) {
        int totalSum = 0;
        for (int num : nums) {
            totalSum += num;
        }

        if (totalSum < S || (totalSum + S) % 2 != 0) {
            return 0;
        }

        int subsetSum = (totalSum + S) / 2;
        Integer[][] dp = new Integer[nums.length][subsetSum + 1];
        return countSubsetsRecursive(dp, nums, subsetSum, 0);
    }

    private int countSubsetsRecursive(Integer[][] dp, int[] num, int sum, int currentIndex) {
        if (sum == 0) {
            return 1;
        }
        if (currentIndex >= num.length) {
            return 0;
        }
        if (dp[currentIndex][sum] != null) {
            return dp[currentIndex][sum];
        }

        int count1 = 0;
        if (num[currentIndex] <= sum) {
            count1 = countSubsetsRecursive(dp, num, sum - num[currentIndex], currentIndex + 1);
        }
        
        int count2 = countSubsetsRecursive(dp, num, sum, currentIndex + 1);
        
        dp[currentIndex][sum] = count1 + count2;
        return dp[currentIndex][sum];
    }
}
// Time Complexity: O(N * S_new) where S_new is the new target sum.
// Space Complexity: O(N * S_new)`
          },
          tabulationSolution: {
            explanation: 'After transforming the problem to a "Count of Subset Sum" problem with a new target `s1_sum`, use the standard tabulation approach. `dp[j]` will store the number of ways to make sum `j`.',
            code: `class TargetSum {
    public int findTargetSumWays(int[] nums, int S) {
        int totalSum = 0;
        for (int num : nums) {
            totalSum += num;
        }

        if (totalSum < S || (totalSum + S) % 2 != 0) {
            return 0;
        }

        int subsetSum = (totalSum + S) / 2;
        int[] dp = new int[subsetSum + 1];
        dp[0] = 1;

        for (int num : nums) {
            for (int j = subsetSum; j >= num; j--) {
                dp[j] += dp[j - num];
            }
        }

        return dp[subsetSum];
    }
}
// Time Complexity: O(N * S_new)
// Space Complexity: O(S_new)`
          }
        }
      ]
    },
    {
      title: 'Unbounded Knapsack',
      description: 'This pattern is similar to the 0-1 Knapsack, but with a key difference: you can use an unlimited number of instances of each item. This changes the state transition, as including an item does not prevent it from being included again.',
      problems: [
        {
          problemTitle: 'Unbounded Knapsack',
          explanation: 'Given the weights and profits of N items, put these items in a knapsack of capacity C to get the maximum total profit. The main difference from 0/1 Knapsack is that we can use an unlimited number of instances of an item.',
          memoizationSolution: {
            explanation: 'The recursive solution with memoization uses a 2D `dp[i][c]` table. The key difference in the recurrence is `dp[i][c] = max(profit[i] + solve(i, c - weight[i]), solve(i-1, c))`. Notice the `solve(i,...)` call for the "include" case, which allows the item to be reused.',
            code: `import java.util.Arrays;

class UnboundedKnapsack {
    public int solveKnapsack(int[] profits, int[] weights, int capacity) {
        int n = profits.length;
        Integer[][] dp = new Integer[n][capacity + 1];
        return this.knapsackRecursive(dp, profits, weights, capacity, 0);
    }

    private int knapsackRecursive(Integer[][] dp, int[] profits, int[] weights, int capacity, int currentIndex) {
        if (capacity <= 0 || currentIndex >= profits.length) {
            return 0;
        }
        if (dp[currentIndex][capacity] != null) {
            return dp[currentIndex][capacity];
        }

        int profit1 = 0;
        if (weights[currentIndex] <= capacity) {
            // Note: currentIndex is not incremented, allowing reuse of the item
            profit1 = profits[currentIndex] + knapsackRecursive(dp, profits, weights,
                    capacity - weights[currentIndex], currentIndex);
        }

        int profit2 = knapsackRecursive(dp, profits, weights, capacity, currentIndex + 1);

        dp[currentIndex][capacity] = Math.max(profit1, profit2);
        return dp[currentIndex][capacity];
    }
}
// Time Complexity: O(N * C)
// Space Complexity: O(N * C)`
          },
          tabulationSolution: {
            explanation: 'The bottom-up approach can be implemented with a 2D table, but a more common and efficient way is with a 1D array `dp[c]`. The inner loop for capacity iterates from left to right (from `w[i]` to `C`). This ensures that when `dp[c]` is updated, `dp[c - w[i]]` has already been updated for the current item `i`, correctly modeling the "unlimited items" property.',
            code: `class UnboundedKnapsack {
    public int solveKnapsack(int[] profits, int[] weights, int capacity) {
        int n = profits.length;
        if (capacity <= 0 || n == 0 || weights.length != n) {
            return 0;
        }

        int[] dp = new int[capacity + 1];

        for (int c = 0; c <= capacity; c++) {
            for (int i = 0; i < n; i++) {
                if (weights[i] <= c) {
                    dp[c] = Math.max(dp[c], profits[i] + dp[c - weights[i]]);
                }
            }
        }
        return dp[capacity];
    }
}
// Time Complexity: O(N * C)
// Space Complexity: O(C)`
          }
        },
        {
          problemTitle: 'Rod Cutting',
          explanation: 'Given a rod of length `n` and an array of prices for pieces of every integer length from 1 to `n`, determine the maximum value obtainable by cutting the rod and selling the pieces. This is a direct mapping to Unbounded Knapsack: the rod length is the capacity, and each piece of length `i` is an item with weight `i` and value `prices[i-1]`. Since multiple pieces of the same length can be cut, it is an Unbounded Knapsack problem.',
          memoizationSolution: {
            explanation: 'A recursive function `cutRod(n)` finds the max price for a rod of length `n`. It iterates through all possible first cut lengths `i` (from 1 to `n`) and recursively finds the max price for the remaining rod of length `n-i`. The result is `max(prices[i-1] + cutRod(n-i))` over all `i`. Memoization stores the results for each length `n`.',
            code: `import java.util.Arrays;

class RodCutting {
    public int cutRod(int[] prices, int n) {
        int[] memo = new int[n + 1];
        Arrays.fill(memo, -1);
        return cutRodRecursive(prices, n, memo);
    }

    private int cutRodRecursive(int[] prices, int n, int[] memo) {
        if (n <= 0) {
            return 0;
        }
        if (memo[n] != -1) {
            return memo[n];
        }

        int maxVal = Integer.MIN_VALUE;
        for (int i = 0; i < n; i++) {
            maxVal = Math.max(maxVal, prices[i] + cutRodRecursive(prices, n - (i + 1), memo));
        }

        memo[n] = maxVal;
        return maxVal;
    }
}
// Time Complexity: O(N^2)
// Space Complexity: O(N)`
          },
          tabulationSolution: {
            explanation: 'A 1D array `dp[i]` stores the maximum profit for a rod of length `i`. The table is built iteratively. For each length `i`, we consider all possible cuts `j` (where `j < i`) and update `dp[i]` with the maximum value of `prices[j] + dp[i - (j+1)]`.',
            code: `class RodCutting {
    public int cutRod(int[] prices, int n) {
        int[] dp = new int[n + 1];
        dp[0] = 0;

        for (int i = 1; i <= n; i++) {
            int maxVal = Integer.MIN_VALUE;
            for (int j = 0; j < i; j++) {
                maxVal = Math.max(maxVal, prices[j] + dp[i - (j + 1)]);
            }
            dp[i] = maxVal;
        }

        return dp[n];
    }
}
// Time Complexity: O(N^2)
// Space Complexity: O(N)`
          }
        },
        {
          problemTitle: 'Coin Change (Maximum Ways)',
          explanation: 'Given a set of coin denominations and a total amount, find the total number of ways to make change. An infinite supply of each coin is assumed. This is a counting variation of the Unbounded Knapsack pattern where the amount is the capacity and coin values are the weights.',
          memoizationSolution: {
            explanation: 'The recursive function `countWays(i, amount)` returns the number of ways. The recurrence is `countWays(i, amount) = countWays(i, amount - coins[i]) + countWays(i-1, amount)`. Memoization uses a 2D table `dp[i][amount]`.',
            code: `class CoinChangeWays {
    public int change(int amount, int[] coins) {
        Integer[][] dp = new Integer[coins.length][amount + 1];
        return countWaysRecursive(dp, coins, amount, 0);
    }

    private int countWaysRecursive(Integer[][] dp, int[] coins, int amount, int currentIndex) {
        if (amount == 0) {
            return 1;
        }
        if (currentIndex >= coins.length) {
            return 0;
        }
        if (dp[currentIndex][amount] != null) {
            return dp[currentIndex][amount];
        }

        int ways1 = 0;
        if (coins[currentIndex] <= amount) {
            ways1 = countWaysRecursive(dp, coins, amount - coins[currentIndex], currentIndex);
        }
        
        int ways2 = countWaysRecursive(dp, coins, amount, currentIndex + 1);
        
        dp[currentIndex][amount] = ways1 + ways2;
        return dp[currentIndex][amount];
    }
}
// Time Complexity: O(N * Amount)
// Space Complexity: O(N * Amount)`
          },
          tabulationSolution: {
            explanation: 'A 1D array `dp[a]` stores the number of ways to make sum `a`. The outer loop iterates through each coin, and the inner loop iterates through amounts from the coin value up to the target amount, updating `dp[a] += dp[a - coin]`.',
            code: `class CoinChangeWays {
    public int change(int amount, int[] coins) {
        int[] dp = new int[amount + 1];
        dp[0] = 1; // Base case: one way to make amount 0 (with no coins)

        for (int coin : coins) {
            for (int i = coin; i <= amount; i++) {
                dp[i] += dp[i - coin];
            }
        }

        return dp[amount];
    }
}
// Time Complexity: O(N * Amount)
// Space Complexity: O(Amount)`
          }
        },
        {
          problemTitle: 'Coin Change (Minimum Coins)',
          explanation: 'Given a set of coin denominations and a total amount, find the minimum number of coins required to make change. This is a minimization variation of Unbounded Knapsack. The amount is the capacity, coin values are weights, and the "value" of each coin is 1, as we are minimizing the count.',
          memoizationSolution: {
            explanation: 'The recursive function `minCoins(amount)` returns the minimum coins. The recurrence is `minCoins(amount) = 1 + min(minCoins(amount - coin))` for each coin. Memoization uses a 1D array `dp[amount]` to store results.',
            code: `import java.util.Arrays;

class MinCoinChange {
    public int coinChange(int[] coins, int amount) {
        if (amount < 1) return 0;
        int[] memo = new int[amount + 1];
        return coinChangeRecursive(coins, amount, memo);
    }

    private int coinChangeRecursive(int[] coins, int rem, int[] memo) {
        if (rem < 0) return -1;
        if (rem == 0) return 0;
        if (memo[rem] != 0) return memo[rem];

        int min = Integer.MAX_VALUE;
        for (int coin : coins) {
            int res = coinChangeRecursive(coins, rem - coin, memo);
            if (res >= 0 && res < min) {
                min = 1 + res;
            }
        }
        memo[rem] = (min == Integer.MAX_VALUE) ? -1 : min;
        return memo[rem];
    }
}
// Time Complexity: O(N * Amount)
// Space Complexity: O(Amount)`
          },
          tabulationSolution: {
            explanation: 'A 1D array `dp[a]` stores the minimum coins for amount `a`. It is initialized with a large value. `dp[0]` is 0. The table is filled using the recurrence `dp[a] = min(dp[a], 1 + dp[a - coin])`.',
            code: `import java.util.Arrays;

class MinCoinChange {
    public int coinChange(int[] coins, int amount) {
        int[] dp = new int[amount + 1];
        Arrays.fill(dp, amount + 1); // A value larger than any possible answer
        dp[0] = 0;

        for (int i = 1; i <= amount; i++) {
            for (int coin : coins) {
                if (coin <= i) {
                    dp[i] = Math.min(dp[i], dp[i - coin] + 1);
                }
            }
        }

        return dp[amount] > amount ? -1 : dp[amount];
    }
}
// Time Complexity: O(N * Amount)
// Space Complexity: O(Amount)`
          }
        },
        {
          problemTitle: 'Maximum Ribbon Cut',
          explanation: 'Given a ribbon of length `n` and a set of possible cut lengths, find the maximum number of pieces the ribbon can be cut into. This is structurally identical to the "Minimum Coins" problem but with a maximization objective. The ribbon length is the capacity, cut lengths are weights, and the value of each cut is 1.',
          memoizationSolution: {
            explanation: 'The recursive function `maxPieces(n)` returns the maximum pieces for a ribbon of length `n`. The recurrence is `maxPieces(n) = 1 + max(maxPieces(n - cut))` for each allowed cut length. Memoization uses a 1D array `dp[n]`.',
            code: `import java.util.Arrays;

class MaxRibbonCut {
    public int maxPieces(int n, int[] cuts) {
        int[] memo = new int[n + 1];
        Arrays.fill(memo, -2); // Use -2 to indicate not computed
        int result = maxPiecesRecursive(n, cuts, memo);
        return result < 0 ? 0 : result;
    }

    private int maxPiecesRecursive(int n, int[] cuts, int[] memo) {
        if (n == 0) return 0;
        if (n < 0) return -1; // -1 indicates an impossible cut
        if (memo[n] != -2) return memo[n];

        int max = -1;
        for (int cut : cuts) {
            int res = maxPiecesRecursive(n - cut, cuts, memo);
            if (res != -1) {
                max = Math.max(max, res + 1);
            }
        }
        memo[n] = max;
        return max;
    }
}
// Time Complexity: O(N * K) where N is ribbon length and K is number of cut sizes.
// Space Complexity: O(N)`
          },
          tabulationSolution: {
            explanation: 'A 1D array `dp[i]` stores the maximum number of pieces for a ribbon of length `i`. It is initialized with a value indicating impossibility (e.g., -1). `dp[0]` is 0. The table is filled using `dp[i] = max(dp[i], 1 + dp[i - cut])`.',
            code: `import java.util.Arrays;

class MaxRibbonCut {
    public int maxPieces(int n, int[] cuts) {
        int[] dp = new int[n + 1];
        Arrays.fill(dp, -1);
        dp[0] = 0;

        for (int i = 1; i <= n; i++) {
            for (int cut : cuts) {
                if (i >= cut && dp[i - cut] != -1) {
                    dp[i] = Math.max(dp[i], dp[i - cut] + 1);
                }
            }
        }
        return dp[n] == -1 ? 0 : dp[n];
    }
}
// Time Complexity: O(N * K)
// Space Complexity: O(N)`
          }
        }
      ]
    }
  ]
};