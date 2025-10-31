export const data = {
  title: 'Searching & Recursion',
  description: 'Mastering advanced searching techniques and the recursive thinking behind backtracking is crucial for solving optimization and combinatorial problems.',
  patterns: [
    {
      title: 'Binary Search on Answer',
      description: 'This advanced technique involves performing a binary search on the range of possible answers to a problem, rather than on the input data itself. It is applicable when the problem has a monotonic property.',
      exampleProblems: ['Split Array Largest Sum', 'Koko Eating Bananas', 'Capacity To Ship Packages Within D Days'],
      solutions: [{
        problemTitle: 'Split Array Largest Sum',
        code: `class Solution {
    public int splitArray(int[] nums, int k) {
        long left = 0;
        long right = 0;
        for (int num : nums) {
            left = Math.max(left, num);
            right += num;
        }

        long minLargestSum = right;

        while (left <= right) {
            long maxSumAllowed = left + (right - left) / 2;
            
            if (isPossible(nums, k, maxSumAllowed)) {
                minLargestSum = maxSumAllowed;
                right = maxSumAllowed - 1;
            } else {
                left = maxSumAllowed + 1;
            }
        }
        return (int) minLargestSum;
    }

    private boolean isPossible(int[] nums, int k, long maxSumAllowed) {
        int subarraysCount = 1;
        long currentSum = 0;
        for (int num : nums) {
            if (currentSum + num <= maxSumAllowed) {
                currentSum += num;
            } else {
                subarraysCount++;
                currentSum = num;
                if (subarraysCount > k) {
                    return false;
                }
            }
        }
        return true;
    }
}
// Time Complexity: O(n * log(S)) where S is the sum of array elements
// Space Complexity: O(1)`,
        explanation: 'This solution binary searches for the minimum possible value of the "largest subarray sum". The `isPossible` helper function greedily checks if a given `maxSumAllowed` is feasible in O(n) time. This transforms the problem into a search over a monotonic answer space.'
      }]
    },
    {
      title: 'Backtracking',
      description: 'A methodical way to explore all possible solutions by incrementally building a candidate and abandoning a path ("backtracking") once it\'s clear it cannot lead to a valid solution. It follows a "choose -> explore -> unchoose" pattern.',
      exampleProblems: ['Subsets', 'Combination Sum', 'Permutations', 'Word Search'],
      solutions: [{
        problemTitle: 'Subsets',
        code: `import java.util.ArrayList;
import java.util.List;

class Solution {
    public List<List<Integer>> subsets(int[] nums) {
        List<List<Integer>> result = new ArrayList<>();
        backtrack(result, new ArrayList<>(), nums, 0);
        return result;
    }

    private void backtrack(List<List<Integer>> result, List<Integer> currentSubset, int[] nums, int start) {
        // Add the current subset to the result list.
        result.add(new ArrayList<>(currentSubset));

        for (int i = start; i < nums.length; i++) {
            // 1. Choose: Add the element.
            currentSubset.add(nums[i]);
            // 2. Explore: Recurse with the next starting index.
            backtrack(result, currentSubset, nums, i + 1);
            // 3. Unchoose (Backtrack): Remove the element.
            currentSubset.remove(currentSubset.size() - 1);
        }
    }
}
// Time Complexity: O(n * 2^n)
// Space Complexity: O(n) for recursion stack`,
        explanation: 'This solution illustrates the core backtracking template. The recursive function explores paths by either including an element or not. The `start` index prevents duplicate subsets and ensures each combination is generated only once.'
      }]
    }
  ]
};