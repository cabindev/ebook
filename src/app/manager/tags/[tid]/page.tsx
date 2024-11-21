import UpdateTagForm from "~/components/tag/UpdateTagForm";
import Wrapper from "~/components/Wrapper";
import { notFound } from "next/navigation";
import { getTagById } from "~/db";

interface PageProps {
    params: { tid: string };
}

export default async function page({ params }: PageProps) {
    const { tid } = params;

    const tag = await getTagById({ id: tid });
    if (!tag) notFound();

    return (
        <Wrapper className="max-w-lg">
            <UpdateTagForm tag={tag} />
        </Wrapper>
    );
}
