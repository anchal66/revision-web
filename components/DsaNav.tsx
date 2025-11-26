'use client';

import { topics } from "@/data/topics";
import Link from "next/link";
import { useParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { useTOC } from "./TOCContext";
import { ChevronRight } from "lucide-react";
import { useEffect, useRef } from "react";

export function DsaNav() {
  const params = useParams();
  const { sections, activeSection, hasFaqs } = useTOC();
  const activeTopicRef = useRef<HTMLLIElement>(null);

  // Auto-scroll to active topic on mount or route change
  useEffect(() => {
    if (activeTopicRef.current) {
      // Find the scrollable container (the parent div in DsaPageClient)
      const scrollContainer = activeTopicRef.current.closest('div.overflow-y-auto');
      if (scrollContainer) {
        // Calculate the position of the active topic relative to the container
        const offsetTop = activeTopicRef.current.offsetTop;

        // Scroll the container to that position
        scrollContainer.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    }
  }, [params.slug]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // Offset for sticky header
      const y = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <nav className="px-4 pb-8">
      <h3 className="font-semibold mb-4 text-lg px-2">Topics</h3>
      <ul className="space-y-1">
        {topics.map((topic) => {
          const isActive = topic.slug === params.slug;
          return (
            <li
              key={topic.slug}
              ref={isActive ? activeTopicRef : null}
              className="scroll-mt-4" // Add scroll margin for better positioning
            >
              <Link
                href={`/${topic.slug}`}
                className={cn(
                  buttonVariants({ variant: isActive ? "secondary" : "ghost" }),
                  "w-full justify-start font-medium",
                  isActive && "bg-secondary/50"
                )}
              >
                {topic.title}
              </Link>

              {/* Nested TOC for Active Topic */}
              {isActive && sections.length > 0 && (
                <ul className="mt-1 ml-4 border-l pl-2 space-y-0.5 animate-in slide-in-from-left-2 duration-200">
                  {sections.map((section, index) => {
                    const id = `section-${index}`;
                    const isSectionActive = activeSection === id;
                    return (
                      <li key={index}>
                        <button
                          onClick={() => scrollToSection(id)}
                          className={cn(
                            "text-sm w-full text-left py-1.5 px-2 rounded-md transition-colors flex items-center gap-1.5",
                            isSectionActive
                              ? "text-primary font-medium bg-primary/10"
                              : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                          )}
                        >
                          {isSectionActive && <ChevronRight className="h-3 w-3 shrink-0" />}
                          <span className="truncate">{section.title}</span>
                        </button>
                      </li>
                    );
                  })}
                  {hasFaqs && (
                    <li>
                      <button
                        onClick={() => scrollToSection('faqs')}
                        className={cn(
                          "text-sm w-full text-left py-1.5 px-2 rounded-md transition-colors flex items-center gap-1.5",
                          activeSection === 'faqs'
                            ? "text-primary font-medium bg-primary/10"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                        )}
                      >
                        {activeSection === 'faqs' && <ChevronRight className="h-3 w-3 shrink-0" />}
                        <span>FAQs</span>
                      </button>
                    </li>
                  )}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}