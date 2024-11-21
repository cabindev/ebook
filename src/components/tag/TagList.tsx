import TagItem from "./TagItem";
import { Prisma } from "@prisma/client";

interface TagListProps {
    tags: Prisma.tagGetPayload<{
        include: {
            books: true;
        };
    }>[];
    isManager: boolean;
}

export default function TagList({ tags, isManager }: TagListProps) {
    return (
        <div className="flex items-center justify-start gap-2">
            {tags.map((tag, i) => (
                <TagItem key={i} tag={tag} isManager={isManager} />
            ))}
        </div>
    );
}
