'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
BookOpen,
    LayoutGrid,
    Code,
    Layers,
    Menu,
    X,
    GraduationCap
} from 'lucide-react';

interface SidebarItem {
    title: string;
    href: string;
    icon: React.ElementType;
}

const mainNavIds: SidebarItem[] = [
    { title: 'Explore', href: '/', icon: LayoutGrid },
    { title: 'Learn', href: '/learn', icon: GraduationCap },
    { title: 'Practice', href: '/practice', icon: Code },
    { title: 'System Design', href: '/system-design', icon: Layers },
];

export function Sidebar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Mobile Menu Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed top-4 left-4 z-50 p-2 rounded-md bg-background border shadow-sm md:hidden"
            >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Sidebar Container */}
            <aside
                className={cn(
                    "fixed inset-y-0 left-0 z-40 w-64 transform bg-sidebar border-r border-sidebar-border transition-transform duration-200 ease-in-out md:translate-x-0 md:static md:h-screen md:sticky md:top-0",
                    isOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                <div className="flex flex-col h-full">
                    {/* Logo Area */}
                    <div className="flex items-center h-16 px-6 border-b border-sidebar-border/50">
                        <Link href="/" className="flex items-center gap-2 group">
                            <div className="bg-primary/10 p-1.5 rounded-lg group-hover:bg-primary/20 transition-colors">
                                <BookOpen className="w-5 h-5 text-primary" />
                            </div>
                            <span className="font-bold text-lg tracking-tight text-sidebar-foreground">
                                Revision<span className="text-primary">.io</span>
                            </span>
                        </Link>
                    </div>

                    {/* Navigation */}
                    <div className="flex-1 overflow-y-auto py-6 px-3">
                        <nav className="space-y-1">
                            {mainNavIds.map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        onClick={() => setIsOpen(false)}
                                        className={cn(
                                            "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-all duration-200",
                                            isActive
                                                ? "bg-sidebar-accent text-sidebar-primary-foreground font-semibold shadow-sm ring-1 ring-inset ring-sidebar-border"
                                                : "text-muted-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                                        )}
                                    >
                                        <item.icon className={cn("w-4 h-4", isActive ? "text-primary" : "text-muted-foreground")} />
                                        {item.title}
                                    </Link>
                                );
                            })}
                        </nav>

                        <div className="mt-8">
                            <h3 className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                                Topics
                            </h3>
                            <div className="space-y-1">
                                {/* This could be dynamic later */}
                                <Link
                                    href="/java"
                                    className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-muted-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-foreground transition-colors"
                                >
                                    <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                                    Java
                                </Link>
                                <Link
                                    href="/system-design"
                                    className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-muted-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-foreground transition-colors"
                                >
                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                                    System Design
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Footer / User Area */}
                    <div className="p-4 border-t border-sidebar-border">
                        <button className="flex items-center gap-3 w-full p-2 rounded-md hover:bg-sidebar-accent/50 transition-colors">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-purple-500" />
                            <div className="text-left">
                                <p className="text-sm font-medium text-sidebar-foreground">Guest User</p>
                                <p className="text-xs text-muted-foreground">Sign in to sync</p>
                            </div>
                        </button>
                    </div>
                </div>
            </aside>

            {/* Overlay for mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-30 bg-black/50 md:hidden backdrop-blur-sm"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </>
    );
}
