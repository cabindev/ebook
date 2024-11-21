"use client";

import Input from "../Input";
import Label from "../Label";
import Heading from "../Heading";
import Submit from "../Submit";
import useToastNotification from "~/hooks/useToastNotification";
import { signInAction } from "~/actions";
import { useFormState } from "react-dom";

export default function SignInForm() {
    const [state, formAction] = useFormState(signInAction, null);

    useToastNotification(state as any);

    return (
        <form action={formAction} className="space-y-4">
            <Heading>เข้าสู่ระบบ</Heading>

            <div className="space-y-2">
                <Label htmlFor="email">อีเมล</Label>
                <Input type="email" id="email" name="email" required />
            </div>

            <div className="space-y-2">
                <Label htmlFor="password">รหัสผ่าน</Label>
                <Input type="password" id="password" name="password" required />
            </div>

            <Submit>ยืนยัน</Submit>
        </form>
    );
}
