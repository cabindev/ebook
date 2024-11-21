import BookList from "~/components/book/BookList";
import Heading from "~/components/Heading";
import TagList from "~/components/tag/TagList";
import Wrapper from "~/components/Wrapper";
import { getBooksByTagId, getTagById, getTags } from "~/db";
import { notFound } from "next/navigation";
interface PageProps {
    params: { tid: string };
}

export default async function page({ params }: PageProps) {
    const { tid } = params;

    const tag = await getTagById({ id: tid });
    if (!tag) notFound();

    const books = await getBooksByTagId({ id: tag.id });
    const tags = await getTags();

    return (
        <Wrapper className="space-y-4">
            <Heading>หนังสือทั้งหมดของ {tag.title}</Heading>
            <TagList tags={tags} isManager={false} />
            <BookList books={books} isManager={false} />
        </Wrapper>
    );
}
