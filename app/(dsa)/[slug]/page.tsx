import { topics } from "@/data/topics";
import { notFound } from "next/navigation";
import { PatternAccordion } from "@/components/PatternAccordion";
import { TheoryViewer } from "@/components/TheoryViewer";
import { renderSimpleMarkdown } from "@/lib/utils";

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
    title: `${topic.title} | Interview Revision`,
    description: topic.description,
  };
}

export default async function DsaTopicPage({ params }: { params: { slug: string } }) {
  const resolvedParams = await params;
  if (!resolvedParams.slug) {
    return null;
  }

  const topicInfo = topics.find((t) => t.slug === resolvedParams.slug);
  if (!topicInfo) {
    return notFound();
  }

  const topicModule = await import(`@/data/${resolvedParams.slug}.ts`);
  const topicData = topicModule.default || topicModule;
  const { title, description, patterns, faqs } = topicData.data;

  if (!title) {
    return notFound();
  }

  // Conditional Rendering based on Topic Type
  if (topicInfo.type === 'theory') {
    return <TheoryViewer data={topicData.data} />;
  }

  // Default DSA Rendering
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

      {faqs && faqs.length > 0 && (
        <div className="mt-12">
          <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {faqs.map((faq: any, index: number) => (
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