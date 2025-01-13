import { getBookById } from "~/db";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Wrapper from "~/components/Wrapper";
import BookRating from "~/components/book/BookRating";
import PDFViewer from "~/components/PDFViewer";

interface PageProps {
    params: { bid: string };
}

export async function generateMetadata({
    params: { bid },
}: PageProps): Promise<Metadata> {
    const book = await getBookById({ id: bid });
    if (!book) return {};

    return {
        title: book.title,
        openGraph: { images: { url: book.imageUrl } },
    };
}

export default async function page({ params }: PageProps) {
    const { bid } = params;

    const book = await getBookById({ id: bid });
    if (!book) notFound();

    return (
        <Wrapper>
            <PDFViewer pdfUrl={book.pdfUrl} />
            <div className="mt-8">
                <BookRating bookId={book.id} initialValue={book.rating} />
            </div>
        </Wrapper>
    );
}