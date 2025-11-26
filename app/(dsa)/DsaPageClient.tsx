'use client';

import { useState, useEffect, useRef } from 'react';
import { useMediaQuery } from './use-media-query';
import { DsaNav } from '@/components/DsaNav';
import { Button } from '@/components/ui/button';
import { PanelLeft, PanelLeftClose } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TOCProvider } from '@/components/TOCContext';

export function DsaPageClient({ children }: { children: React.ReactNode }) {
  return (
    <TOCProvider>
      <DsaPageClientContent>{children}</DsaPageClientContent>
    </TOCProvider>
  );
}

function DsaPageClientContent({ children }: { children: React.ReactNode }) {
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
    <div className="min-h-screen bg-background relative flex flex-col md:flex-row">
      {/* Toggle Button */}
      <Button
        variant="ghost"
        size="icon"
        aria-label="Toggle sidebar"
        onClick={() => setIsSidebarOpen((s) => !s)}
        className={cn(
          // Base styles
          'fixed top-20 z-50 transition-all duration-200',
          // Mobile specific
          'left-5 md:hidden',
          // Desktop specific
          'hidden md:flex',
          isSidebarOpen ? 'md:left-72' : 'md:left-4'
        )}
      >
        {isSidebarOpen ? <PanelLeftClose /> : <PanelLeft />}
        <span className="sr-only">Toggle Sidebar</span>
      </Button>

      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={cn(
          'fixed top-14 left-0 z-40 h-[calc(100vh-3.5rem)] w-72 transform border-r bg-background transition-transform duration-200 ease-in-out shadow-lg md:shadow-none',
          // mobile behavior
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full',
          // desktop behavior: Sticky
          'md:sticky md:top-14 md:translate-x-0 md:h-[calc(100vh-3.5rem)]',
          isSidebarOpen
            ? 'md:w-72 md:block'
            : 'md:w-0 md:overflow-hidden md:border-none'
        )}
      >
        <div className="h-full overflow-y-auto py-4">
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
          'flex-1 min-w-0 transition-all duration-200 px-4 pt-6 md:pt-8 md:px-8',
          // Add left padding on desktop when sidebar is closed to avoid overlap with toggle button
          !isSidebarOpen && 'md:pl-16'
        )}
      >
        {children}
      </main>
    </div>
  );
}
