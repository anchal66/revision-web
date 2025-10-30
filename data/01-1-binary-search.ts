export const data = {
  title: 'Arrays & Hashing',
  description: 'Arrays and hashing are foundational tools for a vast category of interview problems. Mastery lies not in just knowing basic operations, but in recognizing patterns that optimize solutions from brute force quadratic approaches to efficient linear or linearithmic solutions. Below we categorize common problem-solving patterns in array and hashing problems, explain when to use them, and provide examples with optimized Java solutions for revision.',
  patterns: [
    {
      title: 'Two Pointers (Opposite Ends)',
      description: 'This pattern uses two indices that start at different ends of a sequence and move toward each other to meet certain conditions:contentReference[oaicite:0]{index=0}. It is ideal for sorted arrays or situations where comparing elements from both ends works (e.g., finding pairs summing to a target, checking palindromes). The sorted order is crucial: with the array sorted, moving inward from both ends can eliminate large swaths of unnecessary checks by narrowing down the search space. Common scenarios include pair-sum problems in sorted arrays, finding container with most water, or verifying if a string is a palindrome. The key insight is that at each step you can discard one of the pointers based on the current condition, achieving linear time instead of brute-force quadratic time. If the input is not sorted, you might sort it first (O(n log n) overhead) or use a hashing strategy instead.',
      exampleProblems: ['Two Sum II (Sorted Input)', 'Container With Most Water', 'Valid Palindrome'],
      solution: {
        problemTitle: 'Two Sum II - Input Array Is Sorted',
        code: `class Solution {
    public int[] twoSum(int[] numbers, int target) {
        // Initialize two pointers at both ends of the sorted array
        int left = 0;
        int right = numbers.length - 1;
        // Move the pointers towards each other until they meet
        while (left < right) {
            int currentSum = numbers[left] + numbers[right];
            if (currentSum == target) {
                // Found the pair that adds up to target. Return 1-based indices as per problem statement.
                return new int[]{left + 1, right + 1};
            } else if (currentSum < target) {
                // Sum is too small, move left pointer rightward to increase sum
                left++;
            } else { // currentSum > target
                // Sum is too large, move right pointer leftward to decrease sum
                right--;
            }
        }
        // According to problem constraints, a solution always exists, but return {-1, -1} if not found.
        return new int[]{-1, -1};
    }
}
// Time Complexity: O(n) - each element is visited at most once by either pointer
// Space Complexity: O(1) - only a few extra variables are used`,
        explanation: 'We use two pointers at opposite ends of the array to efficiently find the target pair. Initially `left` is at the start and `right` at the end. Depending on the sum compared to target, we move one pointer inward: increasing the `left` index if sum is too low, or decreasing the `right` index if sum is too high. This works because the array is sorted; we can eliminate a lot of pairs in one step. The brute-force approach would check all O(n^2) pairs, but this opposite-end two-pointer technique runs in O(n):contentReference[oaicite:1]{index=1}. This pattern is applicable whenever we have a sorted array and need to find two elements meeting a condition (like a sum or difference) or we want to compare two ends (for example, checking if a sequence is a palindrome by comparing the `left` and `right` characters).'
      }
    },
    {
      title: 'Sliding Window',
      description: 'This pattern involves two pointers (or indices) that move in the same direction across an array to maintain a "window" of elements that satisfies a certain condition:contentReference[oaicite:2]{index=2}. It is particularly useful for problems dealing with contiguous subarrays or substrings (e.g., finding longest substring without repeating characters, subarray with a given sum, etc.). One pointer expands the window (often the right pointer), and the other contracts the window (the left pointer) as needed when a condition is exceeded. By sliding the window and adjusting its boundaries without restarting the scan for each new position, we avoid redundant work. Each element is visited at most twice (once when added, once when removed) so the complexity is linear:contentReference[oaicite:3]{index=3}. Use this pattern when you see problems asking for longest/shortest subarray/substring that meets a criterion or when dealing with a running sum/condition that needs to be met by a contiguous block. The sliding window can be fixed-size (when the window length is predetermined) or dynamic-size (expanding and contracting based on conditions). Identifying such problems often comes from noticing keywords like \"contiguous subarray\", \"substring\", \"at most/at least k elements\" or a need to find a min/max length of a subarray for a given condition.',
      exampleProblems: ['Minimum Size Subarray Sum', 'Longest Substring Without Repeating Characters', 'Best Time to Buy and Sell Stock'],
      solution: {
        problemTitle: 'Minimum Size Subarray Sum',
        code: `class Solution {
    public int minSubArrayLen(int target, int[] nums) {
        int minLength = Integer.MAX_VALUE;
        int windowStart = 0;
        int currentSum = 0;
        // Expand the window with windowEnd
        for (int windowEnd = 0; windowEnd < nums.length; windowEnd++) {
            currentSum += nums[windowEnd];
            // While the current window satisfies the condition (sum >= target),
            // shrink the window from the left to find smaller subarray that still works
            while (currentSum >= target) {
                // Update minimum length if this window is smaller
                minLength = Math.min(minLength, windowEnd - windowStart + 1);
                // Subtract the element at windowStart as we will move the window forward
                currentSum -= nums[windowStart];
                // Contract the window from the left
                windowStart++;
            }
        }
        // If minLength was never updated, that means no valid subarray found
        return minLength == Integer.MAX_VALUE ? 0 : minLength;
    }
}
// Time Complexity: O(n) - each element enters and exits the window at most once
// Space Complexity: O(1)`,
        explanation: 'The solution maintains a sliding window defined by `[windowStart, windowEnd]`. We extend the window by moving `windowEnd` and adding to `currentSum`. When the sum in the window reaches or exceeds the target, we attempt to shrink the window from the left (increment `windowStart`) to find the smallest window that still satisfies the condition. This is the essence of the sliding window: expanding and contracting the range efficiently without restarting the sum from scratch for each new position. In a brute force approach, we would check all subarrays, which is O(n^2), but the sliding window ensures each element is considered in at most two window positions (entering and leaving):contentReference[oaicite:4]{index=4}, yielding O(n) time. This pattern is powerful for problems involving contiguous sequences where a condition (such as a sum, count of distinct elements, etc.) must be met.'
      }
    },
    {
      title: 'Fast-Slow Two Pointers (Cycle Detection & In-Place Removal)',
      description: 'A variation of the two-pointer technique where one pointer moves faster than the other (often twice as fast) to detect cycles or to perform certain in-place operations. A classic use of fast-slow pointers is Floyd’s Tortoise and Hare algorithm for cycle detection in linked lists or circular arrays. In array problems, this pattern emerges in tasks like finding a duplicate number in an array of size n+1 with numbers in range [1, n] (there is guaranteed to be a duplicate). The array values can be interpreted as a linked structure (value at index points to next index), and a cycle (due to duplication) can be detected with fast/slow pointers. Another use is in in-place algorithms where one pointer lags and one leads, such as removing elements or partitioning: for example, removing duplicates from a sorted array or moving zeros to the end uses a slow pointer for the position of the next valid element and a fast pointer to explore new elements. Use this pattern when the problem involves finding a loop or when one pass needs to cleverly reposition elements in place without extra memory.',
      exampleProblems: ['Find the Duplicate Number (Cycle Detection)', 'Linked List Cycle (Floyd’s Algorithm)', 'Remove Duplicates from Sorted Array'],
      solution: {
        problemTitle: 'Find the Duplicate Number (Cycle Detection)',
        code: `class Solution {
    public int findDuplicate(int[] nums) {
        // Floyd's Tortoise and Hare algorithm: treat array indices as nodes in a linked list
        int slow = nums[0];
        int fast = nums[0];
        // Phase 1: Detect cycle. Fast moves two steps, slow moves one step
        do {
            slow = nums[slow];
            fast = nums[nums[fast]];
        } while (slow != fast);
        // Phase 2: Find entry point of cycle (the duplicate). Reset one pointer to start
        fast = nums[0];
        // Move both pointers at same speed, they meet at the duplicate entry
        while (slow != fast) {
            slow = nums[slow];
            fast = nums[fast];
        }
        return slow; // or fast, both are at the duplicate number
    }
}
// Time Complexity: O(n)
// Space Complexity: O(1)`,
        explanation: 'The array values form a directed graph where each index points to the index given by the value at that position. With a duplicate in [1, n], by the pigeonhole principle, interpreting `nums[i]` as a "next" pointer will create a cycle. Using a fast pointer (`fast`) and slow pointer (`slow)` that move through this graph (fast jumps two steps, slow one step), we detect a cycle when they meet. Then we reset one pointer to the start and move both one step at a time; the point they meet again is the start of the cycle, which corresponds to the duplicate value. This clever use of two pointers finds the duplicate in O(n) without extra space, as opposed to naive methods which might sort (O(n log n)) or use a HashSet (O(n) time, O(n) space). The fast-slow pointers pattern is also used in other contexts like finding the middle of a linked list or detecting a cycle in any sequence structure:contentReference[oaicite:5]{index=5}. In array problems, a simpler form (without true cycle detection) is using one pointer to build the result in-place and another to scan (as in the Remove Duplicates problem), which avoids additional data structures.'
      }
    },
    {
      title: 'Prefix Sum Technique',
      description: 'The prefix sum pattern is a precomputation strategy that transforms an array into an array of cumulative sums (or other cumulative operations) so that queries or certain computations can be done in O(1) time. The idea is that the sum of any subarray `[i..j]` can be obtained as `prefix[j] - prefix[i-1]` once you have the prefix sums. This is extremely powerful for subarray sum problems, especially when combined with hashing to handle target sums efficiently. A direct prefix sum array helps with quick range sum queries (like in static array problems or computing sums repeatedly). More advanced use involves storing seen prefix sums in a HashMap to count subarrays that fulfill a certain property (like sum equals K or XOR equals K) without nested loops. Use prefix sums when you see problems about subarray sums, average of subarrays, or any situation where summing every possible subarray would be too slow. By doing a linear pass to compute prefix sums, you can then answer sum queries in O(1) or find target subarrays in O(n) by checking complements of the running sum.:contentReference[oaicite:6]{index=6} This pattern often turns an O(n^2) summation problem into O(n).',
      exampleProblems: ['Subarray Sum Equals K', 'Range Sum Query (Immutable)', 'Find Pivot Index'],
      solution: {
        problemTitle: 'Subarray Sum Equals K',
        code: `import java.util.HashMap;
class Solution {
    public int subarraySum(int[] nums, int k) {
        int count = 0;
        int currentSum = 0;
        // HashMap to store frequency of prefix sums
        HashMap<Integer, Integer> prefixSumFreq = new HashMap<>();
        prefixSumFreq.put(0, 1); // base case: a prefix sum of 0 occurs once (before starting array)
        for (int num : nums) {
            currentSum += num;
            // If currentSum - k has appeared before as a prefix sum, then there's a subarray ending here with sum k
            if (prefixSumFreq.containsKey(currentSum - k)) {
                count += prefixSumFreq.get(currentSum - k);
            }
            // Add the current prefix sum into the map (or increment its count)
            prefixSumFreq.put(currentSum, prefixSumFreq.getOrDefault(currentSum, 0) + 1);
        }
        return count;
    }
}
// Time Complexity: O(n)
// Space Complexity: O(n) for the HashMap`,
        explanation: 'We iterate through the array calculating a running sum (`currentSum`). The HashMap `prefixSumFreq` stores counts of all prefix sums seen so far. At each index, if `currentSum - k` exists in the map, it means there is a prefix that is exactly `k` less than the current sum, i.e., the subarray between that previous index and the current index sums to `k`. We add the frequency of that prefix to our count. We then update the map with the current prefix sum. This leverages the prefix sum concept: if `prefix[j] - prefix[i-1] = k`, then `prefix[i-1] = prefix[j] - k`. By rearranging, the algorithm checks if `prefix[i-1]` (`currentSum - k`) was seen before. This method turns a brute-force O(n^2) subarray sum check into O(n) by using extra space for the hash map. It’s important to initialize `prefixSumFreq` with 0:1 to handle the case when a prefix sum itself equals k from the beginning. The prefix sum technique, especially combined with hashing, is very versatile for subarray problems:contentReference[oaicite:7]{index=7}:contentReference[oaicite:8]{index=8}. Variations of it can handle differences, XOR (with similar logic, replacing sum with XOR), and other associative operations.'
      }
    },
    {
      title: 'Hashing for Constant-Time Lookups',
      description: 'HashMaps and HashSets are indispensable for many array problems due to their average-case constant time lookups, insertions, and deletions:contentReference[oaicite:9]{index=9}. The hashing pattern involves using a hash table to store seen elements or compute frequencies and then leveraging the O(1) access to solve problems more efficiently than naive loops. Common uses include checking existence of complements (Two Sum in unsorted arrays via a HashMap), counting frequencies (anagrams, or finding the most frequent element), or grouping elements by some computed key (e.g., grouping anagrams by sorted string as key). When a problem asks if an element with a certain property exists, or asks for pair-sum in an unsorted array, or needs counting occurrences, hashing should be one of the first approaches to consider. Always be mindful of the possibility of collisions and that worst-case time can degrade if many collisions occur, but with a good hash function this is rare. The hash table pattern often replaces an O(n^2) search with O(n) by trading space for time. If memory isn’t a huge constraint, hash-based solutions are typically simpler to implement and very effective.',
      exampleProblems: ['Two Sum (Unsorted Input)', 'Valid Anagram', 'Group Anagrams', 'Contains Duplicate'],
      solution: {
        problemTitle: 'Two Sum (Unsorted Array)',
        code: `import java.util.HashMap;
class Solution {
    public int[] twoSum(int[] nums, int target) {
        HashMap<Integer, Integer> indexMap = new HashMap<>();
        // Iterate and store index of each number. Check if complement exists.
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (indexMap.containsKey(complement)) {
                // Found the pair (complement, nums[i]) that sums to target
                return new int[]{ indexMap.get(complement), i };
            }
            // Store the current number and its index in the map
            indexMap.put(nums[i], i);
        }
        // According to problem constraints, a solution always exists; return empty array otherwise
        return new int[]{};
    }
}
// Time Complexity: O(n) on average
// Space Complexity: O(n)`,
        explanation: 'This solution uses a HashMap (`indexMap`) to record numbers we have seen and their indices. As we iterate through `nums`, for each number we check if its complement with respect to the target (i.e., `target - nums[i]`) is already in the map (meaning we have seen a number that would sum with the current one to reach the target). If it is, we found the two indices and return them. If not, we add the current number and its index to the map for future lookups. By using the hash table, we avoid the double loop of brute force (which would be O(n^2)). Instead, we achieve average O(n) time due to the constant time hash lookups:contentReference[oaicite:10]{index=10}. Hashing comes into play in a myriad of array problems: checking for duplicates (store seen elements in a set), building frequency maps for counting (useful in anagram or majority vote problems), or caching results for dynamic programming. The key to identifying these problems is noticing when a simple lookup or membership check in a collection of seen elements can replace an inner loop. Whenever you find yourself wanting to search an array repeatedly for a matching element or needing to count frequencies, think of hashing. It gives a clean, easy-to-code solution for most of these cases.'
      }
    },
    {
      title: 'Sorting & Binary Search',
      description: 'Many array problems become easier after sorting the array, or inherently involve searching in a sorted array. Sorting the array (O(n log n)) can simplify problems by bringing similar elements together or by enabling two-pointer approaches on unsorted inputs. For instance, three-sum or four-sum problems benefit from sorting to then use two pointers efficiently. Sorting is also useful in problems like meeting rooms or interval merging, but for pure array topics, it helps with things like finding a pair with certain properties or simplifying the logic of rearrangement. Additionally, if an array is sorted (or once you sort it), binary search is a powerful sub-pattern to find elements in O(log n) time instead of O(n). There are classic problems that rely on binary search on sorted arrays or even on the answer space (like finding a minimum feasible value). Use binary search when you have a sorted array and need to find an element, an insert position, or a boundary (first/last occurrence of a value). Some problems also involve binary searching a rotated sorted array or a 2D matrix that’s sorted. The presence of terms like \"sorted array\" or requirements better than linear time hint at binary search. It’s also worth noting that some problems use binary search as a puzzle (like finding rotation count or searching in a rotated array), where understanding how to adapt binary search is key.',
      exampleProblems: ['Search in Rotated Sorted Array', 'Find First and Last Position of Element', 'Peak Element in Array'],
      solution: {
        problemTitle: 'Search in Rotated Sorted Array',
        code: `class Solution {
    public int search(int[] nums, int target) {
        int left = 0;
        int right = nums.length - 1;
        // Binary search with an added check for rotation
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] == target) {
                return mid;
            }
            // Determine which half is sorted
            if (nums[left] <= nums[mid]) {
                // Left half is sorted
                if (target >= nums[left] && target < nums[mid]) {
                    // Target lies in the sorted left half
                    right = mid - 1;
                } else {
                    // Target is in the other half
                    left = mid + 1;
                }
            } else {
                // Right half is sorted
                if (target > nums[mid] && target <= nums[right]) {
                    // Target lies in the sorted right half
                    left = mid + 1;
                } else {
                    // Target is in the other half
                    right = mid - 1;
                }
            }
        }
        return -1; // target not found
    }
}
// Time Complexity: O(log n) 
// Space Complexity: O(1)`,
        explanation: 'This is a modified binary search that accounts for the array being rotated (i.e., split into two sorted subarrays). At each step, we check which half of the array is sorted (by comparing values at the bounds) and then decide if the target lies in that sorted half or the other half, narrowing down the search accordingly. The binary search pattern is evident: we eliminate half of the search space at each step, leading to O(log n) time. In a normal sorted array, binary search is straightforward: compare `target` to the middle, then go left or right. In a rotated scenario, we add checks to determine orientation. This solution highlights how recognizing a sorted portion allows using binary search logic. More generally, sorting the entire array upfront can enable simpler solutions (like using the two-pointer pattern on an unsorted array after sorting it, or using binary search to answer queries). Keep in mind that sorting is an O(n log n) step which can be the bottleneck for very large data, but if the problem demands a solution faster than O(n^2) and no linear solution is obvious, sorting + clever scanning or binary search is a strong approach. The phrase \"sorted\" in a problem statement is a clear hint to consider binary search or two-pointer methods:contentReference[oaicite:11]{index=11}.'
      }
    },
    {
      title: 'Partitioning (Dutch National Flag & Variations)',
      description: 'Partitioning algorithms rearrange array elements in-place based on some condition, often in linear time. The Dutch National Flag algorithm (by Edsger Dijkstra) is a classic example, which partitions an array containing 0, 1, and 2 (or three categories) in one pass. The general idea is to use pointers that group elements into three regions: those less than a pivot, equal to pivot, and greater than pivot. This pattern is useful for problems like sorting an array of 0s, 1s, and 2s (0s to left, 2s to right, 1s in middle):contentReference[oaicite:12]{index=12}, or segregating positive and negative numbers, or moving all zeros to the end while maintaining order of others. Partitioning can also refer to two-pointer techniques that partition around a pivot (like Lomuto/Hoare partition in QuickSort) or simply using two pointers to put elements <0 on one side and >=0 on the other. Use this pattern when problems ask for rearranging elements without concern for their exact sorted order, just grouping (like \"separate even and odd numbers\", \"move all negative to beginning\", etc.), or when a one-pass arrangement is required. Recognizing this pattern often comes from noticing the problem wants a reordering based on categories or relative comparisons, ideally without using extra space. It prevents the need for sorting (which is more than necessary if we only need partitioning) or extra arrays.',
      exampleProblems: ['Sort Colors (0-1-2 sorting)', 'Move Zeroes', 'Rearrange Array by Sign'],
      solution: {
        problemTitle: 'Sort Colors (Dutch National Flag Algorithm)',
        code: `class Solution {
    public void sortColors(int[] nums) {
        int n = nums.length;
        // Pointers for current beginning (low) and end (high) positions.
        int low = 0;
        int high = n - 1;
        int i = 0;
        // 0 to low-1 => all 0s, low to i-1 => all 1s, i to high => unknown, high+1 to end => all 2s
        while (i <= high) {
            if (nums[i] == 0) {
                // swap current element with the element at low pointer, then move both i and low forward
                swap(nums, i, low);
                i++;
                low++;
            } else if (nums[i] == 2) {
                // swap current element with the element at high pointer, move high pointer backward
                swap(nums, i, high);
                high--;
                // do NOT increment i here, as the element swapped to position i could be 0 or 2 or 1, need to re-evaluate it
            } else {
                // if nums[i] == 1, it's in correct middle position, just move i
                i++;
            }
        }
    }
    private void swap(int[] nums, int a, int b) {
        int temp = nums[a];
        nums[a] = nums[b];
        nums[b] = temp;
    }
}
// Time Complexity: O(n)
// Space Complexity: O(1)`,
        explanation: 'The Dutch National Flag algorithm maintains three regions in the array as it iterates with index `i`: elements before `low` are all 0s (the \"low\" category), elements after `high` are all 2s (the \"high\" category), and between `low` and `i` are 1s. As `i` moves through the array, whenever we see a 0 we swap it towards the front (at `low`), whenever we see a 2 we swap it towards the end (at `high`), and if it’s a 1 we just move on. This partitions the array into three segments in a single pass. The key is careful index management: after swapping with `high` (for a 2), we do not increment `i` because the item swapped from the end has not been processed. This algorithm runs in linear time and uses constant space, significantly improving over a naive approach that might use counting or multiple passes. Partitioning logic can be extended or modified for other problems: for example, partitioning by sign (negative vs positive) can use a similar approach (though simpler with two pointers), or partitioning around a pivot value (like all elements < pivot to left, > pivot to right, used in QuickSort). Recognize partitioning problems by their phrasing: if the task is to \"rearrange\" or \"segregate\" or \"sort by category\" without needing a fully sorted order, a linear partition algorithm is likely applicable.'
      }
    },
    {
      title: 'Boyer-Moore Voting (Majority Element)',
      description: 'The Boyer-Moore Majority Vote algorithm is a famous algorithm for finding a majority element (more than ⌊n/2⌋ occurrences) in an array using O(n) time and O(1) space:contentReference[oaicite:13]{index=13}. The pattern is to maintain a current candidate and a counter. As you traverse the array, you increment the counter for the same candidate and decrement for different elements. If the counter hits zero, you change the candidate to the current element. This algorithm relies on the fact that if there is a majority element, it will survive this cancellation process. If there isn’t a strict majority, the algorithm’s result (candidate) may not actually be a majority, so a second pass to verify is needed in that case:contentReference[oaicite:14]{index=14}. Boyer-Moore can be extended to find elements that appear more than ⌊n/3⌋ times (by keeping track of two candidates, since there can be at most 2 such elements). This pattern is recognized when a problem asks for a majority element or any element that occurs more than n/2 times (or n/3 times). A brute-force or naive approach might use hashing to count frequencies (O(n) time, O(n) space) or sorting (O(n log n) time, then linear scan), but Boyer-Moore achieves it in O(n) time and O(1) space without explicit counting. It’s a non-intuitive but elegant approach when applicable, essentially leveraging a cancel-out strategy.',
      exampleProblems: ['Majority Element (> n/2)', 'Majority Element II (> n/3)'],
      solution: {
        problemTitle: 'Majority Element (More than n/2 occurrences)',
        code: `class Solution {
    public int majorityElement(int[] nums) {
        int candidate = 0;
        int count = 0;
        // First pass: find candidate
        for (int num : nums) {
            if (count == 0) {
                candidate = num;
                count = 1;
            } else if (num == candidate) {
                count++;
            } else {
                count--;
            }
        }
        // Candidate is potentially the majority element at this point
        // (Optional) Second pass to verify candidate is actually majority:
        // int occur = 0;
        // for (int num : nums) {
        //     if (num == candidate) occur++;
        // }
        // if (occur <= nums.length / 2) return -1; // or throw exception if no majority exists
        return candidate;
    }
}
// Time Complexity: O(n)
// Space Complexity: O(1)`,
        explanation: 'In the first loop, we maintain a `candidate` and a `count`. We initialize with the first element as candidate (when count = 0) and then for each element: if the count is 0, we take the current element as the new candidate; if the current element is the same as candidate, increment count; otherwise decrement count. Intuitively, we are \"cancelling out\" occurrences of different elements. If there is a majority element, it will not be fully cancelled out by others – it will end up as the candidate with a count > 0. By the end of this pass, `candidate` is the majority element (if one exists). The second pass (often included for safety) simply verifies that the candidate actually occurs more than n/2 times. Boyer-Moore is a brilliant use of a greedy cancel-out strategy to solve what initially seems to require counting. It achieves linear time with constant space:contentReference[oaicite:15]{index=15}. In practice, for coding interviews, you can often skip the second pass if the problem guarantees a majority exists (like LeetCode’s Majority Element problem does). For the variant where you need all elements more than n/3, a similar approach with two counters/candidates can be used. Identifying majority element problems is straightforward by their wording. If you ever see > n/2 or > n/3 frequency criteria, think Boyer-Moore voting algorithm.'
      }
    },
    {
      title: "Kadane's Algorithm (Maximum Subarray)",
      description: 'Kadane’s algorithm is a dynamic programming / greedy approach to find the maximum sum subarray in an array with O(n) time and O(1) space:contentReference[oaicite:16]{index=16}. The pattern is to iterate through the array while keeping track of the maximum subarray sum ending at the current position (`currentMax`) and the global maximum seen so far (`globalMax`). At each element, you decide either to extend the previous subarray or to start a new subarray at the current element if the previous sum was negative. This decision can be made greedily: `currentMax = max(num, currentMax + num)`. The beauty of Kadane’s is that it seamlessly handles negative numbers and zeros by resetting when the running sum drops below 0 (which means starting fresh from the next element is better). Many variations and related problems exist: for example, finding the maximum product subarray (which requires also tracking a min because of negative numbers), or problems like \"Best Time to Buy and Sell Stock\" (which can be solved with a similar one-pass logic by tracking min price and max profit, effectively a variant of subarray problem on price differences). Recognize Kadane’s applicable scenarios whenever you need to find an optimal contiguous segment (max sum, min sum, etc.). The brute force for max subarray would check all subarrays (O(n^2)), but Kadane’s uses the subproblem optimal structure to achieve O(n). It’s one of the first examples of dynamic programming taught for arrays, though it’s so simple it feels greedy.',
      exampleProblems: ['Maximum Subarray (Largest Sum)', 'Maximum Product Subarray', 'Best Time to Buy and Sell Stock (Single Transaction)'],
      solution: {
        problemTitle: 'Maximum Subarray (Kadane\'s Algorithm)',
        code: `class Solution {
    public int maxSubArray(int[] nums) {
        // Initialize current max and global max with the first element
        int currentMax = nums[0];
        int globalMax = nums[0];
        // Iterate from the second element onward
        for (int i = 1; i < nums.length; i++) {
            // Either extend the current subarray or start a new one at i
            currentMax = Math.max(nums[i], currentMax + nums[i]);
            // Update global maximum if needed
            if (currentMax > globalMax) {
                globalMax = currentMax;
            }
        }
        return globalMax;
    }
}
// Time Complexity: O(n)
// Space Complexity: O(1)`,
        explanation: 'The code iterates through the array and decides at each position whether to add the current element to the existing subarray or start a new subarray from this element. This decision is made by `Math.max(nums[i], currentMax + nums[i])`. If `currentMax + nums[i]` (extending the subarray) is less than `nums[i]` (starting anew), it means the subarray sum before this point was harming the total (it was negative), so we start fresh at `i`. Otherwise, we extend the subarray. `globalMax` tracks the best seen so far. By the end, `globalMax` is the answer for maximum sum of a contiguous subarray. Kadane’s algorithm is derived from dynamic programming (where `currentMax` is essentially `dp[i]`, the max subarray ending at i), but it optimizes space by only keeping the last value. It runs in linear time and constant space:contentReference[oaicite:17]{index=17}. A common extension is handling the case where all numbers are negative (Kadane’s still works because it initializes to first element, which would be the max in that case). This pattern of iterating and accumulating a value, resetting when it goes wrong, appears in other problems too, like maximum product subarray (where you keep track of both max and min due to sign flips) or finding longest increasing subarray (where you would reset length count when order breaks, etc.). The principle is: iterate once, and at each step use the information of the \"best sub-solution ending here\" to build the global solution.'
      }
    },
    {
      title: 'Divide and Conquer (Merge Sort & Counting)',
      description: 'Divide-and-conquer strategies are powerful for optimizing certain problems on arrays, especially those that involve global inversions or order statistics. The classic example is counting inversions in an array (number of pairs i < j with array[i] > array[j]). A brute force takes O(n^2), but by using a modified merge sort, you can count split inversions during the merge step in O(n log n) time:contentReference[oaicite:18]{index=18}. The pattern is: if you can break the problem into subproblems (like sorting two halves) and then efficiently combine results (like merging sorted halves and counting cross-inversions), you can achieve better performance. This approach is also applied in finding the \"reverse pairs\" (where condition is something like nums[i] > 2*nums[j]), which can be tackled with merge sort modifications or binary indexed trees. Another aspect of divide-and-conquer is binary search on answer or selection algorithms: for example Quickselect (Hoare’s selection) to find the k-th largest element in O(n) average time, or using divide and conquer to find median of two sorted arrays. For arrays specifically, think of divide-and-conquer when a problem asks for a global property that can be composed from sub-problems, especially if sorting is involved or if it hints at smaller subarrays. Recognizing when to use it often comes from experience: inversion count is a well-known scenario, as are cases where partial sorted order helps count or select (like the median of two arrays by dividing the search space). If an O(n^2) solution is obvious and input size is large, consider whether dividing the array and solving recursively could reduce complexity (typical hint for using merge sort technique).',
      exampleProblems: ['Count Inversions in Array', 'Reverse Pairs', 'Kth Largest Element (Quickselect)'],
      solution: {
        problemTitle: 'Count Inversions (Using Merge Sort)',
        code: `class Solution {
    private long inversionCount;
    public long countInversions(long[] arr, int n) {
        inversionCount = 0;
        mergeSort(arr, 0, n - 1);
        return inversionCount;
    }
    private void mergeSort(long[] arr, int left, int right) {
        if (left >= right) return;
        int mid = (left + right) / 2;
        mergeSort(arr, left, mid);
        mergeSort(arr, mid + 1, right);
        merge(arr, left, mid, right);
    }
    private void merge(long[] arr, int left, int mid, int right) {
        int n1 = mid - left + 1;
        int n2 = right - mid;
        long[] L = new long[n1];
        long[] R = new long[n2];
        for (int i = 0; i < n1; i++) L[i] = arr[left + i];
        for (int j = 0; j < n2; j++) R[j] = arr[mid + 1 + j];
        int i = 0, j = 0;
        int k = left;
        // Merge the two halves and count inversions
        while (i < n1 && j < n2) {
            if (L[i] <= R[j]) {
                arr[k++] = L[i++];
            } else {
                arr[k++] = R[j++];
                // All remaining elements in L (from i to end) are greater than R[j-1]
                inversionCount += (n1 - i);
            }
        }
        // Copy any remaining elements
        while (i < n1) arr[k++] = L[i++];
        while (j < n2) arr[k++] = R[j++];
    }
}
// Time Complexity: O(n log n) due to merge sort
// Space Complexity: O(n) for temporary arrays`,
        explanation: 'The function `countInversions` uses a modified merge sort. The `mergeSort` function splits the array into halves recursively. The `merge` function merges two sorted halves (`L` and `R` arrays) and counts how many inversions are crossed between the two halves. Specifically, when an element from the right half (`R[j]`) is placed before an element from the left half (`L[i]`), it means that all remaining elements in `L` from index `i` onward are greater than this `R[j]`. This is because `L` and `R` are sorted, so if `L[i] > R[j]`, then `L[i...end]` are all > `R[j]`. We add `n1 - i` to the inversion count in that case. This method counts all inversions in O(n log n) time by leveraging the divide and conquer strategy:contentReference[oaicite:19]{index=19}. The algorithm essentially piggybacks on merge sort’s structure to gain information (the inversion count) that would be hard to get in linear time otherwise. Other problems like \"reverse pairs\" (where condition is `L[i] > 2*R[j]`) can similarly be solved by tweaking the counting condition (often by using two pointers before the merge step). For selection problems (like finding k-th largest), a divide-and-conquer approach like Quickselect partitions the array around a pivot (like QuickSort) but recurses only into the part that contains the k-th element, achieving average O(n) time. The main takeaway: if a problem can be split and results merged (especially if merging can handle the tricky part like counting cross-relationships), consider divide and conquer. It can drastically reduce complexity from quadratic to n log n or linear.'
      }
    },
    {
      title: 'Matrix Traversal & Simulation',
      description: '2D arrays (matrices) often come with their own set of patterns. Common ones include layer-by-layer traversal (spiral order, which is simulating how you peel an onion layer), transposition and rotation, and using extra markers or first row/column to mark states (e.g., setting matrix zeroes). A typical pattern for rotation (90 degrees) is to transpose the matrix (swap rows with columns) and then reverse each row (for clockwise rotation):contentReference[oaicite:20]{index=20}. Spiral traversal uses boundary markers (top, bottom, left, right indices) to iterate in a layer and then shrink the boundaries. Pascal’s Triangle, while not a matrix per se, is a combinatorial simulation where each number is sum of two above it. Matrix problems often boil down to simulating the process directly with careful index management, since brute force is usually already O(n*m) which is often acceptable. The challenge is getting the indices correct. Use these patterns when you encounter matrix problems that require visiting all elements in a specific order (zigzag, spiral, diagonal, etc.) or performing in-place transformations (rotate, reflect, transpose). The key is to identify the shape of traversal or the transformation needed. For example, \"rotate matrix 90 degrees in place\" suggests the transpose + reverse trick. \"Print matrix in spiral order\" suggests the iterative layer stripping approach. Recognize also that some matrix problems reduce to simpler ones (e.g., search in a sorted matrix can be treated with a binary search approach or a two-pointer-like approach from top-right). But for revision, focusing on traversal and simulation covers a lot of typical matrix questions.',
      exampleProblems: ['Spiral Matrix Printing', 'Rotate Image by 90°', 'Set Matrix Zeroes', 'Pascal’s Triangle'],
      solution: {
        problemTitle: 'Rotate Image (90° Clockwise)',
        code: `class Solution {
    public void rotate(int[][] matrix) {
        int n = matrix.length;
        // Step 1: Transpose the matrix (swap symmetry across diagonal)
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                int temp = matrix[i][j];
                matrix[i][j] = matrix[j][i];
                matrix[j][i] = temp;
            }
        }
        // Step 2: Reverse each row to get the 90° clockwise rotation
        for (int i = 0; i < n; i++) {
            // reverse row i
            int left = 0;
            int right = n - 1;
            while (left < right) {
                int temp = matrix[i][left];
                matrix[i][left] = matrix[i][right];
                matrix[i][right] = temp;
                left++;
                right--;
            }
        }
    }
}
// Time Complexity: O(n^2) for n x n matrix
// Space Complexity: O(1) (in-place)`,
        explanation: 'The solution rotates the matrix in place by first transposing it (reflecting across its main diagonal) and then reversing each row. Transposition swaps element `(i,j)` with `(j,i)` for all i < j, which results in columns becoming rows. After transposing, the matrix is mirrored along the diagonal, so to achieve a rotation, we then reverse each row, which corresponds to a horizontal flip. This combination of transpose + reverse row yields a 90° clockwise rotation:contentReference[oaicite:21]{index=21} (for 90° counter-clockwise, you would reverse each column after transposition). This algorithm runs in O(n^2) which is optimal since any rotation must touch all n^2 elements. Other matrix problems like spiral order traversal involve simulating movement: you use four boundaries (top, bottom, left, right) and iterate right, down, left, up adjusting boundaries as you complete a row or column. \"Set Matrix Zeroes\" uses the first row and column to mark which row/col should be zeroed to avoid extra space. Pascal’s Triangle construction is straightforward simulation of combinatorics. The pattern for matrices is often to carefully manage indices or use the matrix itself as a visited structure for simulation. When facing a matrix problem, visualize how you would manually traverse or transform the matrix, and try to translate that into index operations. Many matrix problems are implementation-heavy but conceptually straightforward once the pattern is understood.'
      }
    },
    {
      title: 'Index Manipulation (Cyclic Sort and Marking)',
      description: 'When array elements are constrained within a range (typically 1 to N or 0 to N-1), the array indices themselves can be used as a hash to achieve O(1) space solutions:contentReference[oaicite:22]{index=22}. One common pattern is the cyclic sort: if we have numbers 1..N, we can iteratively swap each number to its correct index (i.e., value v should ideally be at index v-1). In one pass of such swapping, many problems like finding the smallest missing positive, or finding duplicates/missing numbers can be solved. For example, \"First Missing Positive\" is solved by placing each number in its proper index position; then the first index that doesn’t have the correct value is the answer. Another approach is marking: for finding duplicates or missing values, you can mark the presence of a number by negating the value at its index (i.e., mark index `v-1` as visited by making the value at that index negative). If you encounter an index already marked, that number is a duplicate. If some indices remain positive, their index+1 values are missing from the array:contentReference[oaicite:23]{index=23}. These tricks use the input array itself as an auxiliary structure. Use index manipulation patterns when the problem explicitly or implicitly limits values to a range tied to the array length. Phrases like \"numbers 1 to N\" or \"0 to N-1\" and asking for missing/duplicate elements are a clue. They allow solutions that avoid extra memory by cleverly using index swaps or sign flips. The brute force for such problems would be additional memory (set/map) or sorting. But index manipulation achieves linear time without extra space, which is often the optimal solution for these constrained array problems.',
      exampleProblems: ['First Missing Positive', 'Find All Duplicates in an Array', 'Find Missing and Repeating Number'],
      solution: {
        problemTitle: 'First Missing Positive (Cyclic Sort)',
        code: `class Solution {
    public int firstMissingPositive(int[] nums) {
        int n = nums.length;
        // Place each number in its correct index position [1..n] -> index 0..n-1
        for (int i = 0; i < n; ) {
            if (nums[i] > 0 && nums[i] <= n && nums[i] != nums[nums[i] - 1]) {
                // Swap nums[i] with the element at its target position nums[i]-1
                int temp = nums[nums[i] - 1];
                nums[nums[i] - 1] = nums[i];
                nums[i] = temp;
                // Do not increment i here, we want to check the new value at i
            } else {
                i++;
            }
        }
        // After this, if an index i has value != i+1, then i+1 is missing
        for (int i = 0; i < n; i++) {
            if (nums[i] != i + 1) {
                return i + 1;
            }
        }
        // If all positions have correct values, the missing positive is n+1
        return n + 1;
    }
}
// Time Complexity: O(n)
// Space Complexity: O(1)`,
        explanation: 'The cyclic sort approach tries to put each number in its rightful place. We iterate through the array and whenever we find a number `nums[i]` in the range [1, n], we swap it with the element at index `nums[i]-1` (its correct position) *if it’s not already in the correct position*. We keep swapping until the current index either has an out-of-range number or the correct number is at that index. By the end of this process, any number that can be placed correctly will be at its index. Then, we simply scan for the first index i where `nums[i] != i+1` – that i+1 is the smallest positive missing. If all indices are correct, the answer is n+1. This runs in O(n) time because each number is swapped at most once (each number goes to its correct place at most one time). No extra space is used. This pattern of using index positions is very efficient for specific value-range problems:contentReference[oaicite:24]{index=24}. Alternatively, marking methods could solve similar problems: for example, to find duplicates, you can mark indices by negation: when you see a number v, check index |v|-1 – if it’s already negative, v is a duplicate; otherwise negate it. That also runs in O(n) and uses constant extra space. Both cyclic sort and marking take advantage of the fact that array indices can act like hash buckets for the values. It’s a clever way to avoid using extra memory and often appears in high-difficulty array questions.'
      }
    },
    {
      title: 'Bit Manipulation Tricks',
      description: 'Bits manipulation can be a powerful technique in array problems where you deal with numbers and certain parity or XOR properties. A classic example is finding the single number in an array where every other number appears twice. XOR of a number with itself is 0, and XOR is commutative and associative, so XORing all values cancels out pairs and leaves the unique number:contentReference[oaicite:25]{index=25}. This leads to an O(n) time, O(1) space solution without needing extra data structures. Similarly, to find two numbers that appear once when others appear twice, you can XOR all to get XOR of the two unique numbers and then use a set bit to distinguish them. Bit tricks are also used for summing subsets or dynamic programming bitmask, but within array topics, the main usage is XOR for finding missing or duplicate numbers or those appearing odd number of times. If a problem description talks about every element appearing twice except one (or thrice except one, etc.), that’s a clear signal to use an XOR-based solution or bit counting. Another scenario is when dealing with binary representations or needing to check power of two, etc., but that’s slightly outside typical \"array and hashing\" patterns. Still, knowing these bit tricks can save a lot of time and avoid extra memory. They essentially leverage algebraic properties of XOR and bit operations to achieve results that are non-trivial by other means. Always consider bit manipulation for problems about parity (odd/even counts) or specific duplicate/missing patterns.',
      exampleProblems: ['Single Number (unique element finding)', 'Single Number II (each thrice except one)', 'Missing Number in 0..N'],
      solution: {
        problemTitle: 'Single Number (XOR Method)',
        code: `class Solution {
    public int singleNumber(int[] nums) {
        int xor = 0;
        for (int num : nums) {
            xor ^= num;  // XOR accumulates all numbers, canceling out duplicates
        }
        return xor;
    }
}
// Time Complexity: O(n)
// Space Complexity: O(1)`,
        explanation: 'The code simply XORs every element in the array. Using the property that `a ^ a = 0` and `a ^ 0 = a`, all numbers that appear an even number of times will cancel out. In this problem, every number appears twice except one, so pairs cancel to 0 and we are left with the single number that was unpaired:contentReference[oaicite:26]{index=26}. This is one of those neat bit manipulation tricks that results in a very clean solution. In a variant where every number appears thrice except one, a different bit counting trick is used (count bits in each position mod 3). For finding a missing number from 0..N, XORing all array elements and XORing with all numbers from 0 to N yields the missing number (because all present numbers cancel out, leaving the missing one). These techniques are constant space and linear time. The challenge is recognizing the pattern: look for keywords like \"every element appears twice except...\" or an expectation of O(1) space with numbers. If using a hash set or sorting seems too heavy for such a special case, it’s likely a hint that a bit trick exists. Bit manipulation isn’t needed for every array problem, but when it fits, it leads to some of the most optimal and concise solutions.'
      }
    }
  ]
};
