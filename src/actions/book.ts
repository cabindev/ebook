"use server";

import { z } from "zod";
import prisma from "~/prisma";
import { redirect } from "next/navigation";
import { getSession } from "~/libs";
import { uploadFile } from "./upload-file";
import { createBookSchema, updateBookSchema } from "~/schemas";

export async function createBookAction(formData: FormData) {
    const session = await getSession();
    if (!session.isManager) {
        return {
            success: false,
            message: "ไม่ได้รับอนุญาต",
        };
    }
 
    try {
        // ดึงข้อมูลจาก formData
        const title = formData.get('title') as string;
        const tagId = formData.get('tagId') as string;
        const imageFile = formData.get('imageFile') as File;
        const pdfFile = formData.get('pdfFile') as File;
 
        console.log('Form data:', { title, tagId, imageFile, pdfFile });
 
        if (!title || !tagId || !imageFile || !pdfFile) {
            return {
                success: false,
                message: "กรุณากรอกข้อมูลให้ครบถ้วน",
            };
        }
 
        // เช็คว่ามีชื่อหนังสือซ้ำไหม
        const existingBook = await prisma.book.findUnique({
            where: { title }
        });
 
        if (existingBook) {
            return {
                success: false,
                message: "มีหนังสือชื่อนี้ในระบบแล้ว",
            };
        }
 
        console.log('Uploading files...');
        const imageUrl = await uploadFile(imageFile, "images");
        const pdfUrl = await uploadFile(pdfFile, "pdfs");
        console.log('Upload completed:', { imageUrl, pdfUrl });
 
        console.log('Creating book...');
        const newBook = await prisma.book.create({
            data: {
                title,
                imageUrl, 
                pdfUrl,
                tagId,
            },
        });
        console.log('Book created:', newBook);
 
        return {
            success: true,
            message: "เพิ่มหนังสือสำเร็จ",
            redirect: "/manager/books"
        };
 
    } catch (error: any) {
        console.error('Create book error:', {
            message: error.message,
            code: error.code,
            stack: error.stack
        });
 
        if (error.code === 'P2002') {
            return {
                success: false,
                message: "มีหนังสือชื่อนี้ในระบบแล้ว",
            };
        }
 
        return {
            success: false,
            message: "เพิ่มหนังสือไม่สำเร็จ"
        };
    }
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
            message: "แก้ไขหนังสือไม่สำเร็จ",
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
