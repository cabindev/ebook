import Heading from "~/components/Heading";
import MemberTable from "~/components/member/MemberTable";
import Pagination from "~/components/Pagination";
import Search from "~/components/Search";
import Wrapper from "~/components/Wrapper";
import { getMembersWithPagination } from "~/db";
import { notFound } from "next/navigation";

interface PageProps {
    searchParams: { page: string; search: string };
}

export default async function page({ searchParams }: PageProps) {
    const page = parseInt(searchParams.page) || 1;
    const search = searchParams.search || "";

    const memberPagination = await getMembersWithPagination({ page, search });

    // if (page > memberPagination.totalPages) notFound();

    return (
        <Wrapper className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <Heading>จัดการสมาชิก</Heading>
                <Search />
            </div>

            <MemberTable members={memberPagination.members} />

            <Pagination
                totalPages={memberPagination.totalPages}
                currentPage={memberPagination.currentPage}
            />
        </Wrapper>
    );
}
