"use client";

import { ChevronLeft, ChevronRight, FileSearch, Maximize } from "lucide-react";
import { useState, useRef } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import Link from "next/link";
import screenfull from "screenfull";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.mjs`;

interface PDFViewerProps {
   pdfUrl: string;
}

function LoadingSpinner() {
    return (
        <div className="flex h-[600px] items-center justify-center">
            <div className="text-center">
                <div className="h-16 w-16 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600" />
                <p className="mt-4 text-gray-600">กำลังโหลด PDF...</p>
            </div>
        </div>
    );
}

function ErrorDisplay() {
    return (
        <div className="flex h-[600px] items-center justify-center">
            <div className="text-center">
                <p className="text-lg font-medium text-red-600">ไม่สามารถโหลดไฟล์ PDF ได้</p>
                <p className="mt-2 text-gray-600">โปรดลองใหม่อีกครั้ง</p>
            </div>
        </div>
    );
}

export default function PDFViewer({ pdfUrl }: PDFViewerProps) {
   const [numPages, setNumPages] = useState<number | null>(null);
   const [pageNumber, setPageNumber] = useState<number>(1);
   const [scale, setScale] = useState<number>(1);
   const [isLoading, setIsLoading] = useState(true);
   const [hasError, setHasError] = useState(false);
   const containerRef = useRef<HTMLDivElement>(null);

   const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
       setNumPages(numPages);
       setIsLoading(false);
       if (window.innerWidth < 768) {
           setScale(0.6);
       }
   };

   const onDocumentLoadError = (error: Error) => {
       console.error('PDF load error:', error);
       setHasError(true);
       setIsLoading(false);
   };

   const setZoomLevel = (level: number) => setScale(level);
   const prevPage = () => setPageNumber((p) => Math.max(p - 1, 1));
   const nextPage = () => setPageNumber((p) => Math.min(p + 1, numPages || p));

   const toggleFullScreen = () => {
       if (containerRef.current && screenfull.isEnabled) {
           screenfull.toggle(containerRef.current);
       }
   };

   if (hasError) return <ErrorDisplay />;

   return (
       <div
           ref={containerRef}
           className="relative flex min-h-[600px] items-center justify-center border bg-gray-100"
       >
           <div className="absolute right-2 top-2 z-10 flex items-center gap-2 rounded-lg bg-white p-2 shadow">
               {/* Zoom controls */}
               <button onClick={() => setZoomLevel(0.5)} 
                   className="text-sm rounded px-2 py-1 hover:bg-gray-100">
                   50%
               </button>
               <button onClick={() => setZoomLevel(1)} 
                   className="text-sm rounded px-2 py-1 hover:bg-gray-100">
                   100%
               </button>
               <button onClick={() => setZoomLevel(1.7)} 
                   className="text-sm rounded px-2 py-1 hover:bg-gray-100">
                   170%
               </button>

               <div className="mx-2 h-6 w-px bg-gray-200" />

               {/* Page navigation */}
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

               {/* Additional controls */}
               <button
                   onClick={toggleFullScreen}
                   className="rounded p-1 hover:bg-gray-100"
               >
                   <Maximize className="h-5 w-5" />
               </button>
               <Link
                   href={pdfUrl}
                   target="_blank"
                   className="rounded p-1 hover:bg-gray-100"
               >
                   <FileSearch className="h-5 w-5" />
               </Link>
           </div>

           <div className="max-h-full max-w-full overflow-auto">
               <Document
                   file={pdfUrl}
                   onLoadSuccess={onDocumentLoadSuccess}
                   onLoadError={onDocumentLoadError}
                   loading={<LoadingSpinner />}
                   error={<ErrorDisplay />}
               >
                   <Page
                       pageNumber={pageNumber}
                       scale={scale}
                       renderAnnotationLayer={false}
                       renderTextLayer={false}
                       loading={<LoadingSpinner />}
                   />
               </Document>
           </div>
       </div>
   );
}