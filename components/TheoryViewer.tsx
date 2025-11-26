'use client';

import React, { useEffect } from 'react';
import { TheoryTopicData } from '@/data/types';
import { CodeBlock } from '@/components/CodeBlock';
import { renderSimpleMarkdown } from '@/lib/utils';
import { useTOC } from './TOCContext';

interface TheoryViewerProps {
    data: TheoryTopicData;
}

export function TheoryViewer({ data }: TheoryViewerProps) {
    const { setSections, setActiveSection, setHasFaqs } = useTOC();

    // Sync data with Context on mount
    useEffect(() => {
        setSections(data.sections);
        setHasFaqs(!!(data.faqs && data.faqs.length > 0));

        // Cleanup on unmount
        return () => {
            setSections([]);
            setHasFaqs(false);
        };
    }, [data, setSections, setHasFaqs]);

    // Handle scroll spy for TOC
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { rootMargin: '-20% 0px -35% 0px' }
        );

        data.sections.forEach((section, index) => {
            const element = document.getElementById(`section-${index}`);
            if (element) observer.observe(element);
        });

        const faqElement = document.getElementById('faqs');
        if (faqElement) observer.observe(faqElement);

        return () => observer.disconnect();
    }, [data.sections, setActiveSection]);

    return (
        <div className="max-w-4xl mx-auto">
            {/* Main Content */}
            <main className="min-w-0">
                <div className="mb-8 border-b pb-8">
                    <h1 className="text-3xl font-extrabold tracking-tight lg:text-5xl mb-4 leading-tight">{data.title}</h1>
                    <div
                        className="text-lg text-muted-foreground leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: renderSimpleMarkdown(data.description) }}
                    />
                </div>

                <div className="space-y-12">
                    {data.sections.map((section, index) => (
                        <section
                            key={index}
                            id={`section-${index}`}
                            className="scroll-mt-24 border-b pb-8 last:border-0"
                        >
                            <h2 className="text-2xl lg:text-3xl font-bold mb-6 flex items-center gap-3">
                                {section.title}
                            </h2>
                            <ContentRenderer content={section.content} />
                        </section>
                    ))}
                </div>

                {/* FAQs Section */}
                {data.faqs && data.faqs.length > 0 && (
                    <section id="faqs" className="scroll-mt-24 mt-16 pt-8 border-t">
                        <h2 className="text-2xl lg:text-3xl font-bold mb-8">Frequently Asked Questions</h2>
                        <div className="grid gap-4">
                            {data.faqs.map((faq, index) => (
                                <div key={index} className="border rounded-lg p-6 bg-card hover:border-primary/50 transition-colors">
                                    <h3 className="font-semibold text-lg mb-3 flex items-start gap-2">
                                        <span className="text-primary mt-1">Q.</span>
                                        {faq.question}
                                    </h3>
                                    <div className="pl-6 text-muted-foreground leading-relaxed">
                                        <ContentRenderer content={faq.answer} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </main>
        </div>
    );
}

// Helper component to render mixed markdown and code blocks
function ContentRenderer({ content }: { content: string }) {
    // Regex to split by code blocks: ```lang ... ```
    // Captures: 1. Language (optional), 2. Code content
    const parts = content.split(/```(\w+)?\n([\s\S]*?)```/g);

    return (
        <div className="space-y-4 text-base leading-7">
            {parts.map((part, index) => {
                // The split results in: [text, lang, code, text, lang, code, ...]
                // So:
                // index % 3 === 0: Text
                // index % 3 === 1: Language (or undefined)
                // index % 3 === 2: Code

                if (index % 3 === 0) {
                    // It's text
                    if (!part.trim()) return null;
                    return (
                        <div
                            key={index}
                            className="prose dark:prose-invert max-w-none break-words"
                            dangerouslySetInnerHTML={{ __html: renderSimpleMarkdown(part) }}
                        />
                    );
                }

                if (index % 3 === 1) {
                    // It's the language capture group, skip it (handled in next iteration)
                    return null;
                }

                if (index % 3 === 2) {
                    // It's the code content
                    const lang = parts[index - 1] || 'text'; // Get language from previous part
                    return (
                        <CodeBlock
                            key={index}
                            code={part.trim()}
                            lang={lang}
                        />
                    );
                }
            })}
        </div>
    );
}
