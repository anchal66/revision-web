import { topics } from "@/data/topics";
import { TopicBrowser } from "@/components/TopicBrowser";
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Data Structures & Algorithms | Interview Revision',
    description: 'Comprehensive DSA interview preparation. Master Arrays, Trees, Graphs, Dynamic Programming, and more with curated patterns and questions.',
    openGraph: {
        title: 'Data Structures & Algorithms - Interview Revision',
        description: 'Master DSA patterns for your technical interview.',
    },
};

export default function DsaPage() {
    const dsaTopics = topics.filter(t => t.category === 'DSA');

    return (
        <div className="container mx-auto py-12 px-4 max-w-7xl animate-in fade-in duration-500">
            <div className="mb-12 space-y-4">
                <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl bg-gradient-to-r from-emerald-600 to-emerald-400 bg-clip-text text-transparent">
                    Data Structures & Algorithms
                </h1>
                <p className="text-xl text-muted-foreground max-w-3xl">
                    Master the core patterns required for coding interviews. From Arrays to Dynamic Programming.
                </p>
            </div>

            <TopicBrowser topics={dsaTopics} />
        </div>
    );
}
