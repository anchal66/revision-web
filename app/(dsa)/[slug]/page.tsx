import { topics } from "@/data/topics";
import { notFound } from "next/navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { CodeBlock } from "@/components/CodeBlock";

// This function tells Next.js which pages to build at build time
export async function generateStaticParams() {
  return topics.map((topic) => ({
    slug: topic.slug,
  }));
}

// This function generates metadata for each page
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const resolvedParams = await params;
  const topic = topics.find((t) => t.slug === resolvedParams.slug);
  if (!topic) {
    return notFound();
  }
  return {
    title: `${topic.title} | DSA Revision`,
    description: topic.description,
  };
}

export default async function DsaTopicPage({ params }: { params: { slug: string } }) {
  const resolvedParams = await params;
  // Handle the case where params.slug is undefined during client-side navigation
  if (!resolvedParams.slug) {
    return null; // or a loading spinner
  }

  const topicModule = await import(`@/data/${resolvedParams.slug}.ts`);
  // Handle potential default export wrapping by Next.js
  const topicData = topicModule.default || topicModule;
  const { title, description, patterns } = topicData.data;

  if (!title) {
    return notFound();
  }

  return (
    <article className="prose dark:prose-invert max-w-none">
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-2">{title}</h1>
        <p className="text-xl text-muted-foreground">{description}</p>
      </div>

      <Accordion type="single" collapsible className="w-full" defaultValue={patterns?.[0]?.title}>
        {patterns.map((pattern: any) => (
          <AccordionItem value={pattern.title} key={pattern.title}>
            <AccordionTrigger className="text-2xl font-semibold hover:no-underline">
              {pattern.title}
            </AccordionTrigger>
            <AccordionContent className="prose-p:text-base">
              <p>{pattern.description}</p>
              
              <div className="my-4">
                <h4 className="font-semibold mb-2">Example Problems:</h4>
                <div className="flex flex-wrap gap-2">
                  {pattern.exampleProblems.map((problem: string) => (
                    <Badge variant="secondary" key={problem}>{problem}</Badge>
                  ))}
                </div>
              </div>

              <div className="mt-6 p-4 border rounded-lg bg-background">
                <h4 className="font-semibold text-lg mb-2">Solution Spotlight: {pattern.solution.problemTitle}</h4>
                <p className="text-sm text-muted-foreground mb-4">{pattern.solution.explanation}</p>
                <CodeBlock 
                  code={pattern.solution.code} 
                  lang="java"
                  filename={`${pattern.solution.problemTitle.replace(/\s/g, '')}.java`}
                />
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </article>
  );
}