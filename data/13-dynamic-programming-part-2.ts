export const data = {
  title: 'Dynamic Programming Part 2',
  description: 'In Part 2, we explore dynamic programming in sequences and one-dimensional arrays. These patterns handle problems like comparing sequences, finding increasing sequences, or optimizing subarray computations. The techniques often involve building DP tables (for sequence alignment problems) or single-array DP for linear scans.',
  patterns: [
    {
      title: 'Longest Common Subsequence (LCS) Pattern',
      description: 'This pattern deals with finding commonalities between sequences (often strings) and forms the basis for many string DP problems. The classic LCS problem finds the length of the longest subsequence present in both sequences. Its DP solution uses a 2D table where cell [i][j] represents the LCS length for prefixes of lengths i and j. Many variations build on LCS, such as finding substrings, supersequences, or minimum edits based on the LCS length.',
      exampleProblems: ['Longest Common Subsequence', 'Longest Common Substring', 'Shortest Common Supersequence', 'Minimum Insertions/Deletions to Transform', 'Longest Palindromic Subsequence', 'Longest Repeating Subsequence', 'Sequence Pattern Matching'],
      solutions: [{
        problemTitle: 'Longest Common Subsequence',
        code: `class Solution {
    public int longestCommonSubsequence(String text1, String text2) {
        int m = text1.length();
        int n = text2.length();
        int[][] dp = new int[m + 1][n + 1];
        // Build the DP table bottom-up
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
        explanation: 'This solution computes the length of the Longest Common Subsequence (LCS) for two strings using a DP table. Each entry `dp[i][j]` is filled by comparing the i-th prefix of the first string and the j-th prefix of the second string. If the current characters match, 1 is added to the result from the previous shorter prefixes (`dp[i-1][j-1]`). If they do not match, the solution is the max of skipping one character from either string (`dp[i-1][j]` or `dp[i][j-1]`). The final answer `dp[m][n]` gives the LCS length. Variants like Longest Common Substring modify the transition to require consecutive matches, and others like Shortest Common Supersequence or edit distance problems use the LCS length to derive results.'
      }]
    },
    {
      title: 'Longest Increasing Subsequence (LIS) Pattern',
      description: 'The LIS pattern focuses on one-dimensional arrays, finding a subsequence that is strictly increasing with maximum possible length. A DP approach for LIS considers each element and computes the longest increasing subsequence ending at that element (often by looking at all previous smaller elements). While an optimized patience sorting method exists for LIS in O(n log n), the classic DP is O(n^2) and helps understand substructure in sequence problems.',
      exampleProblems: ['Longest Increasing Subsequence', 'Maximum Sum Increasing Subsequence', 'Longest Bitonic Subsequence'],
      solutions: [{
        problemTitle: 'Longest Increasing Subsequence',
        code: `import java.util.Arrays;
class Solution {
    public int lengthOfLIS(int[] nums) {
        int n = nums.length;
        if (n == 0) return 0;
        int[] dp = new int[n];
        Arrays.fill(dp, 1);
        int lis = 1;
        for (int i = 1; i < n; i++) {
            for (int j = 0; j < i; j++) {
                if (nums[j] < nums[i]) {
                    dp[i] = Math.max(dp[i], dp[j] + 1);
                }
            }
            lis = Math.max(lis, dp[i]);
        }
        return lis;
    }
}
// Time Complexity: O(n^2)
// Space Complexity: O(n)`,
        explanation: 'This DP solution calculates the length of the Longest Increasing Subsequence in an array. The `dp[i]` value represents the length of the longest increasing subsequence ending at index i. For each element, the code checks all previous elements `j < i`. If `nums[j]` is less than `nums[i]`, it means we can extend the increasing sequence ending at `j` by `nums[i]`. We update `dp[i]` accordingly. Finally, the maximum value in the `dp` array (tracked by `lis`) is the length of the LIS. Variations include finding the maximum sum of an increasing subsequence or handling sequences that first rise then fall (bitonic subsequence).'
      }]
    },
    {
      title: "Kadane's Algorithm (Maximum Subarray)",
      description: 'Kadane’s algorithm exemplifies a DP optimization for one-dimensional problems, specifically finding the maximum subarray sum. Instead of using explicit extra space, it keeps track of the current subarray sum and the best sum found so far. This pattern demonstrates how a DP relation can be optimized to O(1) space by updating variables in place.',
      exampleProblems: ['Maximum Subarray (Kadane’s)', 'Maximum Circular Subarray', 'Maximum Product Subarray'],
      solutions: [{
        problemTitle: 'Maximum Subarray',
        code: `class Solution {
    public int maxSubArray(int[] nums) {
        int maxSoFar = nums[0];
        int currentSum = nums[0];
        for (int i = 1; i < nums.length; i++) {
            // Either extend the current subarray or start a new subarray at i
            currentSum = Math.max(nums[i], currentSum + nums[i]);
            maxSoFar = Math.max(maxSoFar, currentSum);
        }
        return maxSoFar;
    }
}
// Time Complexity: O(n)
// Space Complexity: O(1)`,
        explanation: 'This solution uses Kadane’s algorithm to find the largest sum of any contiguous subarray. The variable `currentSum` holds the maximum subarray sum ending at the current index (either by extending the previous subarray or starting fresh at the current element). `maxSoFar` tracks the maximum seen so far. This approach is essentially a dynamic programming solution where the state is optimized to two variables, achieving O(n) time and O(1) space. Variations include handling cases like circular wrap-around arrays or finding maximum product subarrays (which requires tracking both min and max products due to negative numbers).'
      }]
    }
  ]
};
