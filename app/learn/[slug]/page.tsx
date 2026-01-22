import React from 'react';
import { learningPaths } from '@/data/learning-paths';
import { TimelineView } from '@/components/TimelineView';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { ArrowLeft, Clock } from 'lucide-react';

/* 
  Correct way to generate static params in Next.js 13+ (no 'export const dynamic')
  This ensures paths are statically generated at build time.
*/
export async function generateStaticParams() {
    return learningPaths.map((path) => ({
        slug: path.slug,
    }));
}

interface PathPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export default async function PathDetailsPage({ params }: PathPageProps) {
    const resolvedParams = await params;

    // Find path data
    const path = learningPaths.find((p) => p.slug === resolvedParams.slug);

    if (!path) {
        notFound();
    }

    return (
        <div className="animate-in fade-in duration-500">
            {/* Header */}
            <div className="bg-muted/30 border-b">
                <div className="max-w-4xl mx-auto px-6 py-12">
                    <Link
                        href="/learn"
                        className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
                    >
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Back to Learning Paths
                    </Link>

                    <div className="flex items-center gap-3 mb-4">
                        <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-0">
                            {path.experienceRange}
                        </Badge>
                    </div>

                    <h1 className="text-3xl lg:text-5xl font-extrabold tracking-tight mb-4 text-foreground">
                        {path.title}
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
                        {path.description}
                    </p>
                </div>
            </div>

            {/* Timeline Content */}
            <div className="max-w-4xl mx-auto px-6">
                <TimelineView path={path} />
            </div>
        </div>
    );
}
