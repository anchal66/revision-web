'use client';

import { useState, useEffect } from 'react';
import { useMediaQuery } from './use-media-query';
import { DsaNav } from '@/components/DsaNav';
import { Button } from '@/components/ui/button';
import { PanelLeft, PanelLeftClose } from 'lucide-react';
import { cn } from '@/lib/utils';

export function DsaPageClient({ children }: { children: React.ReactNode }) {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const [isSidebarOpen, setIsSidebarOpen] = useState(isDesktop);

  useEffect(() => {
    setIsSidebarOpen(isDesktop);
  }, [isDesktop]);

  return (
    <div className="grid md:grid-cols-1">
      {/* Sidebar Toggle Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed top-[4.5rem] left-4 z-30 md:sticky md:top-20 md:left-0 md:self-start"
      >
        {isSidebarOpen ? <PanelLeftClose /> : <PanelLeft />}
        <span className="sr-only">Toggle Sidebar</span>
      </Button>

      <div className="flex">
        <aside
          className={cn(
            'fixed top-14 z-20 h-[calc(100vh-3.5rem)] w-full max-w-xs shrink-0 transform border-r bg-background transition-transform md:sticky md:w-64',
            isSidebarOpen
              ? 'translate-x-0'
              : '-translate-x-full md:translate-x-0 md:-ml-64'
          )}
        >
          <DsaNav />
        </aside>
        <div
          className={cn('flex-1 transition-all', isSidebarOpen && 'md:ml-[-64px]')}
        >
          {children}
        </div>
      </div>
    </div>
  );
}