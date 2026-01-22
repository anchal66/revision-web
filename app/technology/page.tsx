import { topics } from "@/data/topics";
import { TopicBrowser } from "@/components/TopicBrowser";
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'System Design & Technology | Interview Revision',
    description: 'Deep dive into System Design, Java, Spring Boot, Microservices, and Cloud Architecture for Senior Software Engineer interviews.',
    openGraph: {
        title: 'System Design & Tech - Interview Revision',
        description: 'Master System Design and Technology concepts for senior roles.',
    },
};

export default function TechnologyPage() {
    const techTopics = topics.filter(t =>
        ['Java & Spring', 'System Design', 'Cloud & Architecture'].includes(t.category)
    );

    return (
        <div className="container mx-auto py-12 px-4 max-w-7xl animate-in fade-in duration-500">
            <div className="mb-12 space-y-4">
                <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl bg-gradient-to-r from-blue-600 to-indigo-400 bg-clip-text text-transparent">
                    Technologies & System Design
                </h1>
                <p className="text-xl text-muted-foreground max-w-3xl">
                    Deep dive into Java Ecosystem, Cloud Architecture, and Scalable System Design.
                </p>
            </div>

            <TopicBrowser topics={techTopics} />
        </div>
    );
}
