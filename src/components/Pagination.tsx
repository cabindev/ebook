"use client";

import { Fragment } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "~/libs";
import Button from "./Button";

interface PaginationProps {
   totalPages: number;
   currentPage: number;
}

export default function Pagination({
   totalPages,
   currentPage,
}: PaginationProps) {
   const router = useRouter();
   const searchParams = useSearchParams();

   const handlePageChange = (page: number) => {
       const params = new URLSearchParams(searchParams);
       params.set("page", page.toString());
       router.push(`?${params.toString()}`);
   };

   return (
       <div className="flex items-center justify-center gap-1.5">
           <Button
               onClick={() => handlePageChange(currentPage - 1)}
               disabled={currentPage === 1}
               className={cn(
                   "px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-amber-50",
                   currentPage === 1 && "cursor-not-allowed opacity-50"
               )}
               variants="outline"
           >
               ก่อนหน้า
           </Button>

           {Array.from({ length: totalPages }, (_, i) => i + 1)
               .filter(
                   (page) =>
                       page === 1 ||
                       page === totalPages ||
                       Math.abs(currentPage - page) <= 1,
               )
               .map((page, i, arr) => (
                   <Fragment key={page}>
                       {i > 0 && arr[i] - arr[i - 1] > 1 && (
                           <span className="text-gray-400">...</span>
                       )}
                       <Button
                           variants="outline"
                           onClick={() => handlePageChange(page)}
                           className={cn(
                               "min-w-[32px] px-2 py-1 text-sm font-medium text-gray-700",
                               currentPage === page 
                                   ? "bg-amber-50 border-amber-200 text-amber-700" 
                                   : "hover:bg-amber-50 hover:border-amber-200"
                           )}
                       >
                           {page}
                       </Button>
                   </Fragment>
               ))}

           <Button
               onClick={() => handlePageChange(currentPage + 1)}
               disabled={currentPage === totalPages}
               className={cn(
                   "px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-amber-50",
                   currentPage === totalPages && "cursor-not-allowed opacity-50"
               )}
               variants="outline"
           >
               ถัดไป
           </Button>
       </div>
   );
}