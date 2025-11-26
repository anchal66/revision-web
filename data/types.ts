export interface Solution {
    problemTitle: string;
    code: string;
    explanation: string;
}

export interface Pattern {
    title: string;
    description: string;
    exampleProblems?: string[];
    solutions?: Solution[];
}

export interface DSATopicData {
    title: string;
    description: string;
    patterns: Pattern[];
    faqs?: { question: string; answer: string }[];
}

export interface TheorySection {
    title: string;
    content: string; // Markdown content
    subsections?: TheorySection[];
}

export interface TheoryTopicData {
    title: string;
    description: string;
    sections: TheorySection[];
    faqs?: { question: string; answer: string }[];
}
