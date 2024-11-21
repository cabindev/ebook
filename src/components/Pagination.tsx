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
        <div className="flex items-center justify-center space-x-2">
            <Button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={cn({
                    "cursor-not-allowed": currentPage === 1,
                })}
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
                        {i > 0 && arr[i] - arr[i - 1] > 1 && <span>...</span>}
                        <Button
                            variants="outline"
                            onClick={() => handlePageChange(page)}
                            className={cn({
                                "bg-gray-100": currentPage === page,
                            })}
                        >
                            {page}
                        </Button>
                    </Fragment>
                ))}

            <Button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={cn({
                    "cursor-not-allowed": currentPage === totalPages,
                })}
            >
                ถัดไป
            </Button>
        </div>
    );
}
