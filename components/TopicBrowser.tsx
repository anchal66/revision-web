'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Topic } from '@/data/topics';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, BookOpen, Code, Layers } from 'lucide-react';
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
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                <SearchBar value={searchQuery} onChange={setSearchQuery} />
                <ViewToggle view={viewMode} onToggle={setViewMode} />
            </div>

            {filteredTopics.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                    <Layers className="mx-auto h-12 w-12 mb-4 opacity-20" />
                    <p className="text-lg">No topics found matching &quot;{searchQuery}&quot;</p>
                </div>
            ) : (
                <div
                    className={cn(
                        'grid gap-6',
                        viewMode === 'grid'
                            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                            : 'grid-cols-1'
                    )}
                >
                    {filteredTopics.map((topic) => (
                        <Link href={`/${topic.slug}`} key={topic.slug}>
                            <Card className="h-full hover:border-primary transition-all duration-200 group hover:shadow-md">
                                <CardHeader className={cn(viewMode === 'list' && 'flex flex-row items-center gap-6 space-y-0')}>
                                    <div className="flex-1 space-y-2">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                {topic.type === 'theory' ? (
                                                    <Badge variant="secondary" className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 hover:bg-blue-100">
                                                        <BookOpen className="w-3 h-3 mr-1" /> Theory
                                                    </Badge>
                                                ) : (
                                                    <Badge variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 hover:bg-green-100">
                                                        <Code className="w-3 h-3 mr-1" /> DSA
                                                    </Badge>
                                                )}
                                            </div>
                                            {viewMode === 'grid' && (
                                                <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors -rotate-45 group-hover:rotate-0" />
                                            )}
                                        </div>
                                        <CardTitle className="text-xl leading-tight group-hover:text-primary transition-colors">
                                            {topic.title}
                                        </CardTitle>
                                        <CardDescription className="line-clamp-2">
                                            {topic.description}
                                        </CardDescription>
                                    </div>
                                    {viewMode === 'list' && (
                                        <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                                    )}
                                </CardHeader>
                            </Card>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
