import { topics } from "@/data/topics";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="w-full">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
          DSA Pattern Compendium
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          A curated collection of essential DSA patterns for senior software engineer interviews.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {topics.map((topic) => (
          <Link href={`/${topic.slug}`} key={topic.slug}>
            <Card className="h-full hover:border-primary transition-colors group">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {topic.title}
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </CardTitle>
                <CardDescription className="pt-2">{topic.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}