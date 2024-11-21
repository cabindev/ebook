"use server";

import prisma from "~/prisma";
import { redirect } from "next/navigation";
import { getSession } from "~/libs";
import { createBookSchema, updateBookSchema } from "~/schemas";
import { uploadFile } from "./upload-file";

export async function createBookAction(_: any, formData: FormData) {
    const session = await getSession();
    if (!session.isManager) {
        return {
            success: false,
            message: "ไม่ได้รับอนุญาต",
        };
    }

    let isSuccess: boolean = false;

    try {
        const formRaw = Object.fromEntries(formData);
        const validated = createBookSchema.parse(formRaw);

        const { title, tagId, imageFile, pdfFile } = validated;
        const imageUrl = await uploadFile(imageFile, "images");
        const pdfUrl = await uploadFile(pdfFile, "pdfs");

        await prisma.book.create({
            data: {
                title,
                imageUrl,
                pdfUrl,
                tagId,
            },
        });

        isSuccess = true;
    } catch (error) {
        return {
            success: false,
            message: "เพิ่มหนังสือไม่สำเร็จ",
        };
    }

    if (isSuccess) redirect("/manager/books/");
}

export async function updateBookAction(_: any, formData: FormData) {
    const session = await getSession();
    if (!session.isManager) {
        return {
            success: false,
            message: "ไม่ได้รับอนุญาต",
        };
    }

    let isSuccess: boolean = false;

    try {
        const formRaw = Object.fromEntries(formData);
        const validated = updateBookSchema.parse(formRaw);

        const { bookId, title, tagId, imageFile, pdfFile } = validated;

        let imageUrl, pdfUrl;
        if (imageFile) imageUrl = await uploadFile(imageFile, "images");
        if (pdfFile) pdfUrl = await uploadFile(pdfFile, "pdfs");

        await prisma.book.update({
            where: { id: bookId },
            data: { title, imageUrl, pdfUrl, tagId },
        });

        isSuccess = true;
    } catch (error) {
        return {
            success: false,
            message: "เเก้ไขหนังสือไม่สำเร็จ",
        };
    }

    if (isSuccess) redirect("/manager/books/");
}

export async function deleteBook({ id }: { id: string }) {
    const session = await getSession();
    if (!session.isManager) return;

    try {
        await prisma.book.delete({ where: { id } });
    } catch (error) {
        return;
    }

    redirect("/manager/books");
}

export async function addBookView({ id }: { id: string }) {
    try {
        await prisma.book.update({
            where: { id },
            data: { views: { increment: 1 } },
        });
    } catch (error) {
        return;
    }
}

export async function updateBookRating({
    id,
    stars,
}: {
    id: string;
    stars: number;
}) {
    try {
        await prisma.book.update({
            where: { id },
            data: { rating: stars },
        });
    } catch (error) {
        return;
    }
}
