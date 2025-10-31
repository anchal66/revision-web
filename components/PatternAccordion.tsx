'use client';

import React, { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { CodeBlock } from '@/components/CodeBlock';
import { cn } from '@/lib/utils'; // Assuming cn is available

// --- MOVED FUNCTION DEFINITION HERE ---
function renderSimpleMarkdown(text: string): string {
  if (!text) return "";
  return text
    .replace(/contentReference\[.*?\]\{.*?\}/g, '') // Remove citations
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold
    .replace(/`(.*?)`/g, '<code>$1</code>')       // Inline code
    .replace(/\n/g, '<br />');                   // Newlines
}
// --- END MOVED FUNCTION DEFINITION ---

interface PatternSolution {
  problemTitle: string;
  code: string;
  explanation: string;
}

interface Pattern {
  title: string;
  description: string;
  exampleProblems: string[];
  solutions: PatternSolution[]; 
}

interface PatternAccordionProps {
  patterns: Pattern[];
}

export function PatternAccordion({ patterns }: PatternAccordionProps) {
  const [activeSolutionTitle, setActiveSolutionTitle] = useState<{ [key: string]: string }>({});

  // --- CRITICAL FIX IN useEffect ---
  React.useEffect(() => {
    const initialActive = patterns.reduce((acc, pattern) => {
      // 🎯 FIX: Use the 'problemTitle' from the first solution object 
      // if it exists, as this is the title used in the solution block.
      if (pattern.solutions && pattern.solutions.length > 0) {
        acc[pattern.title] = pattern.solutions[0].problemTitle;
      }
      return acc;
    }, {} as { [key: string]: string });
    setActiveSolutionTitle(initialActive);
  }, [patterns]);
  // --- END CRITICAL FIX ---
  
  const handleProblemClick = (patternTitle: string, problemTitle: string) => {
    
    // IMPORTANT: If you click on an example that does NOT have a corresponding 
    // solution object in `pattern.solutions`, the solution box will disappear.
    // If you intend for ALL example problems to show the FIRST solution 
    // when clicked, you would change this logic.
    
    // For now, we assume the clicked problem title corresponds to a solution's problemTitle
    setActiveSolutionTitle((prev) => ({
      ...prev,
      [patternTitle]: problemTitle,
    }));
  };

  return (
    <Accordion 
      type="single" 
      collapsible 
      className="w-full" 
      defaultValue={patterns?.[0]?.title}
    >
      {patterns.map((pattern) => {
        const activeTitle = activeSolutionTitle[pattern.title];
        
        // Find the currently active solution object based on its title
        const currentSolution = pattern.solutions.find(
          (sol) => sol.problemTitle === activeTitle
        );

        // --- REMAINDER OF RENDER LOGIC IS THE SAME ---
        return (
          <AccordionItem value={pattern.title} key={pattern.title}>
            <AccordionTrigger className="text-2xl font-semibold hover:no-underline">
              {pattern.title}
            </AccordionTrigger>
            
            <AccordionContent className="prose-p:text-base prose dark:prose-invert max-w-none">
              
              <div dangerouslySetInnerHTML={{ __html: renderSimpleMarkdown(pattern.description) }} />
              
              {/* Example Problems (Now Clickable) */}
              <div className="my-4">
                <h4 className="font-semibold mb-2">Example Problems:</h4>
                <div className="flex flex-wrap gap-2">
                  {pattern.exampleProblems.map((problem: string) => (
                    <Badge
                      variant="outline"
                      key={problem}
                      className={cn(
                        'cursor-pointer transition-colors',
                        problem === activeTitle
                          ? 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                          : 'hover:bg-accent hover:text-accent-foreground'
                      )}
                      onClick={() => handleProblemClick(pattern.title, problem)}
                    >
                      {problem}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Solution Spotlight (Now Dynamic) */}
              {currentSolution && (
                <div className="mt-6 p-4 border rounded-lg bg-background">
                  <h4 className="font-semibold text-lg mb-2">
                    Solution Spotlight: {currentSolution.problemTitle}
                  </h4>
                  <div 
                    className="text-sm text-muted-foreground mb-4 prose dark:prose-invert max-w-none" 
                    dangerouslySetInnerHTML={{ __html: renderSimpleMarkdown(currentSolution.explanation) }}
                  />
                  <CodeBlock 
                    code={currentSolution.code} 
                    lang="java"
                    filename={`${currentSolution.problemTitle.replace(/\s/g, '')}.java`}
                  />
                </div>
              )}
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}