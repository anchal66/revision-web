// PatternAccordion.tsx (Final Update with Primary Button)
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
import { cn, renderSimpleMarkdown } from '@/lib/utils';

// --- Interfaces (Unchanged) ---
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
  // 1. New state to store the initial/primary solution title for each pattern
  const [primarySolutionTitle, setPrimarySolutionTitle] = useState<{ [key: string]: string }>({});


  // Initialize both active and primary states
  React.useEffect(() => {
    const initialActive: { [key: string]: string } = {};
    const initialPrimary: { [key: string]: string } = {};

    patterns.forEach((pattern) => {
      if (pattern.solutions && pattern.solutions.length > 0) {
        const primaryTitle = pattern.solutions[0].problemTitle;

        initialActive[pattern.title] = primaryTitle;
        initialPrimary[pattern.title] = primaryTitle;
      }
    });

    setActiveSolutionTitle(initialActive);
    setPrimarySolutionTitle(initialPrimary);
  }, [patterns]);


  // Sets the active solution title (with fallback logic)
  const handleProblemClick = (patternTitle: string, clickedProblemTitle: string) => {
    const pattern = patterns.find(p => p.title === patternTitle);
    if (!pattern) return;

    // Determine the title to set based on existence, using the primary as fallback
    const newActiveTitle = pattern.solutions.some(
      (sol) => sol.problemTitle === clickedProblemTitle
    )
      ? clickedProblemTitle // Clicked problem has a unique solution
      : primarySolutionTitle[patternTitle]; // Fallback to the stored primary title

    setActiveSolutionTitle((prev) => ({
      ...prev,
      [patternTitle]: newActiveTitle,
    }));
  };

  // 2. New function to explicitly return to the primary solution
  const handlePrimaryClick = (patternTitle: string) => {
    const primaryTitle = primarySolutionTitle[patternTitle];
    if (primaryTitle) {
      setActiveSolutionTitle((prev) => ({
        ...prev,
        [patternTitle]: primaryTitle,
      }));
    }
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
        const primaryTitle = primarySolutionTitle[pattern.title];

        // Find the currently active solution object (will be primary if fallback occurred)
        const currentSolution = pattern.solutions.find(
          (sol) => sol.problemTitle === activeTitle
        ) || pattern.solutions[0]; // Fallback to first solution for rendering safety

        // Determine if the currently displayed solution IS the primary one
        const isPrimaryActive = activeTitle === primaryTitle;

        return (
          <AccordionItem value={pattern.title} key={pattern.title}>
            <AccordionTrigger className="text-2xl font-semibold hover:no-underline">
              {pattern.title}
            </AccordionTrigger>

            <AccordionContent className="prose-p:text-base prose dark:prose-invert max-w-none">

              <div dangerouslySetInnerHTML={{ __html: renderSimpleMarkdown(pattern.description) }} />

              {/* Example Problems (Now Clickable) */}
              <div className="my-4">
                <div className='flex items-center gap-3 mb-2'>
                  <h4 className="font-semibold m-0">Example Problems:</h4>
                  {/* 3. The new dedicated Primary Solution button */}
                  {primaryTitle && (
                    <Badge
                      variant={isPrimaryActive ? "default" : "secondary"}
                      className={cn(
                        'cursor-pointer transition-colors text-xs font-bold',
                        !isPrimaryActive && 'hover:bg-primary/80'
                      )}
                      onClick={() => handlePrimaryClick(pattern.title)}
                    >
                      Primary Solution
                    </Badge>
                  )}
                </div>

                <div className="flex flex-wrap gap-2">
                  {pattern.exampleProblems.map((problem: string) => {
                    const problemSolutionExists = pattern.solutions.some(sol => sol.problemTitle === problem);
                    // Only highlight the badge if it's the exact active solution AND it has a dedicated solution
                    const isProblemActive = problem === activeTitle && problemSolutionExists;

                    return (
                      <Badge
                        variant="outline"
                        key={problem}
                        className={cn(
                          'cursor-pointer transition-colors',
                          isProblemActive
                            ? 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                            : 'hover:bg-accent hover:text-accent-foreground'
                        )}
                        onClick={() => handleProblemClick(pattern.title, problem)}
                      >
                        {problem}
                      </Badge>
                    );
                  })}
                </div>
              </div>

              {/* Solution Spotlight */}
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