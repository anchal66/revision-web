export const data = {
  title: 'Tries',
  description: 'A Trie, or prefix tree, is a specialized tree data structure used for efficient storage and retrieval of a set of strings. It is ideal for any problem involving prefix-based operations.',
  patterns: [
    {
      title: 'Standard Trie Implementation',
      description: 'The fundamental implementation involving a TrieNode class and methods for `insert`, `search`, and `startsWith`. This forms the basis for solving many string and prefix-related problems.',
      exampleProblems: ['Implement Trie (Prefix Tree)', 'Word Search II', 'Design Add and Search Words Data Structure'],
      solution: {
        problemTitle: 'Implement Trie (Prefix Tree)',
        code: `class TrieNode {
    public TrieNode[] children;
    public boolean isEndOfWord;

    public TrieNode() {
        children = new TrieNode[26]; // for 'a' through 'z'
        isEndOfWord = false;
    }
}

class Trie {
    private TrieNode root;

    public Trie() {
        root = new TrieNode();
    }

    public void insert(String word) {
        TrieNode current = root;
        for (char c : word.toCharArray()) {
            int index = c - 'a';
            if (current.children[index] == null) {
                current.children[index] = new TrieNode();
            }
            current = current.children[index];
        }
        current.isEndOfWord = true;
    }

    public boolean search(String word) {
        TrieNode node = searchPrefix(word);
        return node != null && node.isEndOfWord;
    }

    public boolean startsWith(String prefix) {
        return searchPrefix(prefix) != null;
    }

    private TrieNode searchPrefix(String word) {
        TrieNode current = root;
        for (char c : word.toCharArray()) {
            int index = c - 'a';
            if (current.children[index] == null) {
                return null; // Path does not exist.
            }
            current = current.children[index];
        }
        return current;
    }
}
// Time Complexity: O(L) for all operations, where L is word length
// Space Complexity: O(N * L_avg)`,
        explanation: 'This implementation uses a `TrieNode` class with an array of children. The `insert`, `search`, and `startsWith` methods traverse the tree from the root, character by character, to perform their respective operations efficiently.'
      }
    },
  ]
};