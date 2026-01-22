'use client';

import React, { useState, useCallback } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Loader2, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PDFViewerProps {
    pdfUrl: string;
    title?: string;
    backUrl?: string;
}

export function PDFViewer({ pdfUrl, title, backUrl = '/learn' }: PDFViewerProps) {
    const [numPages, setNumPages] = useState<number>(0);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [scale, setScale] = useState<number>(1.2);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const onDocumentLoadSuccess = useCallback(({ numPages }: { numPages: number }) => {
        setNumPages(numPages);
        setLoading(false);
    }, []);

    const onDocumentLoadError = useCallback((err: Error) => {
        setError(err.message);
        setLoading(false);
    }, []);

    const goToPrevPage = () => setPageNumber((prev) => Math.max(prev - 1, 1));
    const goToNextPage = () => setPageNumber((prev) => Math.min(prev + 1, numPages));
    const zoomIn = () => setScale((prev) => Math.min(prev + 0.2, 2.5));
    const zoomOut = () => setScale((prev) => Math.max(prev - 0.2, 0.5));

    // Prevent right-click context menu
    const handleContextMenu = (e: React.MouseEvent) => {
        e.preventDefault();
        return false;
    };

    return (
        <div
            className="min-h-screen bg-background flex flex-col"
            onContextMenu={handleContextMenu}
            style={{ userSelect: 'none' }}
        >
            {/* Header Controls */}
            <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b">
                <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
                    {/* Back Button */}
                    <Link
                        href={backUrl}
                        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span className="hidden sm:inline">Back</span>
                    </Link>

                    {/* Title */}
                    {title && (
                        <h1 className="text-sm font-medium truncate flex-1 text-center">
                            {title}
                        </h1>
                    )}

                    {/* Controls */}
                    <div className="flex items-center gap-2">
                        {/* Zoom */}
                        <div className="flex items-center gap-1 border rounded-lg p-1">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={zoomOut}
                                disabled={scale <= 0.5}
                            >
                                <ZoomOut className="w-4 h-4" />
                            </Button>
                            <span className="text-xs w-12 text-center">{Math.round(scale * 100)}%</span>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={zoomIn}
                                disabled={scale >= 2.5}
                            >
                                <ZoomIn className="w-4 h-4" />
                            </Button>
                        </div>

                        {/* Page Navigation */}
                        <div className="flex items-center gap-1 border rounded-lg p-1">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={goToPrevPage}
                                disabled={pageNumber <= 1}
                            >
                                <ChevronLeft className="w-4 h-4" />
                            </Button>
                            <span className="text-xs w-16 text-center">
                                {pageNumber} / {numPages || '...'}
                            </span>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={goToNextPage}
                                disabled={pageNumber >= numPages}
                            >
                                <ChevronRight className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* PDF Display Area */}
            <div className="flex-1 overflow-auto flex justify-center py-8 px-4 bg-muted/30">
                {loading && (
                    <div className="flex items-center justify-center gap-3 text-muted-foreground">
                        <Loader2 className="w-6 h-6 animate-spin" />
                        <span>Loading PDF...</span>
                    </div>
                )}

                {error && (
                    <div className="flex flex-col items-center justify-center gap-4 text-center">
                        <p className="text-destructive font-medium">Failed to load PDF</p>
                        <p className="text-sm text-muted-foreground">{error}</p>
                        <Link href={backUrl}>
                            <Button variant="outline">Go Back</Button>
                        </Link>
                    </div>
                )}

                <Document
                    file={pdfUrl}
                    onLoadSuccess={onDocumentLoadSuccess}
                    onLoadError={onDocumentLoadError}
                    loading={null}
                    className={cn(loading && 'hidden')}
                >
                    <Page
                        pageNumber={pageNumber}
                        scale={scale}
                        renderTextLayer={false}
                        renderAnnotationLayer={false}
                        className="shadow-2xl rounded-lg overflow-hidden"
                    />
                </Document>
            </div>

            {/* Watermark Overlay (optional - can be enabled) */}
            {/* Watermark Overlay */}
            <div className="fixed inset-0 pointer-events-none flex items-center justify-center opacity-5 select-none z-0">
                <span className="text-6xl sm:text-8xl font-bold text-foreground rotate-[-30deg] whitespace-nowrap">
                    Interview Revision
                </span>
            </div>
        </div>
    );
}
