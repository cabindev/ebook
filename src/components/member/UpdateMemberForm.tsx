"use client";

import Input from "../Input";
import Label from "../Label";
import Heading from "../Heading";
import Submit from "../Submit";
import Select from "../Select";
import useToastNotification from "~/hooks/useToastNotification";
import { member, role } from "@prisma/client";
import { updateMemberAction } from "~/actions";
import { useFormState } from "react-dom";
import { parseRoleToText } from "~/utils";

interface UpdateMemberFormProps {
    member: member;
}

export default function UpdateMemberForm({ member }: UpdateMemberFormProps) {
    const [state, formAction] = useFormState(updateMemberAction, null);

    useToastNotification(state as any);

    return (
        <form action={formAction} className="space-y-4">
            <Heading>เข้าสู่ระบบ</Heading>

            {/* memberId */}
            <Input type="hidden" name="memberId" defaultValue={member.id} />

            <div className="space-y-2">
                <Label htmlFor="name">ชื่อ</Label>
                <Input
                    type="text"
                    id="name"
                    name="name"
                    required
                    defaultValue={member.name}
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="email">อีเมล</Label>
                <Input
                    type="email"
                    id="email"
                    name="email"
                    required
                    defaultValue={member.email}
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="role">เลือกบทบาท</Label>
                <Select id="role" name="role" defaultValue={member.role}>
                    {Object.values(role).map((r, i) => (
                        <option key={i} value={r}>
                            {parseRoleToText(r)}
                        </option>
                    ))}
                </Select>
            </div>

            <Submit>ยืนยัน</Submit>
        </form>
    );
}
