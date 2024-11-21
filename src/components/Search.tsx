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
        <div className="grid w-full grid-cols-4 gap-2 sm:w-56">
            <Input
                className="col-span-3"
                placeholder="ค้นหา"
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
                className="col-span-1 flex items-center justify-center"
            >
                <MagnifyingGlassIcon className="size-5" />
            </Button>
        </div>
    );
}
