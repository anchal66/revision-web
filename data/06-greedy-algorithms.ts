export const data = {
  title: 'Greedy Algorithms',
  description: 'Greedy algorithms construct a solution by making a sequence of locally optimal choices, hoping to arrive at a global optimum. Sorting the input is often a critical first step.',
  patterns:,
      solution: {
        problemTitle: 'Merge Intervals',
        code: `import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

class Solution {
    public int merge(int intervals) {
        if (intervals.length <= 1) {
            return intervals;
        }

        // Step 1: Sort intervals by start time.
        Arrays.sort(intervals, (a, b) -> Integer.compare(a, b));

        List<int> merged = new ArrayList<>();
        merged.add(intervals);

        // Step 2: Iterate and merge.
        for (int i = 1; i < intervals.length; i++) {
            int currentInterval = intervals[i];
            int lastMergedInterval = merged.get(merged.size() - 1);

            if (currentInterval <= lastMergedInterval[1]) {
                // Overlap detected, merge them.
                lastMergedInterval[1] = Math.max(lastMergedInterval[1], currentInterval[1]);
            } else {
                // No overlap, add as a new interval.
                merged.add(currentInterval);
            }
        }

        return merged.toArray(new int[merged.size()]);
    }
}
// Time Complexity: O(n log n) due to sorting
// Space Complexity: O(n) for the result list`,
        explanation: 'The greedy strategy is to sort the intervals by their start times. This allows the algorithm to consider each interval in order and merge it with the previous one if they overlap, ensuring a linear-time merge pass after the initial sort.'
      }
    }
  ]
};