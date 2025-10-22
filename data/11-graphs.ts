export const data = {
  title: 'Graphs',
  description: 'Graphs are the most general data structure, capable of modeling arbitrary relationships. Traversal, pathfinding, and connectivity are the most common problem categories.',
  patterns:,
      solution: {
        problemTitle: 'Number of Islands (DFS)',
        code: `class Solution {
    public int numIslands(char grid) {
        if (grid == null |

| grid.length == 0) {
            return 0;
        }
        int numIslands = 0;
        for (int i = 0; i < grid.length; i++) {
            for (int j = 0; j < grid[i].length; j++) {
                if (grid[i][j] == '1') {
                    numIslands++;
                    dfs(grid, i, j);
                }
            }
        }
        return numIslands;
    }

    private void dfs(char grid, int r, int c) {
        if (r < 0 |

| r >= grid.length |
| c < 0 |
| c >= grid.length |
| grid[r][c] == '0') {
            return;
        }
        
        grid[r][c] = '0'; // Mark as visited
        dfs(grid, r + 1, c);
        dfs(grid, r - 1, c);
        dfs(grid, r, c + 1);
        dfs(grid, r, c - 1);
    }
}
// Time Complexity: O(M * N)
// Space Complexity: O(M * N) in worst case for recursion stack`,
        explanation: 'This solution iterates through the grid. When it finds a piece of land (\'1\'), it increments the island count and starts a DFS traversal. The DFS recursively visits all connected land cells, marking them as visited (\'0\') to ensure each island is counted only once.'
      }
    },
    {
      title: 'Union-Find (Disjoint Set Union)',
      description: 'A highly efficient data structure for problems involving partitioning elements into disjoint subsets. It provides near-constant time `find` and `union` operations, perfect for connectivity problems.',
      exampleProblems:,
      solution: {
        problemTitle: 'Number of Connected Components',
        code: `class Solution {
    private int parent;
    private int count;

    private int find(int i) {
        if (parent[i] == i) return i;
        parent[i] = find(parent[i]); // Path compression
        return parent[i];
    }

    private void union(int i, int j) {
        int rootI = find(i);
        int rootJ = find(j);
        if (rootI!= rootJ) {
            parent[rootI] = rootJ;
            count--;
        }
    }

    public int countComponents(int n, int edges) {
        parent = new int[n];
        count = n;
        for (int i = 0; i < n; i++) {
            parent[i] = i;
        }
        
        for (int edge : edges) {
            union(edge, edge[1]);
        }
        
        return count;
    }
}
// Time Complexity: O(E * α(V)) where α is the Inverse Ackermann function
// Space Complexity: O(V)`,
        explanation: 'This solution initializes each node as its own component. It then iterates through the edges, uniting the components of the two vertices in each edge. The `union` operation decrements the component count if two previously separate components are merged.'
      }
    }
  ]
};