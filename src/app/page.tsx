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
        <Wrapper className="space-y-8">
            <div className="w-full space-y-8">
                {/* Search Section */}
                <div className="flex justify-center w-full">
                    <Search />
                </div>
     
                {/* Tags Section */}
                <div className="bg-white rounded-xl p-6 shadow-sm">
                    <h2 className="text-lg text-gray-700 mb-4">หมวดหมู่หนังสือ</h2>
                    <TagList tags={tags} isManager={false} />
                </div>
     
                {/* Books Section */}
                <div className="bg-white rounded-xl p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg text-gray-700">หนังสือทั้งหมด</h2>
                        {search && (
                            <span className="text-sm text-gray-500">
                                ผลการค้นหา: "{search}"
                            </span>
                        )}
                    </div>
                    <BookList books={bookPagination.books} isManager={false} />
                </div>
     
                {/* Pagination */}
                <div className="flex justify-center mt-4">
                    <Pagination
                        totalPages={bookPagination.totalPages}
                        currentPage={bookPagination.currentPage}
                    />
                </div>
            </div>
        </Wrapper>
     );
}
