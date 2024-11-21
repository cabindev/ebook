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
                "min-w-16 rounded-full border bg-gray-100 px-4 py-1 font-medium text-gray-500 shadow-sm",
                { "cursor-not-allowed": isBookEmpty && !isManager },
            )}
        >
            {tag.title} ({tag.books.length})
        </Link>
    );
}
