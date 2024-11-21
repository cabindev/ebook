import MemberRow from "./MemberRow";
import { member } from "@prisma/client";

interface MemberTableProps {
    members: member[];
}

export default function MemberTable({ members }: MemberTableProps) {
    if (members.length <= 0) {
        return <p className="text-gray-500">ไม่มีพบสมาชิก...</p>;
    }

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full overflow-hidden rounded">
                <thead className="bg-gray-200">
                    <tr>
                        <th
                            scope="col"
                            className="px-6 py-4 text-left text-sm font-medium"
                        >
                            #
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-4 text-left text-sm font-medium"
                        >
                            ชื่อ
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-4 text-left text-sm font-medium"
                        >
                            อีเมล
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-4 text-center text-sm font-medium"
                        >
                            ประเภท
                        </th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {members.map((member) => (
                        <MemberRow key={member.id} member={member} />
                    ))}
                </tbody>
            </table>
        </div>
    );
}
