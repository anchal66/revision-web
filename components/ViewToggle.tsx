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
        <div className="flex items-center gap-1 border rounded-md p-1 bg-muted/20">
            <Button
                variant="ghost"
                size="sm"
                onClick={() => onToggle('grid')}
                className={cn(
                    'h-8 w-8 p-0',
                    view === 'grid' && 'bg-background shadow-sm text-primary'
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
                    'h-8 w-8 p-0',
                    view === 'list' && 'bg-background shadow-sm text-primary'
                )}
            >
                <List className="h-4 w-4" />
                <span className="sr-only">List View</span>
            </Button>
        </div>
    );
}
