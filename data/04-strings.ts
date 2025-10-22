export const data = {
  title: 'Strings',
  description: 'String problems are ubiquitous and often serve as a medium to test other algorithmic patterns, such as dynamic programming, two pointers, or sliding window.',
  patterns:[j]`, is often used to store a solution for substrings `s1[0..i]` and `s2[0..j]`.',
      exampleProblems:,
      solution: {
        problemTitle: 'Longest Palindromic Substring',
        code: `class Solution {
    public String longestPalindrome(String s) {
        if (s == null |

| s.length() < 1) {
            return "";
        }
        int start = 0;
        int end = 0;

        for (int i = 0; i < s.length(); i++) {
            // Odd length palindrome (center is 'i')
            int len1 = expandAroundCenter(s, i, i);
            // Even length palindrome (center is between 'i' and 'i+1')
            int len2 = expandAroundCenter(s, i, i + 1);
            
            int len = Math.max(len1, len2);

            if (len > end - start) {
                start = i - (len - 1) / 2;
                end = i + len / 2;
            }
        }
        return s.substring(start, end + 1);
    }

    private int expandAroundCenter(String s, int left, int right) {
        while (left >= 0 && right < s.length() && s.charAt(left) == s.charAt(right)) {
            left--;
            right++;
        }
        return right - left - 1;
    }
}
// Time Complexity: O(n^2)
// Space Complexity: O(1)`,
        explanation: 'This efficient "expand from center" approach iterates through every possible center of a palindrome (both single characters and spaces between characters). For each center, it expands outwards to find the longest palindrome, achieving O(n^2) time with O(1) space.'
      }
    }
  ]
};