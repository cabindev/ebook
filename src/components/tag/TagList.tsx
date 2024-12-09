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
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 pb-2">
            {tags.map((tag, i) => (
                <TagItem 
                    key={i} 
                    tag={tag} 
                    isManager={isManager}
                />
            ))}
        </div>
    );
}
