"use client";

import Heading from "../Heading";
import Input from "../Input";
import Label from "../Label";
import Select from "../Select";
import Submit from "../Submit";
import toast from "react-hot-toast";
import { tag } from "@prisma/client";
import { createBookAction } from "~/actions";
import { useRef, ChangeEvent, useState } from "react";

interface CreateBookFormProps {
    tags: tag[];
}

export default function CreateBookForm({ tags }: CreateBookFormProps) {
    const formRef = useRef<HTMLFormElement>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [pdfFile, setPdfFile] = useState<File | null>(null);

    function handleFileChange(
        event: ChangeEvent<HTMLInputElement>,
        setFile: React.Dispatch<React.SetStateAction<File | null>>,
    ) {
        setFile(event.target.files?.[0] || null);
    }

    async function handleSubmit(formData: FormData) {
        try {
            // สร้าง FormData ใหม่
            const data = new FormData();
            data.append('title', formData.get('title') as string);
            data.append('tagId', formData.get('tagId') as string);
            
            // เพิ่มไฟล์ถ้ามี
            if (imageFile) {
                data.append('imageFile', imageFile);
            }
            if (pdfFile) {
                data.append('pdfFile', pdfFile);
            }
    
            const result = await createBookAction(data);
            
            if (result?.success === false) {
                toast.error(result.message);
            } else {
                toast.success('เพิ่มหนังสือสำเร็จ');
                formRef.current?.reset();
                setImageFile(null);
                setPdfFile(null);
            }
        } catch (error) {
            toast.error('เกิดข้อผิดพลาดในการเพิ่มหนังสือ');
        }
    }

    return (
        <form ref={formRef} action={handleSubmit} className="space-y-4">
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
                    onChange={(e) => handleFileChange(e, setImageFile)}
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
                    onChange={(e) => handleFileChange(e, setPdfFile)}
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