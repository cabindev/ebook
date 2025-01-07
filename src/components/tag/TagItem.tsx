import Link from "next/link";
import { Prisma } from "@prisma/client";
import { cn } from "~/libs";

interface TagItemProps {
    tag: Prisma.tagGetPayload<{
        include: {
            books: true;
        };
    }>;
    isManager: boolean;
}

export default function TagItem({ tag, isManager }: TagItemProps) {
    const tagOrigin = isManager ? "/manager/tags/" + tag.id : "/tags/" + tag.id;
    const isBookEmpty = tag.books.length <= 0;
    const tagPath = isBookEmpty && !isManager ? "#" : tagOrigin;

    return (
        <Link
            href={tagPath}
            className={cn(
                "min-w-16 rounded-full border bg-amber-50 px-3 py-1 text-sm text-gray-600 shadow-sm transition hover:bg-amber-100",
                { "cursor-not-allowed opacity-75": isBookEmpty && !isManager },
            )}
        >
            <span className="font-normal">{tag.title}</span>{" "}
            <span className="text-gray-500">({tag.books.length})</span>
        </Link>
     );
}
