"use client";

import Heading from "../Heading";
import Input from "../Input";
import Label from "../Label";
import Select from "../Select";
import Submit from "../Submit";
import useToastNotification from "~/hooks/useToastNotification";
import { tag } from "@prisma/client";
import { createBookAction } from "~/actions";
import { useFormState } from "react-dom";

interface CreateBookFormProps {
    tags: tag[];
}

export default function CreateBookForm({ tags }: CreateBookFormProps) {
    const [state, formAction] = useFormState(createBookAction, null);

    useToastNotification(state as any);

    return (
        <form action={formAction} className="space-y-4">
            <Heading>เพิ่มหนังสือ</Heading>

            <div className="space-y-2">
                <Label htmlFor="title">ชื่อ</Label>
                <Input type="text" id="title" name="title" required />
            </div>

            <div className="space-y-2">
                <Label htmlFor="imageFile">ไฟล์รูปภาพ</Label>
                <Input
                    type="file"
                    id="imageFile"
                    name="imageFile"
                    accept="image/*"
                    required
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="pdfFile">ไฟล์พีดีเอฟ</Label>
                <Input
                    type="file"
                    id="pdfFile"
                    name="pdfFile"
                    accept="application/pdf"
                    required
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="tagId">เลือกหมวดหมู่</Label>
                <Select id="tagId" name="tagId">
                    {tags.map((t, i) => (
                        <option key={i} value={t.id}>
                            {t.title}
                        </option>
                    ))}
                </Select>
            </div>

            <Submit>ยืนยัน</Submit>
        </form>
    );
}
