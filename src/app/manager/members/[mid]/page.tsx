import UpdateMemberForm from "~/components/member/UpdateMemberForm";
import Wrapper from "~/components/Wrapper";
import { getMemberById } from "~/db";
import { notFound } from "next/navigation";

interface PageProps {
    params: { mid: string };
}

export default async function page({ params }: PageProps) {
    const { mid } = params;

    const member = await getMemberById({ id: mid });
    if (!member) notFound();

    return (
        <Wrapper className="max-w-lg">
            <UpdateMemberForm member={member} />
        </Wrapper>
    );
}
