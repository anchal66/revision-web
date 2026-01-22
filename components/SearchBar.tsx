'use client';

import React from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
    return (
        <div className="relative w-full sm:w-[300px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50" />
            <Input
                type="text"
                placeholder="Search topics..."
                className="pl-9 bg-muted/20 border-border/50 focus-visible:ring-primary/20 focus-visible:border-primary transition-all"
                value={value}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
            />
        </div>
    );
}
