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
      // !!! CHANGE HERE: 'solution' is now 'solutions' (an array)
      solutions: [{
        problemTitle: "Search for a Target in a Sorted Array",
        code: "public int search(int[] arr, int target) {\n" +
              "    int left = 0, right = arr.length - 1;\n" +
              "    while (left <= right) {\n" +
              "        int mid = left + (right - left) / 2;\n" +
              "        if (arr[mid] == target) return mid;\n" +
              "        if (arr[mid] < target) left = mid + 1;\n" +
              "        else right = mid - 1;\n" +
              "    }\n" +
              "    return -1;  // target not found\n" +
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
      // !!! CHANGE HERE: 'solution' is now 'solutions' (an array)
      solutions: [{
        problemTitle: "Search in Rotated Sorted Array (No Duplicates)",
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
              "    return -1; // not found\n" +
              "}",
        explanation: "At each step, determine which half is sorted:\n" +
                     "- If `arr[left] <= arr[mid]`, the left half is sorted. If the target lies between `arr[left]` and `arr[mid]`, search left (`right = mid - 1`); otherwise search right (`left = mid + 1`).\n" +
                     "- Otherwise the right half is sorted. If target lies between `arr[mid]` and `arr[right]`, search right; otherwise left.\n" +
                     "Repeat until found or empty.\n\n" +
                     "**Example:** For `arr = [4,5,6,7,0,1,2]`, `target = 0`, the algorithm finds it at index 4.\n" +
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
      // !!! CHANGE HERE: 'solution' is now 'solutions' (an array)
      solutions: [{
        problemTitle: "Find the Single Non-Duplicate Element",
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
                     "**Example:** `arr = [1,1,2,3,3]`. We find `2` at index 2.\n" +
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
      // !!! CHANGE HERE: 'solution' is now 'solutions' (an array)
      solutions: [{
        problemTitle: "Koko Eating Bananas (Binary Search on Rate)",
        code: "public int minEatingSpeed(int[] piles, int h) {\n" +
              "    int lo = 1;\n" +
              "    int hi = 0;\n" +
              "    for (int p : piles) hi = Math.max(hi, p);\n" +
              "    int ans = hi;\n" +
              "    while (lo <= hi) {\n" +
              "        int mid = lo + (hi - lo) / 2;\n" +
              "        long hours = 0;\n" +
              "        for (int p : piles) {\n" +
              "            hours += (p + mid - 1) / mid; // ceil(p/mid)\n" +
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
                     "**Example:** `piles=[5,10,3]`, `h=4`. `lo=1, hi=10`. Try `mid=5` → hours=4 (feasible), set `ans=5, hi=4`. Then `mid=2` → hours=10 (not feasible), set `lo=3`, etc. Final answer=5.\n" +
                     "**Complexity:** O(N log M) where M = max(pile)."
      }]
    },
    {
      title: "Median / K-th of Two Sorted Arrays",
      description: "Find the median or k-th element in the union of two sorted arrays (sizes *n* and *m*) in ~O(log(min(n,m))). Use binary search on one array to partition both:contentReference[oaicite:30]{index=30}.\n" +
                   "Approach: Ensure `A` is the smaller array. Binary search its index `i`, set `j = (n+m+1)/2 - i`. Make sure all elements in left parts (`A[0..i-1]`, `B[0..j-1]`) are ≤ all in right parts (`A[i..]`, `B[j..]`):contentReference[oaicite:31]{index=31}. Then median is max of lefts or average of max left and min right.\n" +
                   "This works in O(log(min(n,m))).",
      exampleProblems: ["Median of two sorted arrays", "Kth element of two sorted arrays"],
      // !!! CHANGE HERE: 'solution' is now 'solutions' (an array)
      solutions: [{
        problemTitle: "Median of Two Sorted Arrays",
        code: "public double findMedianSortedArrays(int[] A, int[] B) {\n" +
              "    int n = A.length, m = B.length;\n" +
              "    if (n > m) return findMedianSortedArrays(B, A);\n" +
              "    int lo = 0, hi = n;\n" +
              "    while (lo <= hi) {\n" +
              "        int midA = (lo + hi) / 2;\n" +
              "        int midB = (n + m + 1) / 2 - midA;\n" +
              "        int L1 = (midA == 0) ? Integer.MIN_VALUE : A[midA-1];\n" +
              "        int R1 = (midA == n) ? Integer.MAX_VALUE : A[midA];\n" +
              "        int L2 = (midB == 0) ? Integer.MIN_VALUE : B[midB-1];\n" +
              "        int R2 = (midB == m) ? Integer.MAX_VALUE : B[midB];\n" +
              "        if (L1 <= R2 && L2 <= R1) {\n" +
              "            if ((n + m) % 2 == 1) return Math.max(L1, L2);\n" +
              "            return (Math.max(L1, L2) + Math.min(R1, R2)) / 2.0;\n" +
              "        } else if (L1 > R2) {\n" +
              "            hi = midA - 1;\n" +
              "        } else {\n" +
              "            lo = midA + 1;\n" +
              "        }\n" +
              "    }\n" +
              "    return 0.0; // should never happen\n" +
              "}",
        explanation: "Binary search on the smaller array `A`. Let `i=midA`, `j=(n+m+1)/2 - i`. `L1,R1` are values around `i` in `A`, `L2,R2` around `j` in `B`. We want `L1 ≤ R2` and `L2 ≤ R1`:contentReference[oaicite:32]{index=32}:\n" +
                     "- If valid, median is `max(L1,L2)` (if total length is odd) or average of `max(L1,L2)` and `min(R1,R2)` (if even).\n" +
                     "- If `L1 > R2`, move `hi = midA-1`; else move `lo = midA+1`.\n" +
                     "This finds the correct partition in O(log(min(n,m)))."
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
      // !!! CHANGE HERE: 'solution' is now 'solutions' (an array)
      solutions: [{
        problemTitle: "Search in a 2D Sorted Matrix",
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
      }]
    }
  ]
};