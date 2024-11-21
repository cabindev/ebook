import CreateBookForm from "~/components/book/CreateBookForm";
import Wrapper from "~/components/Wrapper";
import { getTags } from "~/db";

export default async function page() {
    const tags = await getTags();

    return (
        <Wrapper className="max-w-lg">
            <CreateBookForm tags={tags} />
        </Wrapper>
    );
}
