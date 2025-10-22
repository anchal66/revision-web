'use client';

import { useState, useEffect, useRef } from 'react';
import { useMediaQuery } from './use-media-query';
import { DsaNav } from '@/components/DsaNav';
import { Button } from '@/components/ui/button';
import { PanelLeft, PanelLeftClose } from 'lucide-react';
import { cn } from '@/lib/utils';

export function DsaPageClient({ children }: { children: React.ReactNode }) {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const [isSidebarOpen, setIsSidebarOpen] = useState(isDesktop);
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsSidebarOpen(isDesktop);
  }, [isDesktop]);

  // 🪄 Close sidebar on mobile when clicking outside it
  useEffect(() => {
    if (isDesktop || !isSidebarOpen) return;

    function handleClickOutside(e: MouseEvent) {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target as Node)
      ) {
        setIsSidebarOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isSidebarOpen, isDesktop]);

  return (
    <div className="min-h-screen bg-background relative">
      {/* Toggle Button */}
      <Button
        variant="ghost"
        size="icon"
        aria-label="Toggle sidebar"
        onClick={() => setIsSidebarOpen((s) => !s)}
        className={cn(
          // ✅ Mobile: floating button slightly away from edge & higher for visibility
          'fixed top-20 left-5 z-50 md:top-20 transition-all',
          // ✅ Desktop: move button right when sidebar open
          isSidebarOpen ? 'md:left-72' : 'md:left-4'
        )}
      >
        {isSidebarOpen ? <PanelLeftClose /> : <PanelLeft />}
        <span className="sr-only">Toggle Sidebar</span>
      </Button>

      <div className="flex">
        {/* Sidebar */}
        <aside
          ref={sidebarRef}
          className={cn(
            'fixed top-14 left-0 z-40 h-[calc(100vh-3.5rem)] w-64 max-w-xs transform border-r bg-background transition-transform duration-200 ease-in-out shadow-lg md:shadow-none',
            // mobile behavior
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full',
            // desktop behavior
            'md:static md:translate-x-0 md:transition-[width] md:duration-200',
            isSidebarOpen
              ? 'md:w-64 md:overflow-visible'
              : 'md:w-0 md:overflow-hidden'
          )}
        >
          <div className="h-full overflow-y-auto">
            <DsaNav />
          </div>
        </aside>

        {/* Backdrop overlay on mobile when open */}
        {!isDesktop && isSidebarOpen && (
          <div className="fixed inset-0 z-30 bg-black/30 backdrop-blur-[1px] transition-opacity md:hidden"></div>
        )}

        {/* Main content */}
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
