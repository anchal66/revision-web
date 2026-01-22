export interface Topic {
  slug: string;
  title: string;
  description: string;
  type: 'dsa' | 'theory';
  category: 'DSA' | 'System Design' | 'Java & Spring' | 'Cloud & Architecture';
}

export const topics: Topic[] = [
  // --- DSA ---
  {
    slug: "01-arrays-and-hashing",
    title: "Arrays & Hashing",
    description: "The foundational tools for a vast category of interview problems.",
    type: 'dsa',
    category: 'DSA'
  },
  {
    slug: "01-1-binary-search",
    title: "Binary Search",
    description: "Binary Search patterns",
    type: 'dsa',
    category: 'DSA'
  },
  {
    slug: "02-stacks-and-queues",
    title: "Stacks & Queues",
    description: "Mechanisms to enforce order and process elements in specific sequences.",
    type: 'dsa',
    category: 'DSA'
  },
  {
    slug: "03-linked-lists",
    title: "Linked Lists",
    description: "Test a candidate's ability to manipulate pointers and manage memory references.",
    type: 'dsa',
    category: 'DSA'
  },
  {
    slug: "04-strings",
    title: "Strings",
    description: "Often serve as a medium to test other algorithmic patterns.",
    type: 'dsa',
    category: 'DSA'
  },
  {
    slug: "05-searching-and-recursion",
    title: "Searching & Recursion",
    description: "Crucial for solving optimization and combinatorial problems.",
    type: 'dsa',
    category: 'DSA'
  },
  {
    slug: "06-greedy-algorithms",
    title: "Greedy Algorithms",
    description: "Construct a solution by making a sequence of locally optimal choices.",
    type: 'dsa',
    category: 'DSA'
  },
  {
    slug: "08-trees",
    title: "Trees",
    description: "Hierarchical data structures that test recursion and traversal.",
    type: 'dsa',
    category: 'DSA'
  },
  {
    slug: "09-heaps",
    title: "Heaps",
    description: "A specialized tree-based data structure for efficient min/max retrieval.",
    type: 'dsa',
    category: 'DSA'
  },
  {
    slug: "10-tries",
    title: "Tries",
    description: "A specialized tree for efficient storage and retrieval of strings.",
    type: 'dsa',
    category: 'DSA'
  },
  {
    slug: "11-graphs",
    title: "Graphs",
    description: "The most general data structure, capable of modeling arbitrary relationships.",
    type: 'dsa',
    category: 'DSA'
  },
  {
    slug: "12-dynamic-programming-part-1",
    title: "DP Part 1",
    description: "An optimization technique for problems with optimal substructure.",
    type: 'dsa',
    category: 'DSA'
  },
  {
    slug: "13-dynamic-programming-part-2",
    title: "DP Part 2",
    description: "The most general data structure, capable of modeling arbitrary relationships.",
    type: 'dsa',
    category: 'DSA'
  },
  {
    slug: "14-dynamic-programming-part-3",
    title: "DP Part 3",
    description: "The most general data structure, capable of modeling arbitrary relationships.",
    type: 'dsa',
    category: 'DSA'
  },

  // --- Java & Spring ---
  {
    slug: '18-java-language',
    title: 'Java Language Architecture',
    description: 'Deep dive into JVM internals, Memory Model, OOP Pillars, and Modern Java features for Senior Engineering roles.',
    type: 'theory',
    category: 'Java & Spring'
  },
  {
    slug: "15-spring-data-jpa",
    title: "Spring Data JPA",
    description: "A comprehensive guide to building a Hospital Management System using Spring Data JPA.",
    type: 'theory',
    category: 'Java & Spring'
  },
  {
    slug: "16-apache-kafka",
    title: "Apache Kafka",
    description: "Complete documentation & Spring Boot integration guide for Senior Engineers.",
    type: 'theory',
    category: 'Java & Spring'
  },

  // --- Cloud & Architecture ---
  {
    slug: '17-aws-architecture',
    title: 'AWS Architecture & Cloud Design Patterns',
    description: 'A comprehensive guide to AWS services, High Availability architectures, and Cloud Design Patterns for Senior Engineers.',
    type: 'theory',
    category: 'Cloud & Architecture'
  }
];