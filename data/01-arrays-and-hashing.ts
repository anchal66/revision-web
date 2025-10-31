export const data = {
  title: 'Arrays & Hashing',
  description: 'Arrays and hashing are the foundational tools for a vast category of interview problems. Mastery lies not in knowing their basic operations, but in recognizing and applying patterns that optimize solutions from brute-force to linear time.',
  patterns: [
    {
      title: 'Single-pass Traversals',
      description: 'A category of problems solved by scanning through the array once (or a constant number of times) to gather required information. This includes finding specific values (like the maximum or second maximum), or identifying elements based on neighbors (like array leaders). The key is to maintain trackers (such as a running max) as you iterate. Often, you might traverse from the right end when right-side context is needed (as in the leaders problem).',
      exampleProblems: ['Linear Search', 'Largest Element in Array', 'Second Largest Element', 'Leaders in an Array'],
      solutions: [{
        problemTitle: 'Leaders in an Array',
        code: `import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
class Solution {
    public List<Integer> findLeaders(int[] nums) {
        List<Integer> leaders = new ArrayList<>();
        int n = nums.length;
        int maxFromRight = Integer.MIN_VALUE;
        // Traverse from rightmost end
        for (int i = n - 1; i >= 0; i--) {
            if (nums[i] > maxFromRight) {
                leaders.add(nums[i]);
                maxFromRight = nums[i];
            }
        }
        // Reverse to maintain the original order of leaders
        Collections.reverse(leaders);
        return leaders;
    }
}
// Time Complexity: O(n)
// Space Complexity: O(n) for output list (O(1) extra)`,
        explanation: 'By scanning the array from the right, this solution finds all leaders efficiently. The trick is to keep track of the maximum element seen so far from the right. Any element greater than this `maxFromRight` is a leader since nothing to its right is larger. Similarly, one-pass traversals can compute simple statistics (like max or min) in O(n) by updating trackers, eliminating the need for multiple passes or sorting.'
      }]
    },
    {
      title: 'Reversal and Rotation',
      description: 'Problems involving reversing arrays or rotating their contents can often be solved with the reversal technique. This pattern uses a two-pointer approach to reverse portions of the array in-place. For example, rotating an array to the left by k positions can be done by reversing segments and then the whole array, rather than moving elements one by one. Recognizing when a rotation or reversal is needed is key – such as when asked to rotate or reverse elements without extra space.',
      exampleProblems: ['Reverse Array', 'Rotate Array by K', 'Left Rotate Array by One'],
      solutions: [{
        problemTitle: 'Rotate Array by K Places',
        code: `class Solution {
    public void leftRotate(int[] arr, int k) {
        int n = arr.length;
        k = k % n;
        // Reverse first k elements
        reverse(arr, 0, k - 1);
        // Reverse the remaining n-k elements
        reverse(arr, k, n - 1);
        // Reverse the entire array
        reverse(arr, 0, n - 1);
    }
    private void reverse(int[] arr, int start, int end) {
        while (start < end) {
            int temp = arr[start];
            arr[start] = arr[end];
            arr[end] = temp;
            start++;
            end--;
        }
    }
}
// Time Complexity: O(n)
// Space Complexity: O(1)`,
        explanation: 'This solution uses the classic reversal algorithm for rotation. Instead of shifting elements one by one (which is O(n*k) in the worst case), it performs three reversals to achieve the left rotation in O(n). After reversing the first k and the remaining part separately, the final reversal yields the rotated array. This approach is significantly more efficient than naive rotation and is a common trick for array rotation problems.'
      }]
    },
    {
      title: 'Two Pointers (Opposite Ends)',
      description: 'A two-pointer pattern for sorted arrays (or situations where scanning from both ends is beneficial). One pointer starts at the beginning and the other at the end, moving inward until they meet. This is especially useful for finding pairs that meet a condition (like two numbers summing to a target) in O(n) time instead of O(n^2). Clues that suggest this approach include a sorted array or a problem asking for two values that satisfy a condition. It is also used in problems like checking palindromes or the "Container With Most Water" problem.',
      exampleProblems: ['Two Sum II (Input Array is Sorted)', 'Container With Most Water', 'Valid Palindrome'],
      solutions: [{
        problemTitle: 'Two Sum II - Input Array Is Sorted',
        code: `class Solution {
    public int[] twoSum(int[] numbers, int target) {
        // Initialize two pointers
        int left = 0;
        int right = numbers.length - 1;
        while (left < right) {
            int currentSum = numbers[left] + numbers[right];
            if (currentSum == target) {
                // Found the pair, return 1-based indices
                return new int[]{left + 1, right + 1};
            } else if (currentSum < target) {
                left++; // need a larger sum
            } else {
                right--; // need a smaller sum
            }
        }
        return new int[]{-1, -1};
    }
}
// Time Complexity: O(n)
// Space Complexity: O(1)`,
        explanation: 'This solution exemplifies the opposite-ends two-pointer pattern on a sorted array. The sorted order is the key enabler for this efficient approach. By moving the `left` pointer forward or the `right` pointer backward based on the sum, the algorithm narrows the search space to find the target pair in linear time. A brute-force approach would have checked all pairs (O(n^2)), whereas this method achieves O(n).'
      }]
    },
    {
      title: 'Two Pointers (Fast-Slow Traversal)',
      description: 'This pattern uses two pointers moving in the same direction at different speeds or roles – typically one pointer (fast) scans each element, while the other (slow) lags to build the result in-place. It is ideal for tasks like removing duplicates or removing certain elements and partitioning arrays without extra space. If you need to filter out elements or condense an array in one pass, consider this pattern.',
      exampleProblems: ['Remove Duplicates from Sorted Array', 'Remove Element', 'Move Zeroes'],
      solutions: [{
        problemTitle: 'Remove Duplicates from Sorted Array',
        code: `class Solution {
    public int removeDuplicates(int[] nums) {
        if (nums.length == 0) return 0;
        int writeIndex = 1;
        for (int readIndex = 1; readIndex < nums.length; readIndex++) {
            if (nums[readIndex] != nums[readIndex - 1]) {
                nums[writeIndex] = nums[readIndex];
                writeIndex++;
            }
        }
        return writeIndex;
    }
}
// Time Complexity: O(n)
// Space Complexity: O(1)`,
        explanation: 'In this solution, `writeIndex` (slow) only advances when a new unique element is encountered, while `readIndex` (fast) scans through the array. This way, duplicates are skipped and every distinct element is written once, resulting in a condensed array of unique elements at the start. The pattern eliminates the need for additional storage or nested loops. Similar logic can be applied to remove a specific value (skipping over it) or to move all zeros to the end by swapping non-zero elements forward.'
      }]
    },
    {
      title: 'Two Pointers (Dutch National Flag)',
      description: 'A specialized two-pointer (sometimes three-pointer) approach for partitioning an array around a set of values or a pivot. Often known as the Dutch National Flag algorithm, it categorizes elements (for example, sorting 0s, 1s, and 2s) in a single pass. Use this when a problem asks to sort or segregate elements with a few distinct values without using extra space. The pattern maintains regions in the array for each category as it processes elements.',
      exampleProblems: ['Sort Colors (0-1-2 Sort)', 'Rearrange Array by Sign', 'Partition Array into Three Parts'],
      solutions: [{
        problemTitle: 'Sort Colors (DNF Algorithm)',
        code: `class Solution {
    public void sortColors(int[] nums) {
        int low = 0, mid = 0, high = nums.length - 1;
        while (mid <= high) {
            if (nums[mid] == 0) {
                // Swap current element with the element at low index
                int temp = nums[mid];
                nums[mid] = nums[low];
                nums[low] = temp;
                low++;
                mid++;
            } else if (nums[mid] == 1) {
                mid++;
            } else { // nums[mid] == 2
                // Swap current element with the element at high index
                int temp = nums[mid];
                nums[mid] = nums[high];
                nums[high] = temp;
                high--;
                // Note: mid is not incremented here
            }
        }
    }
}
// Time Complexity: O(n)
// Space Complexity: O(1)`,
        explanation: 'The code maintains three regions: `[0..low-1]` for 0s, `[low..mid-1]` for 1s (processed section), and `[mid..high]` for unknown elements. By moving the `low`, `mid`, and `high` pointers appropriately, all values are put in the correct partition in one pass. This in-place method avoids the need for counting and multiple passes. It is very efficient for problems like sorting colors or separating positive and negative numbers, turning them into linear time operations.'
      }]
    },
    {
      title: 'Sliding Window',
      description: 'An essential pattern for problems dealing with contiguous subarrays or substrings. A window defined by two pointers slides over the data to maintain a certain condition or optimal value. This technique handles fixed-size windows (e.g., maximum sum of subarray of size k) and variable-size windows that expand and contract based on conditions (e.g., smallest window with sum ≥ target). If a problem involves a contiguous sequence and a target or constraint, it is a strong hint to use a sliding window to avoid brute-force enumeration.',
      exampleProblems: ['Minimum Size Subarray Sum', 'Longest Substring Without Repeating Characters', 'Fruit Into Baskets (Longest Subarray with 2 Distinct)'],
      solutions: [{
        problemTitle: 'Minimum Size Subarray Sum',
        code: `class Solution {
    public int minSubArrayLen(int target, int[] nums) {
        int windowStart = 0;
        int currentSum = 0;
        int minLength = Integer.MAX_VALUE;
        for (int windowEnd = 0; windowEnd < nums.length; windowEnd++) {
            currentSum += nums[windowEnd];
            while (currentSum >= target) {
                minLength = Math.min(minLength, windowEnd - windowStart + 1);
                currentSum -= nums[windowStart];
                windowStart++;
            }
        }
        return minLength == Integer.MAX_VALUE ? 0 : minLength;
    }
}
// Time Complexity: O(n)
// Space Complexity: O(1)`,
        explanation: 'This solution uses two pointers (`windowStart` and `windowEnd`) to maintain a current window sum. By expanding and then contracting the window when the sum meets or exceeds the target, it avoids recomputing sums for all subarrays. The inner while-loop ensures the window is shrunk optimally to find the minimal length satisfying the condition. This pattern reduces the complexity from O(n^2) (checking all subarrays) to O(n). Variations of this technique apply to problems like longest substring with at most K distinct characters, where you adjust the window based on distinct counts, and so on.'
      }]
    },
    {
      title: 'Sorting and Binary Search',
      description: 'Sorting can transform certain problems by revealing order or structure, often enabling two-pointer solutions or binary search. If the input is unsorted and you need to find an optimal pair/triplet or make global decisions, consider sorting first (keeping in mind if original order matters). Binary search is the go-to approach when dealing with sorted arrays or searching for specific boundaries. Clues for using binary search include terms like "sorted array" or requests for finding an element’s position or count in sorted data. Both techniques can drastically reduce complexity, e.g., from linear to logarithmic search.',
      exampleProblems: ['3Sum (using sorting + two pointers)', 'Search in Rotated Sorted Array', 'Find First and Last Position of Element'],
      solutions: [{
        problemTitle: 'Search in Rotated Sorted Array',
        code: `class Solution {
    public int search(int[] nums, int target) {
        int low = 0, high = nums.length - 1;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (nums[mid] == target) {
                return mid;
            }
            // Check if left half is sorted
            if (nums[low] <= nums[mid]) {
                if (target >= nums[low] && target < nums[mid]) {
                    high = mid - 1;
                } else {
                    low = mid + 1;
                }
            } else {
                // Right half is sorted
                if (target > nums[mid] && target <= nums[high]) {
                    low = mid + 1;
                } else {
                    high = mid - 1;
                }
            }
        }
        return -1;
    }
}
// Time Complexity: O(log n)
// Space Complexity: O(1)`,
        explanation: 'In the rotated sorted array search, although the array is not fully sorted, one half of it is sorted at any given time. The algorithm checks which half is sorted and then determines if the target lies in that half. By discarding half of the array in each step, it finds the target in O(log n) time. More generally, many problems become easier after sorting: for instance, the 3Sum problem sorts the array and then uses two pointers to find triplets in O(n^2) instead of O(n^3). Always consider whether sorting or binary search can simplify a problem with numeric or ordered data.'
      }]
    },
    {
      title: 'Prefix Sum',
      description: 'Prefix sum is a precomputation technique where we accumulate values (often sums or XORs) up to each index, enabling quick range queries and efficient subarray computations. It is especially powerful when combined with hashing to count subarrays meeting a certain criterion. If you find yourself calculating the sum of many subarrays, or looking for subarrays with a target sum (especially when negatives are involved, making two-pointer infeasible), prefix sums are likely the right approach. This concept also extends to prefix XOR for XOR-based problems.',
      exampleProblems: ['Subarray Sum Equals K', 'Range Sum Query (Immutable)', 'Find Pivot Index'],
      solutions: [{
        problemTitle: 'Subarray Sum Equals K',
        code: `import java.util.HashMap;
import java.util.Map;
class Solution {
    public int subarraySum(int[] nums, int k) {
        int count = 0;
        int currentSum = 0;
        Map<Integer, Integer> prefixSumFreq = new HashMap<>();
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
        explanation: 'By maintaining a running `currentSum` and storing frequencies of all prefix sums encountered, this solution counts subarrays summing to k in one pass. It checks if there was a previous prefix sum such that removing it from the current sum yields k (i.e., `currentSum - k` exists in the map). Each time this condition holds, we found a subarray. This eliminates the need to examine every possible subarray explicitly. Similarly, prefix sum arrays allow O(1) range sum queries after O(n) prep time, and the same idea can be applied to XOR: using a prefix XOR and a hash map to count subarrays with a given XOR value.'
      }]
    },
    {
      title: 'Hashing for Lookups',
      description: 'Hash tables (HashMap/HashSet) provide average O(1) lookups and are ideal for frequency counting and quick existence checks. This pattern is useful whenever you need to count occurrences, check for duplicates, or map relationships (like indices or anagram groupings). If a problem can be reframed as a membership or frequency question – for example, "have we seen this before?" or grouping elements without regard to order – hashing is likely the way to go. It often cuts down solutions from O(n^2) to O(n) by trading space for speed.',
      exampleProblems: ['Two Sum (using HashMap)', 'Contains Duplicate', 'Valid Anagram', 'Group Anagrams'],
      solutions: [{
        problemTitle: 'Count Elements With Maximum Frequency',
        code: `import java.util.HashMap;
import java.util.Map;
class Solution {
    public int maxFrequencyElements(int[] nums) {
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
        explanation: 'Our solution builds a frequency map in one pass and tracks the running maximum frequency. Whenever a number’s frequency reaches a new maximum, we reset the total frequency count to that value; if it matches the current maximum, we add it in. This way, we avoid a second pass to compute the result after counting. Hash maps make such counting problems straightforward. More broadly, hashing is used for tasks like finding two numbers that add up to a target (store complements in a set/map) or grouping words by anagrams (using sorted word as a key). It provides an efficient alternative to brute-force lookups or nested loops.'
      }]
    },
    {
      title: 'Greedy (Kadane\'s Algorithm)',
      description: 'Greedy algorithms make locally optimal choices at each step with the hope of finding the global optimum. For array problems like finding the maximum subarray sum, Kadane\'s algorithm is a prototypical greedy solution. It keeps track of the best subarray ending at each position. If a problem asks for the maximum or minimum sum of a subarray (without extra unusual constraints), this pattern likely applies. It avoids brute-force checking of all subarrays by maintaining running best results as it iterates.',
      exampleProblems: ['Maximum Subarray (Kadane\'s Algorithm)', 'Maximum Product Subarray', 'Best Time to Buy and Sell Stock'],
      solutions: [{
        problemTitle: 'Maximum Subarray',
        code: `class Solution {
    public int maxSubArray(int[] nums) {
        int maxSoFar = nums[0];
        int currentSum = nums[0];
        for (int i = 1; i < nums.length; i++) {
            // either extend the current subarray or start fresh from current element
            currentSum = Math.max(nums[i], currentSum + nums[i]);
            maxSoFar = Math.max(maxSoFar, currentSum);
        }
        return maxSoFar;
    }
}
// Time Complexity: O(n)
// Space Complexity: O(1)`,
        explanation: 'This implementation of Kadane\'s algorithm iterates through the array once. At each position, it decides whether to extend the previous subarray or start a new subarray at the current element, choosing the option with the larger sum. In doing so, it finds the maximum possible subarray sum ending at that index, and tracks the global maximum. This greedy approach finds the answer in O(n) time, whereas a brute-force approach would check all subarrays in O(n^2) or O(n^3). Variations include tracking the subarray indices, or handling the maximum product subarray by tracking a minimum and maximum (to account for negative numbers).'
      }]
    },
    {
      title: 'Boyer-Moore Voting Algorithm (Majority)',
      description: 'The Boyer-Moore voting algorithm is a clever pattern to find majority elements (elements appearing more than n/2 times, or extended to n/3, etc.) without extra space. It works by pairing off different elements and maintaining candidate counters. If an interview question asks for a majority element in linear time and O(1) space, this pattern is a strong hint. Essentially, it cancels out equal counts of distinct elements, leaving a potential majority candidate that is then verified by a second pass.',
      exampleProblems: ['Majority Element (> n/2 times)', 'Majority Element II (> n/3 times)'],
      solutions: [{
        problemTitle: 'Majority Element II (n/3 case)',
        code: `import java.util.ArrayList;
import java.util.List;
class Solution {
    public List<Integer> majorityElement(int[] nums) {
        int n = nums.length;
        int candidate1 = 0, candidate2 = 0, count1 = 0, count2 = 0;
        // Find candidates
        for (int num : nums) {
            if (num == candidate1) {
                count1++;
            } else if (num == candidate2) {
                count2++;
            } else if (count1 == 0) {
                candidate1 = num;
                count1 = 1;
            } else if (count2 == 0) {
                candidate2 = num;
                count2 = 1;
            } else {
                count1--;
                count2--;
            }
        }
        // Count the occurrences of candidates
        count1 = 0;
        count2 = 0;
        for (int num : nums) {
            if (num == candidate1) count1++;
            else if (num == candidate2) count2++;
        }
        List<Integer> result = new ArrayList<>();
        if (count1 > n / 3) result.add(candidate1);
        if (count2 > n / 3) result.add(candidate2);
        return result;
    }
}
// Time Complexity: O(n)
// Space Complexity: O(1)`,
        explanation: 'In the first pass, the algorithm finds up to two potential candidates that could be the majority (> n/3) by leveraging the Boyer-Moore cancelation technique. The second pass then counts occurrences of these candidates to verify if they truly exceed n/3 frequency. For the simpler majority element problem (> n/2), the same approach with one candidate and counter is used. This algorithm is extremely efficient: it uses constant space and only two passes, compared to sorting (O(n log n)) or hashing (O(n) space). Recognize this pattern for any problem where a “majority vote” element is sought.'
      }]
    },
    {
      title: 'Divide and Conquer (Merge Sort & Inversions)',
      description: 'Divide-and-conquer strategies break problems into subproblems, solve them independently, and combine the results. A classic application for arrays is counting inversions (pairs out of order) using a modified merge sort. Brute force inversion counting is O(n^2), but divide-and-conquer can reduce it to O(n log n). Whenever a problem involves global order or pair relationships (like inversions or reverse pairs), consider if you can split the array, solve each part, and merge results while counting or adjusting.',
      exampleProblems: ['Count Inversions in Array', 'Reverse Pairs (Count where nums[i] > 2*nums[j])'],
      solutions: [{
        problemTitle: 'Count Inversions in an Array',
        code: `class Solution {
    public long countInversions(int[] arr) {
        return mergeSortAndCount(arr, 0, arr.length - 1);
    }
    private long mergeSortAndCount(int[] arr, int left, int right) {
        if (left >= right) return 0;
        int mid = left + (right - left) / 2;
        long count = 0;
        count += mergeSortAndCount(arr, left, mid);
        count += mergeSortAndCount(arr, mid + 1, right);
        count += mergeAndCount(arr, left, mid, right);
        return count;
    }
    private long mergeAndCount(int[] arr, int left, int mid, int right) {
        int n1 = mid - left + 1;
        int n2 = right - mid;
        int[] leftArr = new int[n1];
        int[] rightArr = new int[n2];
        for (int i = 0; i < n1; i++) {
            leftArr[i] = arr[left + i];
        }
        for (int j = 0; j < n2; j++) {
            rightArr[j] = arr[mid + 1 + j];
        }
        long inversions = 0;
        int i = 0, j = 0, k = left;
        while (i < n1 && j < n2) {
            if (leftArr[i] <= rightArr[j]) {
                arr[k++] = leftArr[i++];
            } else {
                arr[k++] = rightArr[j++];
                inversions += (n1 - i); // count inversions for remaining left elements
            }
        }
        // Copy remaining elements
        while (i < n1) {
            arr[k++] = leftArr[i++];
        }
        while (j < n2) {
            arr[k++] = rightArr[j++];
        }
        return inversions;
    }
}
// Time Complexity: O(n log n)
// Space Complexity: O(n)`,
        explanation: 'This approach uses a modified merge sort to count inversions. As the two sorted halves are merged, whenever an element from the right half is placed before an element from the left half, it indicates an inversion for every remaining element in the left half. By counting those in one go (`inversions += (n1 - i)`), we tally all cross-inversions efficiently. This reduces the problem from O(n^2) to O(n log n). Similar divide-and-conquer or tree-based methods can handle variations like reverse pairs (nums[i] > 2*nums[j]). When faced with a global pair counting problem, splitting the array and counting during merge is a powerful technique.'
      }]
    },
    {
      title: 'Matrix Traversal and Simulation',
      description: '2D arrays (matrices) often require careful traversal patterns. Common scenarios include iterating in a spiral order, transposing and rotating, or flipping rows/columns based on conditions. The solution usually lies in simulating the process with loops and boundary pointers or using known matrix transformations. If a problem asks to "traverse" a matrix in a special order or to "rotate" or modify a matrix in-place, consider patterns like layer-by-layer traversal or operations like transpose + reverse, which efficiently achieve the goal without extra matrices.',
      exampleProblems: ['Spiral Matrix Print', 'Rotate Matrix by 90°', 'Set Matrix Zeroes'],
      solutions: [{
        problemTitle: 'Rotate Matrix by 90 Degrees',
        code: `class Solution {
    public void rotate(int[][] matrix) {
        int n = matrix.length;
        // Transpose the matrix
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                int temp = matrix[i][j];
                matrix[i][j] = matrix[j][i];
                matrix[j][i] = temp;
            }
        }
        // Reverse each row
        for (int i = 0; i < n; i++) {
            int start = 0;
            int end = n - 1;
            while (start < end) {
                int temp = matrix[i][start];
                matrix[i][start] = matrix[i][end];
                matrix[i][end] = temp;
                start++;
                end--;
            }
        }
    }
}
// Time Complexity: O(n^2)
// Space Complexity: O(1)`,
        explanation: 'This solution rotates the matrix clockwise by 90° using a two-step in-place transformation. First, it transposes the matrix (converts rows to columns). Second, it reverses each row. The combination of these steps produces the rotated matrix without using any extra space. Many matrix problems can be approached similarly by breaking the operation into simpler matrix transformations. Another example is printing a matrix in spiral order: you maintain top, bottom, left, and right boundaries and iterate inward layer by layer, simulating the spiral traversal.'
      }]
    },
    {
      title: 'Cyclic Sort / Index Manipulation',
      description: 'When array elements are in a specific range (say 1 to N) or a problem involves finding missing/duplicate numbers, using the array indices as a hash can be very effective. Cyclic sort involves swapping elements to their correct positions until every number is either in its right place or a cycle is resolved. A related approach is index marking (e.g., negating the value at an index to mark it visited). These techniques achieve O(n) time without extra space. If you see problems about finding the smallest missing positive, finding duplicates in an array, or a missing number, consider in-place index manipulation instead of extra structures.',
      exampleProblems: ['First Missing Positive', 'Find All Duplicates in an Array', 'Find the Missing and Repeating Number'],
      solutions: [{
        problemTitle: 'First Missing Positive',
        code: `class Solution {
    public int firstMissingPositive(int[] nums) {
        int n = nums.length;
        for (int i = 0; i < n; i++) {
            // place nums[i] at its correct index if possible
            while (nums[i] > 0 && nums[i] <= n && nums[nums[i] - 1] != nums[i]) {
                int temp = nums[i];
                nums[i] = nums[temp - 1];
                nums[temp - 1] = temp;
            }
        }
        // find the first index where the value is incorrect
        for (int i = 0; i < n; i++) {
            if (nums[i] != i + 1) {
                return i + 1;
            }
        }
        return n + 1;
    }
}
// Time Complexity: O(n)
// Space Complexity: O(1)`,
        explanation: 'This solution repeatedly swaps each number into its correct position (i.e., value v should ideally be at index v-1) for all numbers in the range. After this procedure, the first position that doesn’t have the correct value indicates the smallest missing positive. This runs in linear time with constant space, outperforming approaches that use sorting (O(n log n)) or extra arrays. Similarly, to find duplicates, one could use index marking: for each number v, flip the sign at index v-1; if it is already negative, v is a duplicate. Both cyclic sorting and index marking cleverly use the array itself as a hash structure.'
      }]
    },
    {
      title: 'Next Permutation',
      description: 'This is a specific algorithmic trick to generate the next lexicographical permutation of a sequence in-place. It is useful for problems that ask for rearranging elements into the next or previous order (like the "next permutation" problem itself). The approach is to identify a suffix that is in descending order (which means we are at the highest permutation of that suffix), then find a pivot just before that suffix that can be increased, and then rearrange the suffix to the lowest possible order. Recognize this pattern when you need to find the next ordering of elements without brute-forcing all permutations.',
      exampleProblems: ['Next Permutation of Array'],
      solutions: [{
        problemTitle: 'Next Permutation',
        code: `class Solution {
    public void nextPermutation(int[] nums) {
        int n = nums.length;
        // Step 1: Find the first index i from the right such that nums[i] < nums[i+1]
        int i = n - 2;
        while (i >= 0 && nums[i] >= nums[i + 1]) {
            i--;
        }
        if (i >= 0) {
            // Step 2: Find index j from the right such that nums[j] > nums[i]
            int j = n - 1;
            while (nums[j] <= nums[i]) {
                j--;
            }
            // Step 3: Swap nums[i] and nums[j]
            int temp = nums[i];
            nums[i] = nums[j];
            nums[j] = temp;
        }
        // Step 4: Reverse the suffix starting at i+1
        int start = i + 1;
        int end = n - 1;
        while (start < end) {
            int temp = nums[start];
            nums[start] = nums[end];
            nums[end] = temp;
            start++;
            end--;
        }
    }
}
// Time Complexity: O(n)
// Space Complexity: O(1)`,
        explanation: 'The algorithm first finds a pivot index `i` where the sequence can be made larger (a position where `nums[i] < nums[i+1]` when scanning from the rightmost side). Then it finds the smallest element larger than `nums[i]` to the right of `i` (index `j`) to swap with, ensuring the increase is minimal. Finally, it reverses the order of the suffix after `i` (which was in descending order) to make it as low as possible. This yields the next lexicographical permutation. If no such `i` exists (the entire array is descending, i.e., highest permutation), the algorithm will reverse the whole array, giving the lowest permutation. This method achieves the next permutation in O(n) time, far more efficient than enumerating all permutations.'
      }]
    }
  ]
};
