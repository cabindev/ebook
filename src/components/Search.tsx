"use client";

import Button from "./Button";
import Input from "./Input";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

export default function Search() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [value, setValue] = useState(searchParams.get("search") || "");

    const handleSearch = () => {
        const params = new URLSearchParams(searchParams);
        if (value) {
            params.set("search", value);
        } else {
            params.delete("search");
        }
        router.push(`?${params.toString()}`);
    };

    return (
        <div className="flex justify-center w-full">
            <div className="relative w-full max-w-xl">
                <Input
                    className="w-full pl-4 pr-12 py-3 rounded-lg border border-gray-200 
                              focus:border-amber-500 focus:ring-2 focus:ring-amber-100 
                              transition-colors shadow-sm"
                    placeholder="ค้นหาหนังสือ..."
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleSearch();
                        }
                    }}
                />
                <Button
                    onClick={handleSearch}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-md
                              bg-amber-500 hover:bg-amber-600 text-white transition-colors"
                >
                    <MagnifyingGlassIcon className="size-5" />
                </Button>
            </div>
        </div>
    );
}