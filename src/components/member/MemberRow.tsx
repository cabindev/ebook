import Link from "next/link";
import MemberRole from "./MemberRole";
import { PencilIcon } from "@heroicons/react/24/solid";
import { member } from "@prisma/client";

interface MemberRowProps {
    member: member;
}

export default function MemberRow({ member }: MemberRowProps) {
    return (
        <tr>
            <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                {member.id.split("-")[0].toUpperCase()}
            </td>
            <td className="whitespace-nowrap px-6 py-4 text-sm font-light text-gray-900">
                {member.name}
            </td>
            <td className="whitespace-nowrap px-6 py-4 text-sm font-light text-gray-900">
                {member.email}
            </td>
            <td className="whitespace-nowrap px-6 py-4 text-center text-sm font-light text-gray-900">
                <MemberRole role={member.role} />
            </td>
            <td className="flex items-center justify-center px-6 py-4">
                <Link href={"/manager/members/" + member.id}>
                    <PencilIcon className="h-5 w-5 text-green-500" />
                </Link>
            </td>
        </tr>
    );
}
