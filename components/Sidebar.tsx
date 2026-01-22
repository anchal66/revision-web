'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
    BookOpen,
    LayoutGrid,
    Code,
    Menu,
    X,
    GraduationCap,
    Server,
    FileText,
    ChevronRight,
    StickyNote
} from 'lucide-react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { topics } from '@/data/topics';
import { learningPaths, revisionResources } from '@/data/learning-paths';

interface SidebarItem {
    title: string;
    href: string;
    icon: React.ElementType;
}

const mainNavIds: SidebarItem[] = [
    { title: 'Explore', href: '/', icon: LayoutGrid },
    { title: 'DSA', href: '/dsa', icon: Code },
    { title: 'Technology', href: '/technology', icon: Server },
    { title: 'Career Paths', href: '/learn', icon: GraduationCap },
];

export function Sidebar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    // Group topics for the tree view
    const treeData = useMemo(() => {
        const dsaTopics = topics.filter(t => t.category === 'DSA');
        const techTopics = topics.filter(t => ['Java & Spring', 'System Design', 'Cloud & Architecture'].includes(t.category));

        return {
            dsa: dsaTopics,
            tech: techTopics
        };
    }, []);

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
                    "fixed inset-y-0 left-0 z-40 w-80 transform bg-sidebar border-r border-sidebar-border transition-transform duration-200 ease-in-out md:translate-x-0 md:static md:h-screen md:sticky md:top-0 flex flex-col",
                    isOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                {/* Logo Area */}
                <div className="flex items-center h-16 px-6 border-b border-sidebar-border/50 shrink-0">
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="bg-primary/10 p-1.5 rounded-lg group-hover:bg-primary/20 transition-colors">
                            <BookOpen className="w-5 h-5 text-primary" />
                        </div>
                        <span className="font-bold text-lg tracking-tight text-sidebar-foreground">
                            Revision<span className="text-primary">.io</span>
                        </span>
                    </Link>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto">
                    <div className="p-4 space-y-6">
                        {/* Main Navigation */}
                        <nav className="space-y-1">
                            {mainNavIds.map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        onClick={() => setIsOpen(false)}
                                        className={cn(
                                            "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200",
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

                        {/* Tree Navigation using Accordion */}
                        <div className="space-y-2">
                            <h3 className="px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                                Topics Tree
                            </h3>

                            <Accordion type="multiple" defaultValue={['dsa', 'tech']} className="w-full">
                                {/* DSA Section */}
                                <AccordionItem value="dsa" className="border-none">
                                    <AccordionTrigger className="py-2 px-3 text-sm font-medium hover:bg-sidebar-accent/30 rounded-md hover:no-underline text-sidebar-foreground">
                                        <div className="flex items-center gap-2">
                                            <Code className="w-4 h-4 text-emerald-500" />
                                            <span>DSA Topics</span>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="pb-2">
                                        <div className="pl-4 space-y-0.5 mt-1 border-l ml-3 border-sidebar-border">
                                            {treeData.dsa.map(topic => (
                                                <Link
                                                    key={topic.slug}
                                                    href={`/${topic.slug}`}
                                                    onClick={() => setIsOpen(false)}
                                                    className={cn(
                                                        "block px-3 py-1.5 text-sm transition-colors rounded-r-md border-l-2 border-transparent -ml-[1px]",
                                                        pathname === `/${topic.slug}`
                                                            ? "text-primary border-primary bg-primary/5 font-medium"
                                                            : "text-muted-foreground hover:text-foreground hover:bg-sidebar-accent/30"
                                                    )}
                                                >
                                                    {topic.title}
                                                </Link>
                                            ))}
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>

                                {/* Technology Section */}
                                <AccordionItem value="tech" className="border-none">
                                    <AccordionTrigger className="py-2 px-3 text-sm font-medium hover:bg-sidebar-accent/30 rounded-md hover:no-underline text-sidebar-foreground">
                                        <div className="flex items-center gap-2">
                                            <Server className="w-4 h-4 text-blue-500" />
                                            <span>Technology</span>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="pb-2">
                                        <div className="pl-4 space-y-0.5 mt-1 border-l ml-3 border-sidebar-border">
                                            {treeData.tech.map(topic => (
                                                <Link
                                                    key={topic.slug}
                                                    href={`/${topic.slug}`}
                                                    onClick={() => setIsOpen(false)}
                                                    className={cn(
                                                        "block px-3 py-1.5 text-sm transition-colors rounded-r-md border-l-2 border-transparent -ml-[1px]",
                                                        pathname === `/${topic.slug}`
                                                            ? "text-primary border-primary bg-primary/5 font-medium"
                                                            : "text-muted-foreground hover:text-foreground hover:bg-sidebar-accent/30"
                                                    )}
                                                >
                                                    {topic.title}
                                                </Link>
                                            ))}
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>

                                {/* Career Paths Section */}
                                <AccordionItem value="career" className="border-none">
                                    <AccordionTrigger className="py-2 px-3 text-sm font-medium hover:bg-sidebar-accent/30 rounded-md hover:no-underline text-sidebar-foreground">
                                        <div className="flex items-center gap-2">
                                            <GraduationCap className="w-4 h-4 text-indigo-500" />
                                            <span>Career Paths</span>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="pb-2">
                                        <div className="pl-4 space-y-2 mt-1 border-l ml-3 border-sidebar-border">
                                            {/* Sub-Accordion for each Path */}
                                            <Accordion type="multiple" className="w-full">
                                                {learningPaths.map((path) => (
                                                    <AccordionItem key={path.slug} value={path.slug} className="border-none">
                                                        <AccordionTrigger className="py-1.5 px-3 text-sm font-normal text-muted-foreground hover:text-foreground hover:bg-sidebar-accent/30 rounded-md hover:no-underline">
                                                            <div className="flex items-center gap-2">
                                                                <ChevronRight className="w-3 h-3 text-muted-foreground" />
                                                                <span className="truncate">{path.title}</span>
                                                            </div>
                                                        </AccordionTrigger>
                                                        <AccordionContent className="pb-1">
                                                            <div className="pl-4 space-y-0.5 border-l ml-2.5 border-sidebar-border/50 mt-1">
                                                                {path.steps.map((step) => (
                                                                    <Link
                                                                        key={step.id}
                                                                        href={`/learn/${path.slug}#${step.id}`}
                                                                        onClick={() => setIsOpen(false)}
                                                                        className="block px-3 py-1 text-xs text-muted-foreground hover:text-primary transition-colors truncate hover:bg-sidebar-accent/20 rounded-sm"
                                                                        title={step.title}
                                                                    >
                                                                        {step.title}
                                                                    </Link>
                                                                ))}
                                                            </div>
                                                        </AccordionContent>
                                                    </AccordionItem>
                                                ))}

                                                {/* Revision Resources Sub-section */}
                                                <AccordionItem value="resources" className="border-none">
                                                    <AccordionTrigger className="py-1.5 px-3 text-sm font-normal text-muted-foreground hover:text-foreground hover:bg-sidebar-accent/30 rounded-md hover:no-underline">
                                                        <div className="flex items-center gap-2">
                                                            <StickyNote className="w-3 h-3 text-amber-500" />
                                                            <span>Revision Resources</span>
                                                        </div>
                                                    </AccordionTrigger>
                                                    <AccordionContent className="pb-1">
                                                        <div className="pl-4 space-y-0.5 border-l ml-2.5 border-sidebar-border/50 mt-1">
                                                            {revisionResources.map((res) => (
                                                                <Link
                                                                    key={res.id}
                                                                    href={res.pdfUrl ? `/view?pdf=${encodeURIComponent(res.pdfUrl)}&title=${encodeURIComponent(res.title)}` : '/learn#resources'}
                                                                    onClick={() => setIsOpen(false)}
                                                                    className="block px-3 py-1 text-xs text-muted-foreground hover:text-primary transition-colors truncate hover:bg-sidebar-accent/20 rounded-sm"
                                                                    title={res.title}
                                                                >
                                                                    <span className="flex items-center gap-1.5">
                                                                        {res.type === 'pdf' ? <FileText className="w-3 h-3" /> : <StickyNote className="w-3 h-3" />}
                                                                        {res.title}
                                                                    </span>
                                                                </Link>
                                                            ))}
                                                        </div>
                                                    </AccordionContent>
                                                </AccordionItem>
                                            </Accordion>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </div>
                    </div>
                </div>

                {/* Footer / User Area */}
                <div className="p-4 border-t border-sidebar-border shrink-0 bg-sidebar">
                    <button className="flex items-center gap-3 w-full p-2 rounded-md hover:bg-sidebar-accent/50 transition-colors">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-purple-500" />
                        <div className="text-left">
                            <p className="text-sm font-medium text-sidebar-foreground">Guest User</p>
                            <p className="text-xs text-muted-foreground">Sign in to sync</p>
                        </div>
                    </button>
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
