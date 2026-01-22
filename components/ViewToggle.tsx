'use client';

import React from 'react';
import { LayoutGrid, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ViewToggleProps {
    view: 'grid' | 'list';
    onToggle: (view: 'grid' | 'list') => void;
}

export function ViewToggle({ view, onToggle }: ViewToggleProps) {
    return (
        <div className="flex items-center gap-1 border border-border/50 rounded-md p-1 bg-muted/10">
            <Button
                variant="ghost"
                size="sm"
                onClick={() => onToggle('grid')}
                className={cn(
                    'h-8 w-8 p-0 rounded-sm transition-all',
                    view === 'grid'
                        ? 'bg-background shadow-sm text-primary ring-1 ring-border/50'
                        : 'text-muted-foreground hover:text-foreground'
                )}
            >
                <LayoutGrid className="h-4 w-4" />
                <span className="sr-only">Grid View</span>
            </Button>
            <Button
                variant="ghost"
                size="sm"
                onClick={() => onToggle('list')}
                className={cn(
                    'h-8 w-8 p-0 rounded-sm transition-all',
                    view === 'list'
                        ? 'bg-background shadow-sm text-primary ring-1 ring-border/50'
                        : 'text-muted-foreground hover:text-foreground'
                )}
            >
                <List className="h-4 w-4" />
                <span className="sr-only">List View</span>
            </Button>
        </div>
    );
}
