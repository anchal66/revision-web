'use client';

import React from 'react';
import { learningPaths } from '@/data/learning-paths';
import { CheckCircle2, Circle, Lock, Star, ChevronDown, BookOpen, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

interface TimelineViewProps {
    path: typeof learningPaths[0];
}

export function TimelineView({ path }: TimelineViewProps) {
    // Group steps if needed, but for now linear is fine as per design
    const commonSteps = path.steps.filter(s => s.isCommon);
    const levelSteps = path.steps.filter(s => !s.isCommon);

    return (
        <div className="max-w-3xl mx-auto py-8">
            {/* Common Steps Section */}
            {commonSteps.length > 0 && (
                <div className="mb-12 relative">
                    <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/50 to-transparent" />

                    <div className="mb-8 pl-14">
                        <h3 className="text-xl font-bold flex items-center gap-2">
                            <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                            Foundation Steps
                        </h3>
                        <p className="text-muted-foreground text-sm mt-1">Essential knowledge required for all experience levels.</p>
                    </div>

                    <div className="space-y-6">
                        {commonSteps.map((step, index) => (
                            <TimelineItem key={step.id} step={step} index={index + 1} type="common" pathSlug={path.slug} />
                        ))}
                    </div>
                </div>
            )}

            {/* Main Path Section */}
            <div className="relative">
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border" />

                <div className="mb-8 pl-14 pt-4 border-t border-dashed border-border/50">
                    <h3 className="text-xl font-bold flex items-center gap-2">
                        <BookOpen className="w-5 h-5 text-primary" />
                        Core Curriculum
                    </h3>
                    <p className="text-muted-foreground text-sm mt-1">Mastery steps for the {path.title} role.</p>
                </div>

                <div className="space-y-6">
                    {levelSteps.map((step, index) => (
                        <TimelineItem key={step.id} step={step} index={index + 1} type="main" pathSlug={path.slug} />
                    ))}
                </div>
            </div>
        </div>
    );
}

function TimelineItem({ step, index, type, pathSlug }: { step: any, index: number, type: 'common' | 'main', pathSlug: string }) {
    return (
        <div id={step.id} className="relative group pl-14 scroll-mt-24">
            {/* Connector Line Dot */}
            <div className={cn(
                "absolute left-4 w-4 h-4 rounded-full border-2 transform -translate-x-1/2 mt-1.5 transition-colors duration-300 z-10 bg-background",
                type === 'common' ? "border-amber-500 group-hover:bg-amber-100" : "border-primary group-hover:bg-primary/10"
            )}>
                {type === 'common' && <div className="absolute inset-0.5 rounded-full bg-amber-500/50 animate-pulse" />}
            </div>

            {/* Card Content */}
            <div className={cn(
                "p-4 rounded-xl border transition-all duration-300 relative",
                "bg-card hover:bg-muted/50 hover:shadow-md hover:border-primary/30",
                step.optional && "border-dashed border-muted-foreground/30 bg-muted/20"
            )}>
                <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                        <h4 className={cn(
                            "font-semibold text-lg leading-tight",
                            step.optional ? "text-muted-foreground" : "text-foreground"
                        )}>
                            {step.title}
                        </h4>

                        {step.optional && (
                            <Badge variant="outline" className="mt-2 text-[10px] h-5 px-1.5 font-normal">
                                Optional
                            </Badge>
                        )}
                    </div>

                    <div className="flex flex-col items-end gap-2 shrink-0">
                        {step.pdfUrl && (
                            <Link
                                href={`/view?pdf=${encodeURIComponent(step.pdfUrl)}&title=${encodeURIComponent(step.title)}&back=${encodeURIComponent(`/learn/${pathSlug}`)}`}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-300 dark:hover:bg-red-900/50 transition-colors"
                            >
                                <FileText className="w-3.5 h-3.5" />
                                <span>Read PDF</span>
                            </Link>
                        )}

                        <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                                View Details
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
