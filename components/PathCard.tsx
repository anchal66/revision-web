'use client';

import React from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { ArrowRight, Clock, Star, Target } from 'lucide-react';
import { LearningPath } from '@/data/learning-paths';
import { cn } from '@/lib/utils';

interface PathCardProps {
    path: LearningPath;
}

export function PathCard({ path }: PathCardProps) {
    const isExpert = path.slug === 'senior-lead' || path.slug === 'sde-3';

    return (
        <Card className={cn(
            "group relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 h-full flex flex-col",
            isExpert ? "border-purple-500/20 bg-gradient-to-br from-card to-purple-500/5" : "border-border/50 hover:border-primary/30"
        )}>
            {/* Glow effect */}
            <div className="absolute top-0 right-0 -mt-20 -mr-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />

            <CardHeader className="relative pb-4">
                <div className="flex justify-between items-start mb-2">
                    <Badge variant="secondary" className={cn(
                        "font-medium tracking-wide",
                        isExpert
                            ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300"
                            : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                    )}>
                        <Clock className="w-3 h-3 mr-1.5" />
                        {path.experienceRange}
                    </Badge>
                    {isExpert && (
                        <div className="bg-amber-100 dark:bg-amber-900/20 p-1.5 rounded-full">
                            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                        </div>
                    )}
                </div>
                <CardTitle className="text-2xl font-bold group-hover:text-primary transition-colors">
                    {path.title}
                </CardTitle>
            </CardHeader>

            <CardContent className="relative flex-1">
                <p className="text-muted-foreground leading-relaxed">
                    {path.description}
                </p>

                <div className="mt-6 space-y-2">
                    <div className="flex items-center text-sm text-foreground/80">
                        <Target className="w-4 h-4 mr-2 text-primary/70" />
                        <span>{path.steps.length} Learning Modules</span>
                    </div>
                </div>
            </CardContent>

            <CardFooter className="relative pt-6 border-t border-border/50 bg-muted/5 group-hover:bg-muted/10 transition-colors">
                <Link href={`/learn/${path.slug}`} className="w-full">
                    <button className="w-full flex items-center justify-between py-2 px-1 text-sm font-semibold text-primary/90 group-hover:text-primary transition-colors">
                        <span>Start Learning Path</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </button>
                </Link>
            </CardFooter>
        </Card>
    );
}
