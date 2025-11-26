export const data = {
  title: "Binary Search Patterns for DSA Revision",
  description: "**Overview:** Binary Search applies to sorted or monotonic data:contentReference[oaicite:0]{index=0}. It repeatedly halves the search space to locate a target or threshold efficiently (O(log N)). Key patterns:\n" +
               "- **Direct Search / Bound Queries:** Search target, find insert position, lower/upper bound (first ≥/first > target):contentReference[oaicite:1]{index=1}:contentReference[oaicite:2]{index=2}.\n" +
               "- **Range/Count Queries:** Locate first/last occurrence of a value, count ≤ X, etc.:contentReference[oaicite:3]{index=3}:contentReference[oaicite:4]{index=4}.\n" +
               "- **Search in Rotated Array:** Use modified binary search by identifying sorted halves:contentReference[oaicite:5]{index=5}.\n" +
               "- **Binary Search on Answer:** Optimize a parameter by defining a monotonic feasibility predicate:contentReference[oaicite:6]{index=6}:contentReference[oaicite:7]{index=7}.\n\n" +
               "Below are patterns covering these cases, with example problems and solutions in Java.",
  patterns: [
    {
      title: "Binary Search on Sorted Arrays",
      description: "Works when the array is sorted. Typical tasks include searching for a target, inserting into a sorted array, and finding floor/ceil values. Key variants:\n" +
                   "- **Standard Search:** Binary search for a target in *O*(log N) time:contentReference[oaicite:8]{index=8}.\n" +
                   "- **Lower/Upper Bound:** Find the first index where element ≥ target (lower bound) or > target (upper bound):contentReference[oaicite:9]{index=9}:contentReference[oaicite:10]{index=10}.\n" +
                   "- **First/Last Occurrence:** Use binary search to find first or last position of a value (e.g., first and last index of a value):contentReference[oaicite:11]{index=11}.\n" +
                   "- **Insert Position:** Equivalent to lower bound; find where to insert target to maintain sorted order:contentReference[oaicite:12]{index=12}.\n" +
                   "- **Floor/Ceil:** Floor is the largest element ≤ target (basically one less than a lower bound); Ceil is the smallest ≥ target (a lower bound):contentReference[oaicite:13]{index=13}.\n" +
                   "Logic: At each step compare `arr[mid]` with target. Move `left` or `right` accordingly. Stop when pointers cross.",
      exampleProblems: ["Search an element in sorted array", "Find first and last occurrence of a value"],
      solutions: [{
        problemTitle: "Search an element in sorted array",
        code: "public int search(int[] arr, int target) {\n" +
              "    int left = 0, right = arr.length - 1;\n" +
              "    while (left <= right) {\n" +
              "        int mid = left + (right - left) / 2;\n" +
              "        if (arr[mid] == target) return mid;\n" +
              "        if (arr[mid] < target) left = mid + 1;\n" +
              "        else right = mid - 1;\n" +
              "    }\n" +
              "    return -1;\n" +
              "}",
        explanation: "We maintain two pointers `left` and `right`. Compute `mid = (left+right)/2`:\n" +
                     "- If `arr[mid]` equals the target, the element is found.\n" +
                     "- If `arr[mid]` is less than target, search the right half (`left = mid + 1`).\n" +
                     "- Otherwise search the left half (`right = mid - 1`).\n" +
                     "Continue until `left > right` (target not found).\n\n" +
                     "**Dry Run:** For `arr = [2,5,6,8]` and `target = 6`: initially `left=0, right=3`.\n" +
                     "- `mid=1` → `arr[1]=5 < 6`, so set `left=2`.\n" +
                     "- Now `left=2, right=3`, `mid=2` → `arr[2]=6 == target`, return index 2.\n" +
                     "**Complexity:** O(log N) time."
      },
      {
        problemTitle: "Find first and last occurrence of a value",
        code: "public int[] findFirstAndLast(int[] arr, int target) {\n" +
              "    int first = findBound(arr, target, true);\n" +
              "    if (first == -1) return new int[] {-1, -1};\n" +
              "    int last = findBound(arr, target, false);\n" +
              "    return new int[] {first, last};\n" +
              "}\n\n" +
              "private int findBound(int[] arr, int target, boolean isFirst) {\n" +
              "    int left = 0, right = arr.length - 1, result = -1;\n" +
              "    while (left <= right) {\n" +
              "        int mid = left + (right - left) / 2;\n" +
              "        if (arr[mid] == target) {\n" +
              "            result = mid;\n" +
              "            if (isFirst) right = mid - 1; // Search left for first occurrence\n" +
              "            else left = mid + 1; // Search right for last occurrence\n" +
              "        } else if (arr[mid] < target) {\n" +
              "            left = mid + 1;\n" +
              "        } else {\n" +
              "            right = mid - 1;\n" +
              "        }\n" +
              "    }\n" +
              "    return result;\n" +
              "}",
        explanation: "We use a helper function `findBound` to perform binary search twice: once to find the **first occurrence** and once for the **last occurrence**.\n" +
                     "- To find the first occurrence (`isFirst=true`): When `arr[mid] == target`, we store `mid` as a potential result but continue searching in the left half (`right = mid - 1`) to find an even earlier index.\n" +
                     "- To find the last occurrence (`isFirst=false`): When `arr[mid] == target`, we store `mid` but continue searching in the right half (`left = mid + 1`) to find a later index.\n\n" +
                     "**Dry Run:** For `arr = [5,7,7,8,8,10]` and `target = 8`:\n" +
                     "1. **Find First (8):** `mid` lands on 8. Store index, search left. Eventually finds index 3. **Result: [3, ?]**\n" +
                     "2. **Find Last (8):** `mid` lands on 8. Store index, search right. Eventually finds index 4. **Result: [3, 4]**\n" +
                     "**Complexity:** O(log N) time."
      }]
    },
    {
      title: "Binary Search on Rotated Arrays",
      description: "Applies when a sorted array is cyclically rotated. Key tasks:\n" +
                   "- **Search in Rotated Array:** Use modified binary search. Determine which half is sorted (by comparing `arr[low]` and `arr[mid]`) and choose the half that could contain the target:contentReference[oaicite:14]{index=14}.\n" +
                   "- **Find Minimum Element:** The minimum is the pivot. Use binary search to find where the order breaks (e.g., compare `arr[mid]` with `arr[high]`):contentReference[oaicite:15]{index=15}.\n" +
                   "- **Count Rotations:** Equal to the index of the minimum element:contentReference[oaicite:16]{index=16}.\n\n" +
                   "Logic for search: At each step, if `arr[mid] == target`, return it. Otherwise, check if the left half is sorted (`arr[left] <= arr[mid]`); if so and target is in `[arr[left],arr[mid])`, move `right=mid-1`, else `left=mid+1`. If right half is sorted, apply similar logic:contentReference[oaicite:17]{index=17}.",
      exampleProblems: ["Search in a rotated sorted array", "Find minimum in a rotated sorted array"],
      solutions: [{
        problemTitle: "Search in a rotated sorted array",
        code: "public int searchRotated(int[] arr, int target) {\n" +
              "    int left = 0, right = arr.length - 1;\n" +
              "    while (left <= right) {\n" +
              "        int mid = left + (right - left) / 2;\n" +
              "        if (arr[mid] == target) return mid;\n" +
              "        if (arr[left] <= arr[mid]) { // left half is sorted\n" +
              "            if (target >= arr[left] && target < arr[mid]) {\n" +
              "                right = mid - 1;\n" +
              "            } else {\n" +
              "                left = mid + 1;\n" +
              "            }\n" +
              "        } else { // right half is sorted\n" +
              "            if (target > arr[mid] && target <= arr[right]) {\n" +
              "                left = mid + 1;\n" +
              "            } else {\n" +
              "                right = mid - 1;\n" +
              "            }\n" +
              "        }\n" +
              "    }\n" +
              "    return -1;\n" +
              "}",
        explanation: "At each step, determine which half is sorted:\n" +
                     "- If `arr[left] <= arr[mid]`, the left half is sorted. If the target lies between `arr[left]` and `arr[mid]`, search left (`right = mid - 1`); otherwise search right (`left = mid + 1`).\n" +
                     "- Otherwise the right half is sorted. If target lies between `arr[mid]` and `arr[right]`, search right; otherwise left.\n" +
                     "Repeat until found or empty.\n\n" +
                     "**Dry Run:** For `arr = [4,5,6,7,0,1,2]`, `target = 0`, the algorithm finds it at index 4.\n" +
                     "**Complexity:** O(log N)."
      },
      {
        problemTitle: "Find minimum in a rotated sorted array",
        code: "public int findMin(int[] nums) {\n" +
              "    if (nums == null || nums.length == 0) return -1;\n" +
              "    if (nums.length == 1) return nums[0];\n" +
              "    int left = 0, right = nums.length - 1;\n" +
              "    \n" +
              "    if (nums[left] < nums[right]) { \n" +
              "        return nums[left]; \n" +
              "    }\n" +
              "    \n" +
              "    while (left <= right) {\n" +
              "        int mid = left + (right - left) / 2;\n" +
              "        \n" +
              "        // Case 1: mid is the smallest element\n" +
              "        if (mid > 0 && nums[mid] < nums[mid - 1]) {\n" +
              "            return nums[mid];\n" +
              "        }\n" +
              "        \n" +
              "        // Case 2: Left half is sorted, min must be in the right half\n" +
              "        if (nums[left] <= nums[mid]) {\n" +
              "            left = mid + 1;\n" +
              "        } \n" +
              "        // Case 3: Right half is sorted, min must be in the left half\n" +
              "        else {\n" +
              "            right = mid - 1;\n" +
              "        }\n" +
              "    }\n" +
              "    return -1; // Should not be reached\n" +
              "}",
        explanation: "The minimum element is the only element that is smaller than its predecessor. We exploit the rotation:\n" +
                     "- **Base Case:** If the array is fully sorted (`nums[left] < nums[right]`), the minimum is `nums[left]`.\n" +
                     "- **Pivot Check:** If `nums[mid] < nums[mid - 1]`, then `nums[mid]` is the minimum.\n" +
                     "- **Search Direction:** If the left half is sorted (`nums[left] <= nums[mid]`), the pivot (min) must be in the unsorted right half, so we move `left = mid + 1`. Otherwise, the right half is sorted, and the min is in the left half, so we move `right = mid - 1`.\n\n" +
                     "**Dry Run:** For `arr = [4,5,1,2,3]`:\n" +
                     "- `left=0, right=4`. `mid=2` (value 1). `nums[2] < nums[1]` (1 < 5) is TRUE. Return 1.\n" +
                     "**Complexity:** O(log N)."
      }]
    },
    {
      title: "Single Non-Duplicate Element",
      description: "Given a sorted array where every element appears twice except one, find that unique element in *O*(log N). Key idea:\n" +
                   "- Pair elements via index parity. For an even index `i`, the pair is `(i, i+1)`; for odd, `(i-1, i)`. All pairs align until the single element.\n" +
                   "- Use binary search on index. Compare `arr[mid]` with `arr[mid^1]` (flips the last bit). If equal, move right; if not, move left:contentReference[oaicite:18]{index=18}.\n\n" +
                   "Once past the unique element, the pairing order shifts:contentReference[oaicite:19]{index=19}.",
      exampleProblems: ["Single element in a sorted array"],
      solutions: [{
        problemTitle: "Single element in a sorted array",
        code: "public int singleNonDuplicate(int[] arr) {\n" +
              "    int left = 0, right = arr.length - 1;\n" +
              "    while (left < right) {\n" +
              "        int mid = left + (right - left) / 2;\n" +
              "        if (mid % 2 == 1) mid--; // make mid even\n" +
              "        if (arr[mid] == arr[mid+1]) {\n" +
              "            left = mid + 2;\n" +
              "        } else {\n" +
              "            right = mid;\n" +
              "        }\n" +
              "    }\n" +
              "    return arr[left];\n" +
              "}",
        explanation: "We pair elements by index. If `mid` is odd, decrement it to make it even. Compare `arr[mid]` with `arr[mid+1]`:\n" +
                     "- If they match, the single element is to the right of `mid+1`; set `left = mid + 2`.\n" +
                     "- If they differ, it's at `mid` or to the left; set `right = mid`.\n" +
                     "When `left == right`, that index has the single element.\n\n" +
                     "**Dry Run:** `arr = [1,1,2,3,3,4,4]`. `left=0, right=6`. `mid=3` (odd) → `mid=2` (value 2). `arr[2] != arr[3]` (2 != 3). `right=2`. Next iteration: `left=0, right=2`. `mid=1` (odd) → `mid=0` (value 1). `arr[0] == arr[1]` (1 == 1). `left=2`. Loop ends: `left=2, right=2`. Return `arr[2]` (value 2).\n" +
                     "**Complexity:** O(log N)."
      }]
    },
    {
      title: "Binary Search on Answer (Monotonic Conditions)",
      description: "Use when optimizing or searching for a threshold that satisfies a condition monotonically. The search space is the range of possible answers. If a condition holds at `mid`, it holds for all larger (or smaller) values, allowing binary search.\n" +
                   "Key cases:\n" +
                   "- **Monotonic Functions:** e.g. finding floor of square root or nth-root by binary search on the result (since `x^2` is monotonic):contentReference[oaicite:20]{index=20}.\n" +
                   "- **Capacity/Feasibility:** Koko eating bananas (search eating speed):contentReference[oaicite:21]{index=21}, minimizing maximum sum when splitting arrays:contentReference[oaicite:22]{index=22}, or book allocation.\n" +
                   "- **Threshold Checks:** Find smallest divisor given sum threshold:contentReference[oaicite:23]{index=23}, minimum days for bouquets:contentReference[oaicite:24]{index=24}, aggressive cows distance:contentReference[oaicite:25]{index=25}, gas station penalty:contentReference[oaicite:26]{index=26}, etc.\n\n" +
                   "Define a predicate `check(x)`. If `check(x)` is true (feasible), search lower; otherwise search higher. The predicate must be monotonic:contentReference[oaicite:27]{index=27}:contentReference[oaicite:28]{index=28}.",
      exampleProblems: ["Koko Eating Bananas", "Minimum days to make M bouquets"],
      solutions: [{
        problemTitle: "Koko Eating Bananas",
        code: "public int minEatingSpeed(int[] piles, int h) {\n" +
              "    int lo = 1;\n" +
              "    int hi = 0;\n" +
              "    for (int p : piles) hi = Math.max(hi, p);\n" +
              "    int ans = hi;\n" +
              "    while (lo <= hi) {\n" +
              "        int mid = lo + (hi - lo) / 2;\n" +
              "        long hours = 0;\n" +
              "        for (int p : piles) {\n" +
              "            hours += (p + mid - 1) / mid;\n" +
              "        }\n" +
              "        if (hours <= h) {\n" +
              "            ans = mid;\n" +
              "            hi = mid - 1;\n" +
        "        } else {\n" +
              "            lo = mid + 1;\n" +
              "        }\n" +
              "    }\n" +
              "    return ans;\n" +
              "}",
        explanation: "Binary search on eating speed `k`. Compute total hours at speed `mid` by summing `ceil(pile/mid)`:contentReference[oaicite:29]{index=29}:\n" +
                     "- If `hours <= h`, `mid` is feasible; record it and search lower (`hi = mid - 1`).\n" +
                     "- Else `mid` too slow; search higher (`lo = mid + 1`).\n" +
                     "**Dry Run:** `piles=[5,10,3]`, `h=4`. `lo=1, hi=10`. Try `mid=5` → hours=4 (feasible), set `ans=5, hi=4`. Then `mid=2` → hours=10 (not feasible), set `lo=3`, etc. Final answer=5.\n" +
                     "**Complexity:** O(N log M) where M = max(pile)."
      },
      {
        problemTitle: "Minimum days to make M bouquets",
        code: "public int minDays(int[] bloomDay, int m, int k) {\n" +
              "    if ((long)m * k > bloomDay.length) return -1;\n" +
              "    int low = 1, high = 1000000000, ans = high;\n" +
              "    while (low <= high) {\n" +
              "        int mid = low + (high - low) / 2;\n" +
              "        if (isFeasible(bloomDay, m, k, mid)) {\n" +
              "            ans = mid;\n" +
              "            high = mid - 1;\n" +
              "        } else {\n" +
              "            low = mid + 1;\n" +
              "        }\n" +
              "    }\n" +
              "    return ans;\n" +
              "}\n\n" +
              "private boolean isFeasible(int[] arr, int m, int k, int days) {\n" +
              "    int bouquets = 0, flowers = 0;\n" +
              "    for (int bloom : arr) {\n" +
              "        if (bloom <= days) {\n" +
              "            flowers++;\n" +
              "            if (flowers == k) {\n" +
              "                bouquets++;\n" +
              "                flowers = 0;\n" +
              "            }\n" +
              "        } else {\n" +
              "            flowers = 0;\n" +
              "        }\n" +
              "    }\n" +
              "    return bouquets >= m;\n" +
              "}",
        explanation: "We search for the minimum required day (`ans`) in the range of possible days (1 to max bloom day). The feasibility check (`isFeasible`) determines if we can make `m` bouquets by day `mid`.\n" +
                     "- **Feasibility Check:** Iterate through `bloomDay`. If a flower blooms by day `mid`, count it. If `k` consecutive flowers bloom, increment `bouquets` and reset the count.\n" +
                     "- **Binary Search:** If `isFeasible` is true, we might find a smaller day, so we save `ans = mid` and search left (`high = mid - 1`). Otherwise, we need more time, so search right (`low = mid + 1`).\n\n" +
                     "**Dry Run:** `bloomDay = [1,10,3,10,2]`, `m=3`, `k=1`. We need 3 bouquets of 1 flower.\n" +
                     "- Search space `[1, 10]`. Try `mid=5`. Feasible check for day 5: [Bloom, No, Bloom, No, Bloom]. Bouquets = 3. Feasible. `ans=5, high=4`.\n" +
                     "- Try `mid=2`. Feasible check for day 2: [Bloom, No, No, No, Bloom]. Bouquets = 2. NOT feasible. `low=3`.\n" +
                     "- ...  3 days.\n" +
                     "**Complexity:** O(N log D) where D is the range of bloom days."
      }]
    },
    {
      title: "Median / K-th of Two Sorted Arrays",
      description: "Find the median or k-th element in the union of two sorted arrays (sizes *n* and *m*) in ~O(log(min(n,m))). Use binary search on one array to partition both:contentReference[oaicite:30]{index=30}.\n" +
                   "Approach: Ensure `A` is the smaller array. Binary search its index `i`, set `j = (n+m+1)/2 - i`. Make sure all elements in left parts (`A[0..i-1]`, `B[0..j-1]`) are ≤ all in right parts (`A[i..]`, `B[j..]`):contentReference[oaicite:31]{index=31}. Then median is max of lefts or average of max left and min right.\n" +
                   "This works in O(log(min(n,m))).",
      exampleProblems: ["Median of two sorted arrays", "Kth element of two sorted arrays"],
      solutions: [{
        problemTitle: "Median of two sorted arrays",
        code: "public double findMedianSortedArrays(int[] A, int[] B) {\n" +
              "    int n = A.length, m = B.length;\n" +
              "    if (n > m) return findMedianSortedArrays(B, A);\n" +
              "    int lo = 0, hi = n;\n" +
              "    int halfLen = (n + m + 1) / 2;\n" +
              "    while (lo <= hi) {\n" +
              "        int midA = lo + (hi - lo) / 2;\n" +
              "        int midB = halfLen - midA;\n" +
              "        \n" +
              "        int L1 = (midA == 0) ? Integer.MIN_VALUE : A[midA-1];\n" +
              "        int R1 = (midA == n) ? Integer.MAX_VALUE : A[midA];\n" +
              "        int L2 = (midB == 0) ? Integer.MIN_VALUE : B[midB-1];\n" +
              "        int R2 = (midB == m) ? Integer.MAX_VALUE : B[midB];\n" +
              "        \n" +
              "        if (L1 <= R2 && L2 <= R1) {\n" +
              "            // Correct partition found\n" +
              "            if ((n + m) % 2 == 1) return Math.max(L1, L2);\n" +
              "            return (Math.max(L1, L2) + Math.min(R1, R2)) / 2.0;\n" +
              "        } else if (L1 > R2) {\n" +
              "            // A's left partition is too big, move A's cut left\n" +
              "            hi = midA - 1;\n" +
              "        } else {\n" +
              "            // A's left partition is too small, move A's cut right\n" +
              "            lo = midA + 1;\n" +
              "        }\n" +
              "    }\n" +
              "    return 0.0;\n" +
              "}",
        explanation: "Binary search on the smaller array `A`. We determine the partition index `midA` in `A`, and `midB` in `B` is derived to ensure total elements on the left side (`midA + midB`) equals `(n+m+1)/2`.\n" +
                     "We need to satisfy the condition: `max(L1, L2) <= min(R1, R2)`.\n" +
                     "- If `L1 > R2`, we cut too many small elements from `A`, so we search left (`hi = midA - 1`).\n" +
                     "- If `L2 > R1`, we cut too few small elements from `A`, so we search right (`lo = midA + 1`).\n" +
                     "- If valid, the median is calculated from the maximum of the left partitions (`L1, L2`) and the minimum of the right partitions (`R1, R2`).\n" +
                     "**Complexity:** O(log(min(n,m)))."
      },
      {
        problemTitle: "Kth element of two sorted arrays",
        code: "public int findKthElement(int[] A, int[] B, int k) {\n" +
              "    int n = A.length, m = B.length;\n" +
              "    if (n > m) return findKthElement(B, A, k);\n" +
              "    \n" +
              "    // Search space for partition in A is [max(0, k-m), min(k, n)]\n" +
              "    int low = Math.max(0, k - m);\n" +
              "    int high = Math.min(k, n);\n" +
              "    \n" +
              "    while (low <= high) {\n" +
              "        int midA = low + (high - low) / 2; // Partition size in A\n" +
              "        int midB = k - midA;              // Partition size in B\n" +
              "        \n" +
              "        int L1 = (midA == 0) ? Integer.MIN_VALUE : A[midA - 1];\n" +
              "        int R1 = (midA == n) ? Integer.MAX_VALUE : A[midA];\n" +
              "        int L2 = (midB == 0) ? Integer.MIN_VALUE : B[midB - 1];\n" +
              "        int R2 = (midB == m) ? Integer.MAX_VALUE : B[midB];\n" +
              "        \n" +
              "        if (L1 <= R2 && L2 <= R1) {\n" +
              "            // Partition is correct: k-th element is max of left parts\n" +
              "            return Math.max(L1, L2);\n" +
              "        } else if (L1 > R2) {\n" +
              "            high = midA - 1;\n" +
              "        } else {\n" +
              "            low = midA + 1;\n" +
              "        }\n" +
              "    }\n" +
              "    return -1; // Should not be reached\n" +
              "}",
        explanation: "This is a direct application of the Median approach. We search for partitions `midA` and `midB` such that `midA + midB = k`. This means the `k`-th element will be among the elements `A[0...midA-1]` and `B[0...midB-1]`.\n" +
                     "The condition for the correct partition remains `L1 <= R2` and `L2 <= R1`.\n" +
                     "- Once the correct partition is found, the **k-th element** is simply the largest element in the combined left partition: `max(L1, L2)`.\n" +
                     "- The search space for `midA` is constrained by $k$: we need at least $k-m$ elements from $A$ (if $B$ contributes its max $m$ elements) and at most $\min(k, n)$ elements from $A$.\n" +
                     "**Complexity:** O(log(min(n,m)))."
      }]
    },
    {
      title: "Search in 2D Matrices",
      description: "Common 2D search tasks:\n" +
                   "- **Search in 2D Matrix I:** Each row and column is sorted and each row’s last < next row’s first. Treat the matrix as a flat sorted array and binary search by mapping index to `(row,col)`:contentReference[oaicite:33]{index=33}.\n" +
                   "- **Search in 2D Matrix II:** Each row and column sorted (no global ordering). Use 'staircase' search: start at top-right, move left if current > target or down if < target (O(m+n)).\n" +
                   "- **Row with Maximum 1s:** If each row is sorted 0→1, find first 1 via binary search in each row:contentReference[oaicite:34]{index=34}; the row with the earliest 1 has the most ones.\n\n" +
                   "We illustrate searching in a sorted 2D matrix (type I).",
      exampleProblems: ["Search in a 2D matrix (I)", "Search in a 2D matrix (II)"],
      solutions: [{
        problemTitle: "Search in a 2D matrix (I)",
        code: "public boolean searchMatrix(int[][] matrix, int target) {\n" +
              "    int m = matrix.length;\n" +
              "    if (m == 0) return false;\n" +
              "    int n = matrix[0].length;\n" +
              "    int left = 0, right = m * n - 1;\n" +
              "    while (left <= right) {\n" +
              "        int mid = left + (right - left) / 2;\n" +
              "        int r = mid / n;\n" +
              "        int c = mid % n;\n" +
              "        if (matrix[r][c] == target) return true;\n" +
              "        if (matrix[r][c] < target) left = mid + 1;\n" +
              "        else right = mid - 1;\n" +
              "    }\n" +
              "    return false;\n" +
              "}",
        explanation: "Flatten the matrix (row-major) into index range `[0, m*n-1]`. At `mid`, decode `(row, col) = (mid/n, mid%n)`. Compare `matrix[row][col]` with `target`:\n" +
                     "- If equal, return true.\n" +
                     "- If less, search right half (`left = mid + 1`); else search left half.\n" +
                     "**Complexity:** O(log(m*n))."
      },
      {
        problemTitle: "Search in a 2D matrix (II)",
        code: "public boolean searchMatrix2(int[][] matrix, int target) {\n" +
              "    int m = matrix.length;\n" +
              "    if (m == 0) return false;\n" +
              "    int n = matrix[0].length;\n" +
              "    \n" +
              "    int row = 0;\n" +
              "    int col = n - 1;\n" +
              "    \n" +
              "    while (row < m && col >= 0) {\n" +
              "        if (matrix[row][col] == target) {\n" +
              "            return true;\n" +
              "        } else if (matrix[row][col] < target) {\n" +
              "            // Current value is too small, eliminate the current row\n" +
              "            row++;\n" +
              "        } else {\n" +
              "            // Current value is too large, eliminate the current column\n" +
              "            col--;\n" +
              "        }\n" +
              "    }\n" +
              "    return false;\n" +
              "}",
        explanation: "This problem uses the **Staircase Search** pattern, which is $O(m+n)$ and is suitable when rows and columns are sorted, but there's no global sorted property (Type II matrices).\n" +
                     "1. Start at the top-right corner (`row=0, col=n-1`).\n" +
                     "2. If `matrix[row][col] == target`, return true.\n" +
                     "3. If `matrix[row][col] < target`, move down (`row++`) because the entire current row to the left has smaller values.\n" +
                     "4. If `matrix[row][col] > target`, move left (`col--`) because the entire current column below has larger values.\n\n" +
                     "**Dry Run:** `matrix = [[1,4],[2,5]]`, `target=5`.\n" +
                     "- Start: `(0, 1)`, value 4. $4 < 5$, move `row++`.\n" +
                     "- Next: `(1, 1)`, value 5. $5 == 5$. Return True.\n" +
                     "**Complexity:** O(M + N)."
      }]
    }
  ]
};