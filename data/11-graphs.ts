export const data = {
  title: 'Graphs',
  description: 'Graphs are the most general data structure, capable of modeling arbitrary relationships. Traversal, pathfinding, and connectivity are the most common problem categories.',
  patterns: [
    {
      title: 'Graph Traversal (DFS/BFS)',
      description: 'Fundamental techniques to visit every node and edge. DFS uses a stack (often implicit via recursion) to go deep, while BFS uses a queue to explore level by level.',
      exampleProblems: ['Number of Islands', 'Clone Graph', 'Max Area of Island'],
      solutions: [{
        problemTitle: 'Number of Islands (DFS)',
        code: `class Solution {
    public int numIslands(char[][] grid) {
        if (grid == null || grid.length == 0) return 0;
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

    private void dfs(char[][] grid, int r, int c) {
        if (r < 0 || r >= grid.length || c < 0 || c >= grid[0].length || grid[r][c] == '0') {
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
      }]
    },
    {
      title: 'Topological Sort (Kahn\'s Algorithm)',
      description: 'A linear ordering of nodes in a Directed Acyclic Graph (DAG) where for every edge from `u` to `v`, `u` comes before `v`. Kahn\'s algorithm is a BFS-based approach that uses in-degrees.',
      exampleProblems: ['Course Schedule', 'Course Schedule II', 'Alien Dictionary'],
      solutions: [{
        problemTitle: 'Course Schedule II',
        code: `class Solution {
    public int[] findOrder(int numCourses, int[][] prerequisites) {
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < numCourses; i++) adj.add(new ArrayList<>());
        
        int[] indegree = new int[numCourses];
        for (int prereq : prerequisites) {
            adj.get(prereq[1]).add(prereq);
            indegree[prereq]++;
        }

        Queue<Integer> queue = new LinkedList<>();
        for (int i = 0; i < numCourses; i++) {
            if (indegree[i] == 0) {
                queue.offer(i);
            }
        }

        int[] result = new int[numCourses];
        int i = 0;
        while (!queue.isEmpty()) {
            int node = queue.poll();
            result[i++] = node;
            for (int neighbor : adj.get(node)) {
                indegree[neighbor]--;
                if (indegree[neighbor] == 0) {
                    queue.offer(neighbor);
                }
            }
        }

        return i == numCourses ? result : new int[0];
    }
}
// Time Complexity: O(V + E)
// Space Complexity: O(V + E)`,
        explanation: 'Kahn\'s algorithm first computes the in-degree of all nodes. It initializes a queue with all nodes having an in-degree of 0. As it processes a node, it decrements the in-degree of its neighbors. If a neighbor\'s in-degree becomes 0, it is added to the queue. A cycle is detected if not all nodes are processed.'
      }]
    },
    {
      title: 'Shortest Path: Dijkstra\'s Algorithm',
      description: 'Finds the shortest path from a single source to all other nodes in a weighted graph with non-negative edge weights. It uses a priority queue to greedily select the unvisited node with the smallest distance.',
      exampleProblems: ['Network Delay Time', 'Path with Maximum Probability', 'The Maze II'],
      solutions: [{
        problemTitle: 'Network Delay Time',
        code: `class Solution {
    public int networkDelayTime(int[][] times, int n, int k) {
        Map<Integer, List<int[]>> adj = new HashMap<>();
        for (int time : times) {
            adj.computeIfAbsent(time[0], key -> new ArrayList<>()).add(new int[]{time[1], time[2]});
        }

        PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> a[1] - b[1]);
        pq.offer(new int[]{k, 0}); // {node, distance_from_k}
        
        Map<Integer, Integer> dist = new HashMap<>();
        int maxDist = 0;

        while (!pq.isEmpty()) {
            int[] top = pq.poll();
            int node = top[0], d = top[1];

            if (dist.containsKey(node)) continue;
            dist.put(node, d);
            maxDist = Math.max(maxDist, d);

            if (adj.containsKey(node)) {
                for (int neighbor : adj.get(node)) {
                    if (!dist.containsKey(neighbor[0])) {
                        pq.offer(new int[]{neighbor[0], d + neighbor[1]});
                    }
                }
            }
        }
        return dist.size() == n? maxDist : -1;
    }
}
// Time Complexity: O(E log V)
// Space Complexity: O(V + E)`,
        explanation: 'Dijkstra\'s algorithm uses a min-priority queue to always explore the node with the currently shortest known distance from the source. It "relaxes" edges by updating the distances to neighbors if a shorter path is found through the current node.'
      }]
    },
    {
      title: 'Union-Find (Disjoint Set Union)',
      description: 'A highly efficient data structure for problems involving partitioning elements into disjoint subsets. It provides near-constant time `find` and `union` operations, perfect for connectivity problems.',
      exampleProblems: ['Number of Connected Components in an Undirected Graph', 'Graph Valid Tree', 'Redundant Connection'],
      solutions: [{
        problemTitle: 'Number of Connected Components',
        code: `class Solution {
    public int countComponents(int n, int[][] edges) {
        int[] parent = new int[n];
        for (int i = 0; i < n; i++) parent[i] = i;
        int components = n;

        for (int[] edge : edges) {
            int root1 = find(parent, edge[0]);
            int root2 = find(parent, edge[1]);
            if (root1!= root2) {
                parent[root1] = root2; // Union
                components--;
            }
        }
        return components;
    }

    private int find(int[] parent, int i) {
        if (parent[i] == i) return i;
        return parent[i] = find(parent, parent[i]); // Path compression
    }
}
// Time Complexity: O(E * α(V)) where α is Inverse Ackermann function
// Space Complexity: O(V)`,
        explanation: 'This solution initializes each node as its own component. It then iterates through the edges, uniting the components of the two vertices. The `union` operation decrements the component count if two previously separate components are merged. Path compression optimizes the `find` operation.'
      }]
    }
  ]
};