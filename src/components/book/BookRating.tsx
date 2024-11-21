"use client";

import Heading from "../Heading";
import { cn } from "~/libs";
import { useEffect, useState, useCallback } from "react";
import { StarIcon } from "@heroicons/react/24/solid";
import { updateBookRating } from "~/actions";

interface BookRatingProps {
    bookId: string;
    initialValue: number;
}

export default function BookRating({ bookId, initialValue }: BookRatingProps) {
    const [stars, setStars] = useState<number>(initialValue);

    const handleRatingUpdate = useCallback(async () => {
        if (stars > 0) {
            await updateBookRating({ id: bookId, stars });
        }
    }, [stars, bookId]);

    useEffect(() => {
        handleRatingUpdate();
    }, [handleRatingUpdate]);

    return (
        <div className="flex flex-col items-center gap-4">
            <Heading>ให้คะเเนนหนังสือ</Heading>

            <div className="flex items-center gap-4">
                {Array.from({ length: 5 }, (_, i) => (
                    <StarIcon
                        key={i}
                        className={cn("h-10 w-10 cursor-pointer", {
                            "text-yellow-400": stars >= i + 1,
                            "text-gray-200": stars < i + 1,
                        })}
                        onClick={() => setStars(i + 1)}
                    />
                ))}
            </div>
        </div>
    );
}
