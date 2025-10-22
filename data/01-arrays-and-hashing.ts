export const data = {
  title: 'Arrays & Hashing',
  description: 'Arrays and hashing are the foundational tools for a vast category of interview problems. Mastery lies not in knowing their basic operations, but in recognizing and applying patterns that optimize solutions from brute-force to linear time.',
  patterns:,
      solution: {
        problemTitle: 'Two Sum II - Input Array Is Sorted',
        code: `class Solution {
    public int twoSum(int numbers, int target) {
        // Initialize two pointers, one at the start and one at the end.
        int left = 0;
        int right = numbers.length - 1;

        // Loop until the two pointers meet.
        while (left < right) {
            int currentSum = numbers[left] + numbers[right];

            if (currentSum == target) {
                // Found the pair. Return their 1-based indices.
                return new int{left + 1, right + 1};
            } else if (currentSum < target) {
                // The sum is too small, so we need a larger value.
                // Move the left pointer to the right to increase the sum.
                left++;
            } else { // currentSum > target
                // The sum is too large, so we need a smaller value.
                // Move the right pointer to the left to decrease the sum.
                right--;
            }
        }

        // According to problem constraints, a solution always exists.
        return new int{-1, -1};
    }
}
// Time Complexity: O(n)
// Space Complexity: O(1)`,
        explanation: 'This solution exemplifies the opposite-ends collision pattern. The sorted input is the key enabler for this efficient approach. The `left` and `right` pointers move towards each other, narrowing the search space in linear time.'
      }
    },
    {
      title: 'Sliding Window',
      description: 'Essential for problems concerning contiguous subarrays or substrings. It maintains a "window" that slides over the data, avoiding redundant calculations and reducing complexity to O(n).',
      exampleProblems:,
      solution: {
        problemTitle: 'Minimum Size Subarray Sum',
        code: `class Solution {
    public int minSubArrayLen(int target, int nums) {
        int windowStart = 0;
        int currentSum = 0;
        int minLength = Integer.MAX_VALUE;

        for (int windowEnd = 0; windowEnd < nums.length; windowEnd++) {
            currentSum += nums[windowEnd];

            while (currentSum >= target) {
                minLength = Math.min(minLength, windowEnd - windowStart + 1);
                currentSum -= nums;
                windowStart++;
            }
        }

        return minLength == Integer.MAX_VALUE? 0 : minLength;
    }
}
// Time Complexity: O(n)
// Space Complexity: O(1)`,
        explanation: 'This solution uses two pointers, `windowStart` and `windowEnd`, to define the sliding window. The `windowEnd` pointer expands the window, and the `while` loop contracts it from the left once the sum condition is met, ensuring the minimal length is found efficiently.'
      }
    },
    {
      title: 'Prefix Sum',
      description: 'A pre-computation technique that transforms an array to allow for rapid O(1) range sum queries. It is especially powerful when combined with a HashMap.',
      exampleProblems:,
      solution: {
        problemTitle: 'Subarray Sum Equals K',
        code: `import java.util.HashMap;
import java.util.Map;

class Solution {
    public int subarraySum(int nums, int k) {
        int count = 0;
        int currentSum = 0;
        Map<Integer, Integer> prefixSumFreq = new HashMap<>();
        
        // Base case: A prefix sum of 0 has occurred once (the empty prefix).
        prefixSumFreq.put(0, 1);

        for (int num : nums) {
            currentSum += num;

            if (prefixSumFreq.containsKey(currentSum - k)) {
                count += prefixSumFreq.get(currentSum - k);
            }

            prefixSumFreq.put(currentSum, prefixSumFreq.getOrDefault(currentSum, 0) + 1);
        }

        return count;
    }
}
// Time Complexity: O(n)
// Space Complexity: O(n)`,
        explanation: 'This solution iterates through the array, calculating the running `currentSum`. It uses a HashMap to store the frequencies of previously seen prefix sums. If `currentSum - k` exists in the map, it means a subarray summing to `k` ends at the current position.'
      }
    },
    {
        title: 'Hashing for Lookups',
        description: 'HashMaps and HashSets provide constant-time average complexity for lookups, insertions, and deletions, making them ideal for frequency counting and efficient searching.',
        exampleProblems:,
        solution: {
          problemTitle: 'Count Elements With Maximum Frequency',
          code: `import java.util.HashMap;
import java.util.Map;

class Solution {
    public int maxFrequencyElements(int nums) {
        Map<Integer, Integer> freqMap = new HashMap<>();
        int maxFreq = 0;
        int totalFreq = 0;

        for (int num : nums) {
            int newFreq = freqMap.getOrDefault(num, 0) + 1;
            freqMap.put(num, newFreq);

            if (newFreq > maxFreq) {
                maxFreq = newFreq;
                totalFreq = newFreq;
            } else if (newFreq == maxFreq) {
                totalFreq += newFreq;
            }
        }
        return totalFreq;
    }
}
// Time Complexity: O(n)
// Space Complexity: O(k) where k is the number of unique elements`,
          explanation: 'This optimized single-pass solution uses a HashMap to build a frequency map. As it iterates through the numbers, it updates the `maxFreq` and `totalFreq` variables in real-time, avoiding a second pass over the map.'
        }
      }
  ]
};