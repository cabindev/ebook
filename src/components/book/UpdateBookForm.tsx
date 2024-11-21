"use client";

import Button from "../Button";
import Heading from "../Heading";
import Input from "../Input";
import Label from "../Label";
import Select from "../Select";
import Submit from "../Submit";
import useToastNotification from "~/hooks/useToastNotification";
import { ChangeEvent, useState, useTransition } from "react";
import { deleteBook, updateBookAction } from "~/actions";
import { book, tag } from "@prisma/client";
import { useFormState } from "react-dom";

interface UpdateBookFormProps {
    book: book;
    tags: tag[];
}

export default function UpdateBookForm({ book, tags }: UpdateBookFormProps) {
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [pdfFile, setPdfFile] = useState<File | null>(null);

    function handleFileChange(
        event: ChangeEvent<HTMLInputElement>,
        setFile: React.Dispatch<React.SetStateAction<File | null>>,
    ) {
        setFile(event.target.files?.[0] || null);
    }

    // form action
    const [state, formAction] = useFormState(updateBookAction, null);
    const [isDeletePending, startTransition] = useTransition();

    useToastNotification(state as any);

    // handle image and pdf

    const handleAction = (formData: FormData) => {
        if (imageFile) formData.append("imageFile", imageFile);
        if (pdfFile) formData.append("pdfFile", pdfFile);

        formAction(formData);
    };

    return (
        <form action={handleAction} className="space-y-4">
            <Heading>เเเก้ไขหนังสือ</Heading>

            {/* bookId */}
            <Input type="hidden" name="bookId" defaultValue={book.id} />

            <div className="space-y-2">
                <Label htmlFor="title">ชื่อ</Label>
                <Input
                    type="text"
                    id="title"
                    name="title"
                    required
                    defaultValue={book.title}
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="imageFile">ไฟล์รูปภาพ</Label>
                <Input
                    type="file"
                    id="imageFile"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, setImageFile)}
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="pdfFile">ไฟล์พีดีเอฟ</Label>
                <Input
                    type="file"
                    id="pdfFile"
                    accept="application/pdf"
                    onChange={(e) => handleFileChange(e, setPdfFile)}
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="tagId">เลือกหมวดหมู่</Label>
                <Select id="tagId" name="tagId" defaultValue={book.tagId}>
                    {tags.map((t, i) => (
                        <option key={i} value={t.id}>
                            {t.title}
                        </option>
                    ))}
                </Select>
            </div>

            <Submit>ยืนยัน</Submit>
            <Button
                disabled={isDeletePending}
                onClick={() =>
                    startTransition(() => deleteBook({ id: book.id }))
                }
                className="w-full bg-red-500"
            >
                ลบหนังสือ
            </Button>
        </form>
    );
}
