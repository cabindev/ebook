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
import { PlusIcon } from "@heroicons/react/24/outline";

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

       return (
        <Wrapper className="space-y-8">
            <div className="flex flex-wrap items-start justify-between gap-6">
                <div className="space-y-6 w-full">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl text-gray-800">
                            จัดการหนังสือ
                        </h2>
     
                        <div className="flex gap-3">
                            <Link href={addBookPath}>
                                <Button variants="outline" 
                                    className="flex items-center gap-2 px-4 py-2 text-sm 
                                             bg-white hover:bg-gray-50 text-gray-700
                                             border border-gray-200 rounded-lg
                                             transition duration-200 ease-in-out
                                             shadow-sm hover:shadow">
                                    <PlusIcon className="w-4 h-4" />
                                    เพิ่มหนังสือ
                                </Button>
                            </Link>
                            <Link href="/manager/tags/create">
                                <Button variants="outline"
                                    className="flex items-center gap-2 px-4 py-2 text-sm
                                             bg-white hover:bg-gray-50 text-gray-700
                                             border border-gray-200 rounded-lg
                                             transition duration-200 ease-in-out
                                             shadow-sm hover:shadow">
                                    <PlusIcon className="w-4 h-4" />
                                    เพิ่มหมวดหมู่
                                </Button>
                            </Link>
                        </div>
                    </div>
     
                    <Search />
                </div>
     
                <div className="w-full space-y-6">
                    <TagList tags={tags} isManager={true} />
                    <BookList books={bookPagination.books} isManager={true} />
                </div>
     
                <Pagination
                    totalPages={bookPagination.totalPages}
                    currentPage={bookPagination.currentPage}
                />
            </div>
        </Wrapper>
     );
};