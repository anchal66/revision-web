export const data = {
  title: 'Strings',
  description: 'String problems are ubiquitous and often serve as a medium to test other algorithmic patterns, such as dynamic programming, two pointers, or sliding window. Specific string algorithms also exist for more complex search and manipulation tasks.',
  patterns: [
    {
      title: '2D Dynamic Programming',
      description: 'Many string problems involving two strings can be solved with a 2D DP table, where `dp[i][j]` typically stores a solution for substrings `s1[0..i]` and `s2[0..j]`.',
      exampleProblems: ['Longest Common Subsequence', 'Edit Distance', 'Interleaving String'],
      solutions: [{
        problemTitle: 'Longest Common Subsequence',
        code: `class Solution {
    public int longestCommonSubsequence(String text1, String text2) {
        int m = text1.length();
        int n = text2.length();
        int dp = new int[m + 1][n + 1];

        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (text1.charAt(i - 1) == text2.charAt(j - 1)) {
                    dp[i][j] = 1 + dp[i - 1][j - 1];
                } else {
                    dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
                }
            }
        }
        return dp[m][n];
    }
}
// Time Complexity: O(m * n)
// Space Complexity: O(m * n)`,
        explanation: 'This tabulation solution uses a 2D array where `dp[i][j]` stores the LCS length for `text1[0..i-1]` and `text2[0..j-1]`. If characters match, the length increases by 1 from the diagonal. If not, it takes the max from the top or left cell, representing the optimal choice of excluding one character.'
      }]
    },
    {
      title: 'Expand From Center',
      description: 'A highly efficient technique for palindrome-related problems. It iterates through each character (and space between characters) as a potential center and expands outwards.',
      exampleProblems: ['Longest Palindromic Substring', 'Palindromic Substrings'],
      solutions: [{
        problemTitle: 'Longest Palindromic Substring',
        code: `class Solution {
    public String longestPalindrome(String s) { 
        if (s == null || s.length() < 1) return "";
        int start = 0;
        int end = 0;

        for (int i = 0; i < s.length(); i++) {
            int len1 = expandAroundCenter(s, i, i);
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
        explanation: 'This approach considers all 2n-1 possible centers of a palindrome. For each center, it expands outwards with two pointers, checking for character equality. This avoids the O(n^2) space complexity of a typical DP solution.'
      }]
    },
    {
      title: 'Advanced Search: Rabin-Karp',
      description: 'Uses a rolling hash function to efficiently compare a pattern\'s hash with the hash of the current window in the text, achieving an average time complexity of O(n+m).',
      exampleProblems: ['Find the Index of the First Occurrence in a String', 'Longest Duplicate Substring'],
      solutions: [{
        problemTitle: 'Rabin-Karp Implementation',
        code: `class RabinKarp {
    private final int PRIME = 101;

    public int search(String text, String pattern) {
        int n = text.length();
        int m = pattern.length();
        long patternHash = createHash(pattern, m);
        long textHash = createHash(text, m);

        for (int i = 0; i <= n - m; i++) {
            if (patternHash == textHash && text.substring(i, i + m).equals(pattern)) {
                return i;
            }
            if (i < n - m) {
                textHash = recalculateHash(text, i, i + m, textHash, m);
            }
        }
        return -1;
    }

    private long createHash(String str, int end) {
        long hash = 0;
        for (int i = 0; i < end; i++) {
            hash += str.charAt(i) * Math.pow(PRIME, i);
        }
        return hash;
    }

    private long recalculateHash(String str, int oldIndex, int newIndex, long oldHash, int patternLen) {
        long newHash = (oldHash - str.charAt(oldIndex)) / PRIME;
        newHash += str.charAt(newIndex) * Math.pow(PRIME, patternLen - 1);
        return newHash;
    }
}
// Time Complexity: Average O(n+m), Worst O(n*m)
// Space Complexity: O(1)`,
        explanation: 'The Rabin-Karp algorithm calculates a hash value for the pattern and the initial window of the text. It then "rolls" the hash across the text in O(1) time per step by subtracting the outgoing character and adding the incoming one. A direct string comparison is only performed when the hashes match.'
      }]
    }
  ]
};