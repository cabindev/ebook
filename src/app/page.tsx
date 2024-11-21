import BookList from "~/components/book/BookList";
import Heading from "~/components/Heading";
import Pagination from "~/components/Pagination";
import Search from "~/components/Search";
import TagList from "~/components/tag/TagList";
import Wrapper from "~/components/Wrapper";
import { getBooksWithPagination, getTags } from "~/db";
import { notFound } from "next/navigation";

interface PageProps {
    searchParams: { page: string; search: string };
}

export default async function page({ searchParams }: PageProps) {
    const page = parseInt(searchParams.page) || 1;
    const search = searchParams.search || "";

    const bookPagination = await getBooksWithPagination({ page, search });
    const tags = await getTags();

    // if (page > bookPagination.totalPages) notFound();

    return (
        <Wrapper className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <Heading>หนังสือทั้งหมด</Heading>
                <Search />
            </div>

            <TagList tags={tags} isManager={false} />
            <BookList books={bookPagination.books} isManager={false} />

            <Pagination
                totalPages={bookPagination.totalPages}
                currentPage={bookPagination.currentPage}
            />
        </Wrapper>
    );
}
