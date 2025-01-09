"use client";

import Input from "../Input";
import Label from "../Label";
import Heading from "../Heading";
import Submit from "../Submit";
import { useState } from "react";
import toast from "react-hot-toast";
import { signInAction } from "~/actions";

export default function SignInForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleSubmit(formData: FormData) {
        try {
            setIsSubmitting(true);
            
            const result = await signInAction(null, formData);
            
            if (result?.success === false) {
                toast.error(result.message);
            }
            
        } catch (error) {
            toast.error('เข้าสู่ระบบไม่สำเร็จ');
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
                loadingText="กำลังเข้าสู่ระบบ..."
                className="bg-amber-500 hover:bg-amber-600 text-white"
            >
                เข้าสู่ระบบ
            </Submit>
        </form>
    );
}