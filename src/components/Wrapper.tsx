import { ReactNode } from "react";
import { cn } from "~/libs";

interface WrapperProps {
    children: ReactNode;
    className?: string;
}

export default function Wrapper({ children, className }: WrapperProps) {
    return (
        <div className={cn("mx-auto max-w-6xl px-4", className)}>
            {children}
        </div>
    );
}
