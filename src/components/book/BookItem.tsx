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
            <Image
                src={book.imageUrl}
                alt={book.title}
                width={0}
                height={256}
                className="h-64 w-auto rounded border object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
                priority={false}
            />
        </Link>
    );
}