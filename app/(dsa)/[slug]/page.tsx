// app/(dsa)/[slug]/page.tsx (Updated)
import { topics } from "@/data/topics";
import { notFound } from "next/navigation";
import { PatternAccordion } from "@/components/PatternAccordion";
// Removed Badge/CodeBlock imports since PatternAccordion uses them internally

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

// *** REMOVED renderSimpleMarkdown FUNCTION DEFINITION FROM HERE ***

import { renderSimpleMarkdown } from "@/lib/utils";

export default async function DsaTopicPage({ params }: { params: { slug: string } }) {
  const resolvedParams = await params;
  if (!resolvedParams.slug) {
    return null;
  }

  const topicModule = await import(`@/data/${resolvedParams.slug}.ts`);
  const topicData = topicModule.default || topicModule;
  const { title, description, patterns } = topicData.data;

  if (!title) {
    return notFound();
  }

  // The actual rendering logic is moved to the client component
  return (
    <article className="prose dark:prose-invert max-w-none">
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-2">{title}</h1>
        <div
          className="text-xl text-muted-foreground"
          dangerouslySetInnerHTML={{ __html: renderSimpleMarkdown(description) }}
        />
      </div>

      <PatternAccordion
        patterns={patterns}
      />

      {topicData.data.faqs && topicData.data.faqs.length > 0 && (
        <div className="mt-12">
          <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {topicData.data.faqs.map((faq: any, index: number) => (
              <details key={index} className="group border rounded-lg bg-card open:ring-2 open:ring-primary/20 transition-all duration-200">
                <summary className="flex items-center justify-between p-6 cursor-pointer list-none font-semibold text-lg select-none">
                  <span>{faq.question}</span>
                  <span className="transition-transform duration-200 group-open:rotate-180">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                  </span>
                </summary>
                <div className="px-6 pb-6 pt-0 text-muted-foreground border-t border-transparent group-open:border-border/50">
                  <div
                    className="prose prose-neutral dark:prose-invert max-w-none pt-4"
                    dangerouslySetInnerHTML={{ __html: renderSimpleMarkdown(faq.answer) }}
                  />
                </div>
              </details>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}