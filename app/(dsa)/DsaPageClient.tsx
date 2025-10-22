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
    <div className="min-h-screen bg-background">
      {/* Toggle Button */}
      <Button
        variant="ghost"
        size="icon"
        aria-label="Toggle sidebar"
        onClick={() => setIsSidebarOpen((s) => !s)}
        className={cn(
          // mobile: floating button at top-left
          'fixed top-16 left-4 z-40 md:top-20',
          // on md+, move the button to the right edge of sidebar when open,
          // or keep it near left when sidebar closed
          isSidebarOpen ? 'md:left-72' : 'md:left-4',
          'transition-all'
        )}
      >
        {isSidebarOpen ? <PanelLeftClose /> : <PanelLeft />}
        <span className="sr-only">Toggle Sidebar</span>
      </Button>

      <div className="flex">
        {/* Sidebar
            - mobile: fixed overlay using translate-x
            - md+: in-flow (relative/static) and we toggle width between 0 and 64 (w-64).
            - using transition on width for smooth push animation
         */}
        <aside
          className={cn(
            'fixed top-14 left-0 z-30 h-[calc(100vh-3.5rem)] w-64 max-w-xs transform border-r bg-background transition-transform duration-200 ease-in-out',
            // mobile behavior: slide overlay
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full',
            // md+ behavior: make it part of the flow and control width instead of translate
            'md:static md:translate-x-0 md:h-auto md:transition-[width] md:duration-200',
            // on md, when closed make width 0 and hide overflow; when open set width 64
            isSidebarOpen ? 'md:w-64 md:overflow-visible' : 'md:w-0 md:overflow-hidden'
          )}
        >
          <div className="h-full">
            <DsaNav />
          </div>
        </aside>

        {/* Main content: on md the aside is in flow and its width will push this automatically.
            We still add md:ml-0/md:ml-0 because the aside is in flow; using ml would double-shift.
            We add padding top so mobile button doesn't overlap first lines.
        */}
        <main
          className={cn(
            'flex-1 transition-all duration-200 min-h-[calc(100vh-3.5rem)] px-4 pt-6 md:pt-4'
          )}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
