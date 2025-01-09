"use client";

import Input from "../Input";
import Label from "../Label";
import Heading from "../Heading";
import Submit from "../Submit";
import { useState } from "react";
import toast from "react-hot-toast";
import { signUpAction } from "~/actions";
import { useRouter } from "next/navigation";

export default function SignUpForm() {
   const router = useRouter();
   const [isSubmitting, setIsSubmitting] = useState(false);

   async function handleSubmit(formData: FormData) {
       try {
           setIsSubmitting(true);
           
           const result = await signUpAction(null, formData);
           
           if (result?.success === false) {
               toast.error(result.message);
           } else {
               toast.success('สมัครสมาชิกสำเร็จ');
               router.push('/auth/sign-in');
               router.refresh();
           }
           
       } catch (error) {
           toast.error('สมัครสมาชิกไม่สำเร็จ');
       } finally {
           setIsSubmitting(false);
       }
   }

   return (
       <form 
           onSubmit={async (e) => {
               e.preventDefault();
               await handleSubmit(new FormData(e.currentTarget));
           }} 
           className="space-y-4"
       >
           <Heading>สมัครสมาชิก</Heading>

           <div className="space-y-2">
               <Label htmlFor="name">ชื่อ</Label>
               <Input 
                   type="text" 
                   id="name" 
                   name="name"
                   placeholder="ระบุชื่อของคุณ"
                   required 
               />
           </div>

           <div className="space-y-2">
               <Label htmlFor="email">อีเมล</Label>
               <Input 
                   type="email" 
                   id="email" 
                   name="email" 
                   placeholder="example@email.com"
                   required 
               />
           </div>

           <div className="space-y-2">
               <Label htmlFor="password">รหัสผ่าน</Label>
               <Input 
                   type="password" 
                   id="password" 
                   name="password"
                   placeholder="••••••••"
                   required 
               />
           </div>

           <Submit 
               isLoading={isSubmitting}
               loadingText="กำลังสมัครสมาชิก..."
               className="bg-amber-500 hover:bg-amber-600 text-white"
           >
               สมัครสมาชิก
           </Submit>
       </form>
   );
}