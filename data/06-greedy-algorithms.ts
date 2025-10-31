export const data = {
  title: 'Greedy Algorithms',
  description: 'Greedy algorithms construct a solution by making a sequence of locally optimal choices, hoping to arrive at a global optimum. Sorting the input is often a critical first step.',
  patterns: [
    {
      title: 'Sort and Process',
      description: 'A common greedy strategy where sorting the input by a specific criterion simplifies the problem, allowing for a linear pass to make locally optimal choices.',
      exampleProblems: ['Merge Intervals', 'Non-overlapping Intervals', 'Minimum Number of Arrows to Burst Balloons'],
      solutions: [{
        problemTitle: 'Merge Intervals',
        code: `import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

class Solution {
    public int[][] merge(int[][] intervals) {
        if (intervals.length <= 1) {
            return intervals;
        }
        
        // The greedy choice starts here: sort by the interval start time.
        Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));

        List<int[]> merged = new ArrayList<>();
        merged.add(intervals[0]);

        for (int i = 1; i < intervals.length; i++) {
            int[] currentInterval = intervals[i];
            int[] lastMergedInterval = merged.get(merged.size() - 1);

            // Check for overlap.
            if (currentInterval[0] <= lastMergedInterval[1]) {
                // If they overlap, the greedy choice is to merge them by extending the
                // end of the last interval to cover the current one.
                lastMergedInterval[1] = Math.max(lastMergedInterval[1], currentInterval[1]);
            } else {
                // No overlap, so we can safely add the current interval.
                merged.add(currentInterval);
            }
        }

        return merged.toArray(new int[merged.size()]);
    }
}
// Time Complexity: O(n log n) due to sorting
// Space Complexity: O(n) for the result list`,
        explanation: 'The greedy strategy is to sort the intervals by their start times. This ensures that when considering an interval, all intervals that could potentially overlap with it and start earlier have already been processed and merged. This ordering allows us to make a simple, locally optimal decision: either merge with the last interval in our result or add a new one.'
      }]
    },
    {
      title: 'Farthest Reach / One-Pass Decision',
      description: 'This pattern involves a single pass through an array, making a greedy decision at each step to maximize a certain metric, such as the farthest reachable index. It\'s about trusting that the best local choice (e.g., jumping to extend your reach as far as possible) will lead to the global solution.',
      exampleProblems: ['Jump Game'],
      solutions: [{
        problemTitle: 'Jump Game',
        code: `class Solution {
    public boolean canJump(int[] nums) {
        int maxReachable = 0;
        for (int i = 0; i < nums.length; i++) {
            // If the current index is beyond the farthest we can reach,
            // it's impossible to proceed.
            if (i > maxReachable) {
                return false;
            }
            
            // The greedy choice: at each step, update the farthest reachable index
                // by considering the jump from the current position.
            maxReachable = Math.max(maxReachable, i + nums[i]);
            
            // Optimization: if we can already reach or pass the end, we can stop.
            if (maxReachable >= nums.length - 1) {
                return true;
            }
        }
        return true;
    }
}
// Time Complexity: O(n)
// Space Complexity: O(1)`,
        explanation: 'The greedy choice here is to always know the maximum reach possible from the positions visited so far. At each index `i`, we check if it\'s reachable. If it is, we update our `maxReachable` by taking the jump from `i`. This works because if a path to the end exists, our `maxReachable` will eventually be greater than or equal to the last index. We are always making the locally optimal choice of extending our reach as far as possible.'
      }]
    },  
    {
      title: 'Greedy with Heaps (Priority Queues)',
      description: 'In some problems, the best greedy choice is not immediately obvious from a sorted list but is the "best" among a dynamic set of options. A priority queue (heap) is perfect for maintaining this set and efficiently retrieving the best option (e.g., the most frequent task, the smallest element) at each step.',
      exampleProblems: ['Task Scheduler'],
      solutions: [{
        problemTitle: 'Task Scheduler',
        code: `import java.util.*;

class Solution {
    public int leastInterval(char[] tasks, int n) {
        if (n == 0) return tasks.length;

        Map<Character, Integer> freqMap = new HashMap<>();
        for (char task : tasks) {
            freqMap.put(task, freqMap.getOrDefault(task, 0) + 1);
        }

        // Max-heap to store frequencies, allowing us to greedily pick the most frequent task.
        PriorityQueue<Integer> maxHeap = new PriorityQueue<>(Collections.reverseOrder());
        maxHeap.addAll(freqMap.values());

        int time = 0;
        // A queue to hold tasks that are in their cooldown period.
        Queue<Map.Entry<Integer, Integer>> cooldownQueue = new LinkedList<>();
        
        while (!maxHeap.isEmpty() ||!cooldownQueue.isEmpty()) {
            time++;

            if (!maxHeap.isEmpty()) {
                int freq = maxHeap.poll();
                freq--;
                if (freq > 0) {
                    // Add the task to the cooldown queue with its available time.
                    cooldownQueue.add(new AbstractMap.SimpleEntry<>(freq, time + n));
                }
            }

            // Check if any tasks in the cooldown queue are ready to be scheduled again.
            if (!cooldownQueue.isEmpty() && cooldownQueue.peek().getValue() == time) {
                maxHeap.add(cooldownQueue.poll().getKey());
            }
        }
        return time;
    }
}
// Time Complexity: O(N * log(M)) where N is total tasks, M is unique tasks (max 26)
// Space Complexity: O(M)`,
        explanation: 'The greedy strategy is to execute the most frequent task at every opportunity to minimize idle time. A max-heap stores task frequencies, so we can always access the most frequent one in O(log M) time. A cooldown queue tracks when tasks can be re-added to the heap. By always prioritizing the highest-frequency task, we ensure the CPU is utilized as much as possible, leading to the shortest overall time.'
      }]
    },
    {
      title: 'Greedy Choice Proof & Pitfalls',
      description: 'The hardest part of greedy algorithms is proving their correctness. A greedy choice is valid if it has the "greedy-choice property": a globally optimal solution can be arrived at by making a sequence of locally optimal choices. This contrasts with Dynamic Programming, where the optimal solution depends on the solutions to subproblems, and a simple local choice might not be enough.',  
      exampleProblems: ['Assign Cookies', 'Coin Change'],
      solutions: [{
        problemTitle: 'Assign Cookies',
        code: `import java.util.Arrays;

class Solution {
    public int findContentChildren(int[] g, int[] s) {
        // Sort both arrays to enable a simple greedy comparison.
        Arrays.sort(g); // g = greed factors
        Arrays.sort(s); // s = cookie sizes

        int contentChildren = 0;
        int cookieIndex = 0;
        int childIndex = 0;

        while (cookieIndex < s.length && childIndex < g.length) {
            // Greedy Choice: Try to satisfy the least greedy child with the smallest available cookie.
            if (s[cookieIndex] >= g[childIndex]) {
                // If the smallest cookie can satisfy the least greedy child,
                // make the assignment and move to the next child.
                contentChildren++;
                childIndex++;
            }
            // Always move to the next cookie, whether it was used or not.
            // If it was too small, it can't satisfy any subsequent, greedier children.
            cookieIndex++;
        }
        return contentChildren;
    }
}
// Time Complexity: O(n log n + m log m) due to sorting
// Space Complexity: O(1) or O(log n + log m) depending on sort implementation`,
        explanation: 'The greedy choice is to always try to satisfy the child with the smallest greed factor using the smallest available cookie. Why does this work? By satisfying the least greedy child with the smallest possible cookie, we save larger cookies for greedier children. This "stay ahead" argument ensures we maximize the number of satisfied children. This contrasts with a problem like Coin Change, where greedily picking the largest coin denomination does not guarantee an optimal solution (e.g., for amount=6 and coins=[1, 4, 5], greedy picks 5+1=2 coins, but optimal is 1+5=2 coins, but for amount=8, greedy picks 5+1+1+1=4 coins, but optimal is 4+4=2 coins).'
      }]
    }
  ]
};