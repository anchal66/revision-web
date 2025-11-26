'use client';

import React, { useState, useEffect } from 'react';
import { TheoryTopicData, TheorySection } from '@/data/types';
import { CodeBlock } from '@/components/CodeBlock';
import { renderSimpleMarkdown, cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChevronRight, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

interface TheoryViewerProps {
    data: TheoryTopicData;
}

export function TheoryViewer({ data }: TheoryViewerProps) {
    const [activeSection, setActiveSection] = useState<string>('');

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

        return () => observer.disconnect();
    }, [data.sections]);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setActiveSection(id);
        }
    };

    return (
        <div className="flex flex-col lg:flex-row gap-8 relative">
            {/* Mobile TOC */}
            <div className="lg:hidden mb-4">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline" size="sm" className="w-full justify-between">
                            Table of Contents
                            <Menu className="h-4 w-4 ml-2" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left">
                        <div className="mt-6">
                            <TableOfContents
                                sections={data.sections}
                                hasFaqs={!!(data.faqs && data.faqs.length > 0)}
                                activeSection={activeSection}
                                onSectionClick={scrollToSection}
                            />
                        </div>
                    </SheetContent>
                </Sheet>
            </div>

            {/* Desktop TOC Sidebar */}
            <aside className="hidden lg:block w-64 shrink-0">
                <div className="sticky top-24">
                    <ScrollArea className="h-[calc(100vh-8rem)]">
                        <TableOfContents
                            sections={data.sections}
                            hasFaqs={!!(data.faqs && data.faqs.length > 0)}
                            activeSection={activeSection}
                            onSectionClick={scrollToSection}
                        />
                    </ScrollArea>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 min-w-0">
                <div className="mb-8 border-b pb-8">
                    <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">{data.title}</h1>
                    <div
                        className="text-xl text-muted-foreground leading-relaxed"
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
                            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                                {section.title}
                            </h2>
                            <ContentRenderer content={section.content} />
                        </section>
                    ))}
                </div>

                {/* FAQs Section */}
                {data.faqs && data.faqs.length > 0 && (
                    <section id="faqs" className="scroll-mt-24 mt-16 pt-8 border-t">
                        <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
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

interface TableOfContentsProps {
    sections: TheorySection[];
    hasFaqs: boolean;
    activeSection: string;
    onSectionClick: (id: string) => void;
}

function TableOfContents({ sections, hasFaqs, activeSection, onSectionClick }: TableOfContentsProps) {
    return (
        <nav className="space-y-1">
            <h4 className="font-semibold mb-4 px-2">Table of Contents</h4>
            {sections.map((section, index) => {
                const id = `section-${index}`;
                return (
                    <button
                        key={index}
                        onClick={() => onSectionClick(id)}
                        className={cn(
                            'w-full text-left px-3 py-2 text-sm rounded-md transition-colors flex items-center gap-2',
                            activeSection === id
                                ? 'bg-primary/10 text-primary font-medium'
                                : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                        )}
                    >
                        {activeSection === id && <ChevronRight className="h-3 w-3" />}
                        <span className="truncate">{section.title}</span>
                    </button>
                );
            })}
            {hasFaqs && (
                <button
                    onClick={() => onSectionClick('faqs')}
                    className={cn(
                        'w-full text-left px-3 py-2 text-sm rounded-md transition-colors flex items-center gap-2',
                        activeSection === 'faqs'
                            ? 'bg-primary/10 text-primary font-medium'
                            : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                    )}
                >
                    {activeSection === 'faqs' && <ChevronRight className="h-3 w-3" />}
                    <span>FAQs</span>
                </button>
            )}
        </nav>
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
                            className="prose dark:prose-invert max-w-none"
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
