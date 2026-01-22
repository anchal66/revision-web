'use client';

import React from 'react';
import { learningPaths, revisionResources } from '@/data/learning-paths';
import { PathCard } from '@/components/PathCard';
import { FileText, Download, NotebookPen } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function LearnPage() {
    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header Section */}
            <div className="text-center space-y-4 max-w-2xl mx-auto pt-8">
                <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent pb-2">
                    Learning Paths
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed">
                    Structured roadmaps designed for every stage of your career. From Junior SDE to Tech Lead.
                </p>
            </div>

            {/* Paths Grid */}
            <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 max-w-5xl mx-auto">
                {learningPaths.map((path) => (
                    <PathCard key={path.slug} path={path} />
                ))}
            </section>

            {/* Revision Resources Section */}
            <section className="max-w-5xl mx-auto pt-16 border-t">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold tracking-tight mb-2">Revision Resources</h2>
                    <p className="text-muted-foreground">Quick reference guides, cheat sheets, and handwritten notes for last-minute prep.</p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {revisionResources.map((resource) => (
                        <Card key={resource.id} className="group hover:border-primary/50 transition-colors cursor-pointer bg-card/50">
                            <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
                                <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                    {resource.type === 'pdf' && <FileText className="w-5 h-5" />}
                                    {resource.type === 'note' && <NotebookPen className="w-5 h-5" />}
                                    {resource.type === 'template' && <Download className="w-5 h-5" />}
                                </div>
                            </CardHeader>
                            <CardContent>
                                <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors leading-tight mb-1">
                                    {resource.title}
                                </CardTitle>
                                <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
                                    {resource.type === 'pdf' ? 'PDF Document' : resource.type === 'note' ? 'Handwritten' : 'Template'}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>
        </div>
    );
}
