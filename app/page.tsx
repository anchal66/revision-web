import { topics } from "@/data/topics";
import { TopicBrowser } from "@/components/TopicBrowser";

export default function Home() {
  return (
    <div className="container mx-auto py-12 px-4 max-w-7xl">
      <div className="text-center mb-16 space-y-4">
        <h1 className="text-5xl font-extrabold tracking-tight lg:text-6xl bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Interview Revision
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          A comprehensive collection of Data Structures, Algorithms, and System Design patterns for your interview preparation.
        </p>
      </div>

      <TopicBrowser topics={topics} />
    </div>
  );
}