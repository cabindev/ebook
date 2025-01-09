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

   // จัดการการเปลี่ยนแปลงของไฟล์
   function handleFileChange(
       event: ChangeEvent<HTMLInputElement>,
       setFile: React.Dispatch<React.SetStateAction<File | null>>,
   ) {
       setFile(event.target.files?.[0] || null);
   }

   // จัดการการ submit form
   async function handleSubmit(formData: FormData) {
       try {
           // สร้าง FormData ใหม่และเพิ่มข้อมูล
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

           // เรียกใช้ server action
           const result = await createBookAction(data);
           
           // จัดการผลลัพธ์
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
       <form
           ref={formRef}
           onSubmit={async (e) => {
               e.preventDefault();
               await handleSubmit(new FormData(e.currentTarget));
           }}
           className="space-y-4"
       >
           <Heading>เพิ่มหนังสือ</Heading>

           {/* ส่วนกรอกชื่อหนังสือ */}
           <div className="space-y-2">
               <Label htmlFor="title">ชื่อ</Label>
               <Input
                   type="text"
                   id="title"
                   name="title"
                   placeholder="กรอกชื่อหนังสือ"
                   required
               />
           </div>

           {/* ส่วนอัพโหลดรูปภาพ */}
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
               <p className="text-sm text-gray-500">
                   รองรับไฟล์: JPG, PNG, GIF (ไม่เกิน 5MB)
               </p>
           </div>

           {/* ส่วนอัพโหลด PDF */}
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
               <p className="text-sm text-gray-500">
                   รองรับไฟล์: PDF (ไม่เกิน 10MB)
               </p>
           </div>

           {/* ส่วนเลือกหมวดหมู่ */}
           <div className="space-y-2">
               <Label htmlFor="tagId">เลือกหมวดหมู่</Label>
               <Select id="tagId" name="tagId" defaultValue="" required>
                   <option value="" disabled>
                       เลือกหมวดหมู่
                   </option>
                   {tags.map((t) => (
                       <option key={t.id} value={t.id}>
                           {t.title}
                       </option>
                   ))}
               </Select>
           </div>

           {/* ปุ่มยืนยัน */}
           <Submit className="bg-amber-500 text-white hover:bg-amber-600">
               เพิ่มหนังสือ
           </Submit>
       </form>
   );
}