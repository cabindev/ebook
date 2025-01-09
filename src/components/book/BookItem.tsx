"use client";

import Link from "next/link";
import Image from "next/image";
import { book } from "@prisma/client";
import { addBookView } from "~/actions";

interface BookItemProps {
    book: book;
    isManager: boolean;
}

export default function BookItem({ book, isManager }: BookItemProps) {
    const bookPath = isManager
        ? "/manager/books/" + book.id
        : "/books/" + book.id;

    return (
        <Link href={bookPath} onClick={() => addBookView({ id: book.id })}>
            <div className="relative h-64 w-full">
                <Image
                    src={book.imageUrl}
                    alt={book.title}
                    fill
                    className="rounded border object-cover"
                />
            </div>
        </Link>
    );
}