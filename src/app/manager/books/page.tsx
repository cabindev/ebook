import Link from "next/link";
import Search from "~/components/Search";
import BookList from "~/components/book/BookList";
import Button from "~/components/Button";
import Heading from "~/components/Heading";
import Pagination from "~/components/Pagination";
import TagList from "~/components/tag/TagList";
import Wrapper from "~/components/Wrapper";
import { notFound } from "next/navigation";
import { getBooksWithPagination, getTags } from "~/db";

interface PageProps {
    searchParams: { page: string; search: string };
}

export default async function page({ searchParams }: PageProps) {
    const page = parseInt(searchParams.page) || 1;
    const search = searchParams.search || "";

    const bookPagination = await getBooksWithPagination({ page, search });
    const tags = await getTags();

    const isTagEmpty = tags.length <= 0;
    const addBookPath = isTagEmpty
        ? "/manager/tags/create"
        : "/manager/books/create";

    // if (page > bookPagination.totalPages) notFound();

    return (
        <Wrapper className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <Heading>จัดการหนังสือ</Heading>

                <div className="space-x-2">
                    <Link href={addBookPath}>
                        <Button variants="outline">เพิ่มหนังสือ</Button>
                    </Link>
                    <Link href="/manager/tags/create">
                        <Button variants="outline">เพิ่มหมวดหมู่</Button>
                    </Link>
                </div>

                <Search />
            </div>

            <TagList tags={tags} isManager={true} />
            <BookList books={bookPagination.books} isManager={true} />

            <Pagination
                totalPages={bookPagination.totalPages}
                currentPage={bookPagination.currentPage}
            />
        </Wrapper>
    );
}
