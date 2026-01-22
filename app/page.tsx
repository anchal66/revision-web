import { topics } from "@/data/topics";
import { learningPaths } from "@/data/learning-paths";
import Link from "next/link";
import { GraduationCap, Code, Server, ArrowRight, BookOpen, Sparkles } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home | Interview Revision',
  description: 'Master your next technical interview with structured learning paths, curated topics, and comprehensive revision notes for SDE I, II, III, and Lead roles.',
  openGraph: {
    title: 'Interview Revision - ACE Your Technical Interviews',
    description: 'Structured learning paths and curated revision notes for Software Engineers.',
    images: [{ url: '/opengraph-image' }],
  },
};

export default function Home() {
  // Get counts for quick stats
  const dsaCount = topics.filter(t => t.category === 'DSA').length;
  const techCount = topics.filter(t => ['Java & Spring', 'System Design', 'Cloud & Architecture'].includes(t.category)).length;

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      {/* Hero Section */}
      <div className="text-center mb-12 space-y-4">
        <Badge variant="secondary" className="mb-4">
          <Sparkles className="w-3 h-3 mr-1" />
          Interview Prep Made Easy
        </Badge>
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl bg-gradient-to-r from-primary via-purple-500 to-primary/60 bg-clip-text text-transparent">
          Interview Revision
        </h1>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto">
          Master your next technical interview with structured learning paths, curated topics, and comprehensive revision notes.
        </p>
      </div>

      {/* Interview Questions - Featured Section */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-indigo-500/10">
              <GraduationCap className="w-5 h-5 text-indigo-500" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Interview Questions</h2>
              <p className="text-sm text-muted-foreground">Choose your experience level</p>
            </div>
          </div>
          <Link
            href="/learn"
            className="text-sm text-primary hover:underline flex items-center gap-1"
          >
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {learningPaths.map((path) => (
            <Link key={path.slug} href={`/learn/${path.slug}`}>
              <Card className="h-full hover:border-primary/50 hover:shadow-lg transition-all duration-300 group cursor-pointer">
                <CardHeader className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="text-xs">
                      {path.experienceRange}
                    </Badge>
                    <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <CardTitle className="text-base group-hover:text-primary transition-colors">
                    {path.title}
                  </CardTitle>
                  <CardDescription className="text-xs line-clamp-2">
                    {path.steps.length} curriculum steps
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Quick Access Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {/* DSA Topics Card */}
        <Link href="/dsa">
          <Card className="h-full hover:border-emerald-500/50 hover:shadow-lg transition-all duration-300 group cursor-pointer overflow-hidden">
            <CardHeader className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-emerald-500/10 group-hover:bg-emerald-500/20 transition-colors">
                  <Code className="w-6 h-6 text-emerald-500" />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-lg group-hover:text-emerald-500 transition-colors flex items-center justify-between">
                    DSA Topics
                    <Badge variant="secondary" className="ml-2">{dsaCount}</Badge>
                  </CardTitle>
                  <CardDescription className="text-sm mt-1">
                    Arrays, Trees, Graphs, Dynamic Programming & more
                  </CardDescription>
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm text-emerald-600 dark:text-emerald-400 font-medium">
                <span>Explore DSA</span>
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </CardHeader>
          </Card>
        </Link>

        {/* Technology Card */}
        <Link href="/technology">
          <Card className="h-full hover:border-blue-500/50 hover:shadow-lg transition-all duration-300 group cursor-pointer overflow-hidden">
            <CardHeader className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors">
                  <Server className="w-6 h-6 text-blue-500" />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-lg group-hover:text-blue-500 transition-colors flex items-center justify-between">
                    Technology
                    <Badge variant="secondary" className="ml-2">{techCount}</Badge>
                  </CardTitle>
                  <CardDescription className="text-sm mt-1">
                    Java, Spring Boot, Kafka, Microservices & more
                  </CardDescription>
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm text-blue-600 dark:text-blue-400 font-medium">
                <span>Explore Tech</span>
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </CardHeader>
          </Card>
        </Link>
      </div>

      {/* Recent/Featured Topics */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-primary/10">
            <BookOpen className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Featured Topics</h2>
            <p className="text-sm text-muted-foreground">Start with these essential concepts</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {topics.slice(0, 6).map((topic) => (
            <Link key={topic.slug} href={`/${topic.slug}`}>
              <Card className="hover:border-primary/30 hover:shadow-md transition-all duration-200 group h-full">
                <CardHeader className="p-4">
                  <div className="flex items-center justify-between">
                    <Badge
                      variant="outline"
                      className={`text-xs ${topic.category === 'DSA'
                        ? 'border-emerald-500/30 text-emerald-600 dark:text-emerald-400'
                        : 'border-blue-500/30 text-blue-600 dark:text-blue-400'
                        }`}
                    >
                      {topic.category}
                    </Badge>
                  </div>
                  <CardTitle className="text-sm font-medium mt-2 group-hover:text-primary transition-colors">
                    {topic.title}
                  </CardTitle>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            href="/dsa"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            View all {topics.length} topics
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}