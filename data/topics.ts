export interface Topic {
  slug: string;
  title: string;
  description: string;
}

export const topics: Topic[] = [
  {
    slug: "01-arrays-and-hashing",
    title: "Arrays & Hashing",
    description: "The foundational tools for a vast category of interview problems.",
  },
  {
    slug: "01-1-binary-search",
    title: "Binary Search",
    description: "Binary Search patterns",
  },
  {
    slug: "02-stacks-and-queues",
    title: "Stacks & Queues",
    description: "Mechanisms to enforce order and process elements in specific sequences.",
  },
  {
    slug: "03-linked-lists",
    title: "Linked Lists",
    description: "Test a candidate's ability to manipulate pointers and manage memory references.",
  },
  {
    slug: "04-strings",
    title: "Strings",
    description: "Often serve as a medium to test other algorithmic patterns.",
  },
  {
    slug: "05-searching-and-recursion",
    title: "Searching & Recursion",
    description: "Crucial for solving optimization and combinatorial problems.",
  },
  {
    slug: "06-greedy-algorithms",
    title: "Greedy Algorithms",
    description: "Construct a solution by making a sequence of locally optimal choices.",
  },
  {
    slug: "08-trees",
    title: "Trees",
    description: "Hierarchical data structures that test recursion and traversal.",
  },
  {
    slug: "09-heaps",
    title: "Heaps",
    description: "A specialized tree-based data structure for efficient min/max retrieval.",
  },
  {
    slug: "10-tries",
    title: "Tries",
    description: "A specialized tree for efficient storage and retrieval of strings.",
  },
  {
    slug: "11-graphs",
    title: "Graphs",
    description: "The most general data structure, capable of modeling arbitrary relationships.",
  },
  {
    slug: "12-dynamic-programming-part-1",
    title: "DP Part 1",
    description: "An optimization technique for problems with optimal substructure.",
  },
  {
    slug: "13-dynamic-programming-part-2",
    title: "DP Part 2",
    description: "The most general data structure, capable of modeling arbitrary relationships.",
  },
  {
    slug: "14-dynamic-programming-part-3",
    title: "DP Part 3",
    description: "The most general data structure, capable of modeling arbitrary relationships.",
  },
];