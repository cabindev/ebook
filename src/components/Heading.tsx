import { ReactNode } from "react";

interface HeadingProps {
    children: ReactNode;
}

export default function Heading({ children }: HeadingProps) {
    return (
        <h2 className="text-3xl font-bold leading-none tracking-tighter">
            {children}
        </h2>
    );
}
