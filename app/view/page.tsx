'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';
import dynamic from 'next/dynamic';

// Dynamically import PDFViewer with SSR disabled
const PDFViewer = dynamic(
    () => import('@/components/PDFViewer').then((mod) => mod.PDFViewer),
    {
        ssr: false,
        loading: () => (
            <div className="min-h-screen flex items-center justify-center gap-3">
                <Loader2 className="w-6 h-6 animate-spin text-primary" />
                <span className="text-muted-foreground">Loading viewer...</span>
            </div>
        )
    }
);

function ViewerContent() {
    const searchParams = useSearchParams();
    const pdfPath = searchParams.get('pdf');
    const title = searchParams.get('title') || 'Document';
    const backUrl = searchParams.get('back') || '/learn';

    if (!pdfPath) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-muted-foreground">No PDF specified</p>
            </div>
        );
    }

    return (
        <PDFViewer
            pdfUrl={pdfPath}
            title={title}
            backUrl={backUrl}
        />
    );
}

export default function ViewPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center gap-3">
                <Loader2 className="w-6 h-6 animate-spin text-primary" />
                <span className="text-muted-foreground">Loading viewer...</span>
            </div>
        }>
            <ViewerContent />
        </Suspense>
    );
}
