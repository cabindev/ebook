"use client";

import { ChevronLeft, ChevronRight, FileSearch, Maximize } from "lucide-react";
import { useState, useRef } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import Link from "next/link";
import screenfull from "screenfull";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.mjs`;

interface PDFViewerProps {
    file: string;
}

export default function PDFViewer({ file }: PDFViewerProps) {
    const [numPages, setNumPages] = useState<number | null>(null);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [scale, setScale] = useState<number>(1);
    const containerRef = useRef<HTMLDivElement>(null);

    const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
        setNumPages(numPages);
        if (window.innerWidth < 768) {
            setScale(0.6);
        }
    };
    const handleDoubleClick = () => setScale((prev) => (prev === 1 ? 1.7 : 1));

    const zoomIn = () => setScale((prev) => Math.min(prev + 0.1, 2));
    const zoomOut = () => setScale((prev) => Math.max(prev - 0.1, 0.5));
    const resetZoom = () => setScale(1);

    const prevPage = () => setPageNumber((p) => Math.max(p - 1, 1));
    const nextPage = () => setPageNumber((p) => Math.min(p + 1, numPages || p));

    const toggleFullScreen = () => {
        if (containerRef.current && screenfull.isEnabled) {
            screenfull.toggle(containerRef.current);
        }
    };

    return (
        <div
            ref={containerRef}
            className="relative flex min-h-[600px] items-center justify-center border bg-gray-100"
        >
            <div className="absolute right-2 top-2 z-10 flex items-center gap-2 rounded-lg bg-white p-2 shadow">
                <button
                    onClick={zoomOut}
                    className="rounded p-1 hover:bg-gray-100"
                >
                    -
                </button>

                <span className="mx-2 text-sm font-medium">
                    {Math.round(scale * 100)}%
                </span>

                <button
                    onClick={zoomIn}
                    className="rounded p-1 hover:bg-gray-100"
                >
                    +
                </button>

                <div className="mx-2 h-6 w-px bg-gray-200" />

                <button
                    onClick={prevPage}
                    disabled={pageNumber <= 1}
                    className="rounded p-1 hover:bg-gray-100 disabled:opacity-50"
                >
                    <ChevronLeft className="h-5 w-5" />
                </button>

                <span className="mx-2 text-sm font-medium">
                    {pageNumber} / {numPages || "-"}
                </span>

                <button
                    onClick={nextPage}
                    disabled={pageNumber >= (numPages || 1)}
                    className="rounded p-1 hover:bg-gray-100 disabled:opacity-50"
                >
                    <ChevronRight className="h-5 w-5" />
                </button>

                <div className="mx-2 h-6 w-px bg-gray-200" />

                <button
                    onClick={toggleFullScreen}
                    className="rounded p-1 hover:bg-gray-100"
                >
                    <Maximize className="h-5 w-5" />
                </button>

                <Link
                    href={file}
                    target="_blank"
                    className="rounded p-1 hover:bg-gray-100"
                >
                    <FileSearch className="h-5 w-5" />
                </Link>
            </div>

            <div className="max-h-full max-w-full overflow-auto">
                <Document
                    file={file}
                    onLoadSuccess={onDocumentLoadSuccess}
                    onDoubleClick={handleDoubleClick}
                >
                    <Page
                        pageNumber={pageNumber}
                        scale={scale}
                        renderAnnotationLayer={false}
                        renderTextLayer={false}
                    />
                </Document>
            </div>
        </div>
    );
}
