export const data = {
  title: 'Heaps',
  description: 'A heap (or Priority Queue) is a specialized tree-based data structure that satisfies the heap property, allowing for efficient retrieval of the minimum or maximum element.',
  patterns: [
    {
      title: 'Top K Elements',
      description: 'This pattern uses a min-heap of size K to efficiently find the Kth largest/smallest element or the top K frequent/largest/smallest elements in a collection.',
      exampleProblems: ['Kth Largest Element in an Array', 'Top K Frequent Elements', 'K Closest Points to Origin'],
      solutions: [{
        problemTitle: 'Kth Largest Element in an Array',
        code: `import java.util.PriorityQueue;

class Solution {
    public int findKthLargest(int[] nums, int k) {
        // Use a min-heap to keep track of the k largest elements.
        PriorityQueue<Integer> minHeap = new PriorityQueue<>();

        for (int num : nums) {
            minHeap.offer(num);

            // If the heap size exceeds k, remove the smallest element.
            if (minHeap.size() > k) {
                minHeap.poll();
            }
        }

        // The root of the heap is the k-th largest element.
        return minHeap.peek();
    }
}
// Time Complexity: O(n log k)
// Space Complexity: O(k)`,
        explanation: 'This solution maintains a min-heap of size `k`. For each number, it adds it to the heap. If the heap grows larger than `k`, the smallest element is removed. This ensures the heap always holds the top `k` largest elements seen so far.'
      }]
    },
    {
      title: 'Two Heaps for Median Finding',
      description: 'This pattern is designed for finding the median of a dynamically growing data stream. It uses a max-heap for the smaller half and a min-heap for the larger half, keeping them balanced.',
      exampleProblems: ['Find Median from Data Stream'],
      solutions: [{
        problemTitle: 'Find Median from Data Stream',
        code: `import java.util.PriorityQueue;
import java.util.Collections;

class MedianFinder {
    private PriorityQueue<Integer> maxHeap; // Stores the smaller half
    private PriorityQueue<Integer> minHeap; // Stores the larger half

    public MedianFinder() {
        maxHeap = new PriorityQueue<>(Collections.reverseOrder());
        minHeap = new PriorityQueue<>();
    }

    public void addNum(int num) {
        maxHeap.offer(num);
        minHeap.offer(maxHeap.poll());
        if (minHeap.size() > maxHeap.size()) {
            maxHeap.offer(minHeap.poll());
        }
    }

    public double findMedian() {
        if (maxHeap.size() == minHeap.size()) {
            return (maxHeap.peek() + minHeap.peek()) / 2.0;
        } else {
            return maxHeap.peek();
        }
    }
}
// Time Complexity: O(log n) for addNum, O(1) for findMedian
// Space Complexity: O(n)`,
        explanation: 'This solution uses two heaps to keep the numbers partitioned and balanced. The max-heap stores the smaller half, and the min-heap stores the larger half. This structure ensures the median can always be calculated in constant time from the roots of the heaps.'
      }]
    }
  ]
};