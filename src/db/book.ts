"use server";

import prisma from "~/prisma";

export async function getBooks() {
    const books = await prisma.book.findMany({ orderBy: { views: "asc" } });
    return books;
}

export async function getBooksWithPagination({
    page,
    search,
}: {
    page: number;
    search: string;
}) {
    const pageInt = Number(page);
    const limitInt = 10;

    const books = await prisma.book.findMany({
        where: { OR: [{ title: { contains: search } }] },
        skip: (pageInt - 1) * limitInt,
        take: limitInt,
        orderBy: { createdAt: "asc" },
    });

    const totalCount = await prisma.book.count({
        where: { OR: [{ title: { contains: search } }] },
    });

    return {
        books,
        totalPages: Math.ceil(totalCount / limitInt),
        currentPage: pageInt,
    };
}

export async function getBookById({ id }: { id: string }) {
    const book = await prisma.book.findUnique({ where: { id } });
    return book;
}

export async function getBooksByTagId({ id }: { id: string }) {
    const books = await prisma.book.findMany({
        where: { tagId: id },
        orderBy: { views: "asc" },
    });
    return books;
}
