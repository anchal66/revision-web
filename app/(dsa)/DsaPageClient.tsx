'use client';

import { TOCProvider } from '@/components/TOCContext';

export function DsaPageClient({ children }: { children: React.ReactNode }) {
  return (
    <TOCProvider>
      <div className="min-h-screen bg-background relative">
        <main className="container mx-auto px-4 py-8 max-w-5xl animate-in fade-in duration-500">
          {children}
        </main>
      </div>
    </TOCProvider>
  );
}
