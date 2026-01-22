'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Topic } from '@/data/topics';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, BookOpen, Code, Layers, Sparkles } from 'lucide-react';
import { SearchBar } from './SearchBar';
import { ViewToggle } from './ViewToggle';
import { cn } from '@/lib/utils';

interface TopicBrowserProps {
    topics: Topic[];
}

export function TopicBrowser({ topics }: TopicBrowserProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

    const filteredTopics = useMemo(() => {
        if (!searchQuery) return topics;
        const lowerQuery = searchQuery.toLowerCase();
        return topics.filter(
            (topic) =>
                topic.title.toLowerCase().includes(lowerQuery) ||
                topic.description.toLowerCase().includes(lowerQuery)
        );
    }, [topics, searchQuery]);

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between border-b pb-6">
                <div className="space-y-1">
                    <h2 className="text-2xl font-semibold tracking-tight">Explore Topics</h2>
                    <p className="text-sm text-muted-foreground">Master core concepts for your next interview</p>
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                    <SearchBar value={searchQuery} onChange={setSearchQuery} />
                    <ViewToggle view={viewMode} onToggle={setViewMode} />
                </div>
            </div>

            {filteredTopics.length === 0 ? (
                <div className="text-center py-16 text-muted-foreground bg-muted/30 rounded-lg border border-dashed">
                    <Layers className="mx-auto h-12 w-12 mb-4 opacity-20" />
                    <p className="text-lg font-medium">No topics found matching &quot;{searchQuery}&quot;</p>
                    <p className="text-sm mt-1">Try adjusting your search terms</p>
                </div>
            ) : (
                <div
                    className={cn(
                        'grid gap-6',
                        viewMode === 'grid'
                            ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3'
                            : 'grid-cols-1'
                    )}
                >
                    {filteredTopics.map((topic) => (
                        <Link href={`/${topic.slug}`} key={topic.slug} className="group h-full">
                            <Card className="h-full border-muted-foreground/10 bg-card hover:bg-muted/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 overflow-hidden relative">
                                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                                <CardHeader className={cn("pb-3", viewMode === 'list' && 'flex flex-row items-start gap-6 space-y-0 pb-6')}>
                                    <div className="flex-1 space-y-3">
                                        <div className="flex items-center justify-between">
                                            <Badge variant="outline" className={cn(
                                                "font-normal tracking-wide uppercase text-[10px] px-2 py-0.5",
                                                topic.type === 'theory'
                                                    ? "border-blue-200 text-blue-700 bg-blue-50 dark:bg-blue-900/10 dark:text-blue-300 dark:border-blue-800"
                                                    : "border-emerald-200 text-emerald-700 bg-emerald-50 dark:bg-emerald-900/10 dark:text-emerald-300 dark:border-emerald-800"
                                            )}>
                                                {topic.type === 'theory' ? <BookOpen className="w-3 h-3 mr-1" /> : <Code className="w-3 h-3 mr-1" />}
                                                {topic.type === 'theory' ? 'Concept' : 'Pattern'}
                                            </Badge>
                                        </div>

                                        <CardTitle className="text-xl font-bold leading-tight group-hover:text-primary transition-colors flex items-center gap-2">
                                            {topic.title}
                                        </CardTitle>

                                        <CardDescription className="line-clamp-2 text-sm leading-relaxed">
                                            {topic.description}
                                        </CardDescription>
                                    </div>

                                    {viewMode === 'list' && (
                                        <div className="hidden sm:flex shrink-0 items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0 duration-300">
                                            <span className="text-sm font-medium text-primary mr-2">Start Learning</span>
                                            <ArrowRight className="h-4 w-4 text-primary" />
                                        </div>
                                    )}
                                </CardHeader>

                                {viewMode === 'grid' && (
                                    <CardFooter className="pt-0 mt-auto border-t border-border/50 p-4 bg-muted/10 group-hover:bg-muted/20 transition-colors">
                                        <div className="w-full flex items-center justify-between text-xs text-muted-foreground">
                                            <span className="flex items-center gap-1.5">
                                                <Sparkles className="w-3.5 h-3.5 text-orange-400" />
                                                <span>Beginner friendly</span>
                                            </span>
                                            <span className="group-hover:text-primary transition-colors font-medium flex items-center">
                                                Start <ArrowRight className="ml-1 w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                                            </span>
                                        </div>
                                    </CardFooter>
                                )}
                            </Card>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
