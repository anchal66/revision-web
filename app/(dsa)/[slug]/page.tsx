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

/**
 * Helper function to render simple markdown-like text as HTML.
 * NOTE: This local version is ONLY for rendering the static 'description'
 * in this Server Component. The main Accordion rendering uses the function
 * defined inside PatternAccordion.tsx.
 */
function renderSimpleMarkdown(text: string): string {
  if (!text) return "";
  return text
    .replace(/contentReference\[.*?\]\{.*?\}/g, '') // Remove citations
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold
    .replace(/`(.*?)`/g, '<code>$1</code>')       // Inline code
    .replace(/\n/g, '<br />');                   // Newlines
}


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
          <div className="space-y-6">
            {topicData.data.faqs.map((faq: any, index: number) => (
              <div key={index} className="border rounded-lg p-6 bg-card">
                <h3 className="text-xl font-semibold mb-2">{faq.question}</h3>
                <div
                  className="text-muted-foreground"
                  dangerouslySetInnerHTML={{ __html: renderSimpleMarkdown(faq.answer) }}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}